import React from "react";
import { connect } from "react-redux";
import { addMedicineToFirestore } from "../redux/actionCreators";
import uuid from 'react-uuid';
import Spinner from "../spinner/Spinner"

const mapStateToProps = state => {
    return {
        isLoading: state.adminReducer.isLoading,
        vendorId: state.VendorAuthReducer.currentVendor.vendorId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addMedicineToFirestore: (allInfo, vendorId) => dispatch(addMedicineToFirestore(allInfo, vendorId))
    }
}

class AddMedicine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            medicineName: '',
            amount: "",
            price: "",
            mg: ""

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.medicineName === '' || this.state.amount === ''|| this.state.price === ''|| this.state.mg === '') {
            alert('Please fill up the input')
        } else {
            this.props.addMedicineToFirestore({ ...this.state, amountSold: 0, uid: uuid() }, this.props.vendorId)
            this.setState({
                medicineName: '',
                amount: '',
                price: "",
                mg: ""
            })
        }
    }
    handleChange = (event) => {
        let value = event.target.value;
        if (event.target.name === "amount") {
            value = +event.target.value;
        }
        this.setState({
            [event.target.name]: value
        })
    }
    render() {
        return (
            <>
                {
                    this.props.isLoading ? <Spinner /> :
                        <form onSubmit={this.handleSubmit}>
                            <input
                                type="text" className="form-control my-3" placeholder="Enter the medicine's name"
                                name="medicineName" onChange={this.handleChange}
                                value={this.state.medicineName} />
                            <input
                                type="number" className="form-control mb-3" placeholder="Enter the medicine's amount"
                                name="amount"
                                onChange={this.handleChange}
                                value={this.state.amount} />
                            <input
                                type="number" className="form-control mb-3" placeholder="Enter the medicine's price"
                                name="price"
                                onChange={this.handleChange}
                                value={this.state.price} />
                            <input
                                type="number" className="form-control mb-3" placeholder="Enter the medicine's mg"
                                name="mg"
                                onChange={this.handleChange}
                                value={this.state.mg} />
                            <button type="submit" className="btn submit-btn">Add Medicine</button>
                        </form>
                }
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMedicine);