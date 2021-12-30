import { React, createRef, Component } from "react";
import { connect } from "react-redux";
import { addingSoldMedicineToFirestore, fetchMedicines } from "../redux/actionCreators";
import Spinner from "../spinner/Spinner";
import Table from "./Table";
import "./adminMedia.css"



const mapStateToProps = state => {
    return {
        ...state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addingSoldMedicineToFirestore: (uid, soldAmount, vendorId) => dispatch(addingSoldMedicineToFirestore(uid, soldAmount, vendorId)),
        fetchMedicines: (vendorId) => dispatch(fetchMedicines(vendorId))
    }
}

class AllMedicines extends Component {
    constructor(props) {
        super(props);
        this.soldAmount = createRef();
        this.state = {
            isOpen: false,
            buttonId: '',
            medicineNameInModal: '',
            searchTerm: '',
            filteredMedicine: []
        }
    }

    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    idHandler = event => {
        let medicineNameInModal = event.target.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
        this.setState({
            buttonId: event.target.id,
            medicineNameInModal: medicineNameInModal
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.addingSoldMedicineToFirestore(this.state.buttonId, this.soldAmount.current.value, this.props.VendorAuthReducer.currentVendor.vendorId);
        this.setState({
            isOpen: false,
        })
    }
    handleSearch = e => {
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            if (e.target.value !== '') {
                const filteredMedicine = this.props.adminReducer.allInfo.filter(medicines => {
                    return medicines.medicineName.split(" ").join("").toLowerCase().includes(e.target.value.toLowerCase());
                });
                this.setState({
                    filteredMedicine: filteredMedicine
                })
            } else {
                this.setState({
                    filteredMedicine: this.props.adminReducer.allInfo
                })
            }
        })
    }
    componentDidMount() {
        this.props.fetchMedicines(this.props.VendorAuthReducer.currentVendor.vendorId);
    }



    render() {
        return (
            <>
                {this.props.adminReducer.isLoading ? <Spinner /> :
                    <div className="px-2">
                        <div className="search-bar">
                            <input
                                type="search"
                                onChange={this.handleSearch}
                                name="searchTerm" 
                                placeholder="Search the medicine name"
                                className="form-control search-input" />
                        </div>
                        <Table
                            toggleModal={this.toggleModal}
                            idHandler={(e) => this.idHandler(e)}
                            handleSubmit={(e) => this.handleSubmit(e)}
                            allInfo={this.state.searchTerm.length < 1 ? this.props.adminReducer.allInfo : this.state.filteredMedicine}
                            isOpen={this.state.isOpen}
                            medicineNameInModal={this.state.medicineNameInModal}
                            soldAmount={this.soldAmount} />
                    </div>
                }
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllMedicines);