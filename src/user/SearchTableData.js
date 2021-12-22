import React from "react";
import Header from "../header/Header";
import "../firebase"
import Spinner from "../spinner/Spinner"
import MaterialTable from "material-table";
import { connect } from "react-redux";
import { addToCart } from "../redux/cartActionCreators";
import { fetchMedicines, vendorCheck } from "../redux/actionCreators";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => {
    return {
        currentUser: state.authReducer.currentUser,
        allMedicines: state.adminReducer.allInfo,
        isLoading: state.adminReducer.isLoading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addToCart: addedItem => dispatch(addToCart(addedItem)),
        fetchMedicines: vendorId => dispatch(fetchMedicines(vendorId)),
        vendorCheck : (isVendor) => dispatch(vendorCheck(isVendor))
    }
}


class SearchTableData extends React.Component {
    state = {
        allMedicines: [],
        isLoading: false,
    }



    addToCart = (mg, medicineName, price) => {
        const shopId = localStorage.getItem("selectedShop")
        const addedItem = {
            uid: medicineName + mg,
            medicineName,
            quantity: 1,
            shopId,
            price
        }
        this.props.addToCart(addedItem)
    }

    componentDidMount() {
        this.props.vendorCheck(false)
        this.props.fetchMedicines(this.props.match.params.shopId);
    }

    render() {
        return (
            <>
                {
                    this.props.isLoading ? <Spinner /> :
                        <>
                            <Header />
                            {
                                this.props.allMedicines.length > 0 ?
                                    <div className="container">
                                        <div className="mt-5">
                                            <MaterialTable
                                                title="Medicines"
                                                columns={[
                                                    { title: "Medicine", field: "medicineName" },
                                                    { title: "mg", field: "mg" },
                                                    { title: "In Stock", field: "amount" },
                                                    { title: "Price per piece", field: "price" },
                                                    { title: "", field: "", render: rowData => <button type="button" disabled={rowData.amount <= 0} className="btn custom-button" onClick={() => this.addToCart(rowData.mg, rowData.medicineName.toLowerCase(), rowData.price)}>{rowData.amount <= 0 ? "Out of stock":"Add to cart"}</button> }
                                                ]}
                                                data={this.props.allMedicines} />
                                        </div>
                                    </div> :
                                    "no medicine found"
                            }
                        </>
                }
            </>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchTableData)) ;