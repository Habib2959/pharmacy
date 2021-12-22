import React from "react";
import Cards from "./Cards";
import { storeFetching } from "../redux/UiActionCreators";
import { connect } from "react-redux";
import Spinner from "../spinner/Spinner"

const mapDispatchToProps = dispatch => {
    return {
        storeFetching: () => dispatch(storeFetching())
    }
}

const mapStateToProps = state => {
    return {
        allStores: state.UiReducer.allStores,
        isLoading: state.UiReducer.isLoading
    }
}


class ShowPharmacy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: "",
            filteredShop: [],
        }
    }

    handleSearch = e => {
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            if (e.target.value !== "") {
                const filteredShop = this.props.allStores.filter(allStores => {
                    return allStores.shopName.split(" ").join("").toLowerCase().includes(e.target.value.toLowerCase());
                });
                this.setState({
                    filteredShop
                })
            } else {
                this.setState({
                    filteredShop: this.props.allStores
                })
            }
        })
    }
    componentDidMount() {
        this.props.storeFetching()
    }

    render() {
        return (
            <>
                {
                    this.props.isLoading ? <Spinner /> :
                        <>
                            <div className="search-bar">
                                <input
                                    type="search"
                                    onChange={this.handleSearch}
                                    name="searchTerm"
                                    placeholder="Search the shop name"
                                    className="form-control w-50 mx-auto" />
                            </div>
                            <Cards allStores={this.state.searchTerm.length < 1 ? this.props.allStores : this.state.filteredShop} />
                        </>
                }
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowPharmacy);