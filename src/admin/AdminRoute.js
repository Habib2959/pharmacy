import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AddMedicine from "./AddMedicine";
import AllMedicines from "./AllMedicines";
import AdminOrders from "./AdminOrders"
import Sidebar from "./Sidebar";
import { connect } from "react-redux";
import VendorSignIn from "../authentication/vendorAuth/VendorSignIn";
import  Spinner  from "../spinner/Spinner";

const mapStateToProps = state => {
    return {
        currentVendor: state.VendorAuthReducer.currentVendor,
        isLoading: state.VendorAuthReducer.isLoading
    }
}

const AdminRoute = props => {
    let adminCheck = <div></div>;
    if (props.currentVendor === null) {
        adminCheck = <VendorSignIn />
    } else {
        adminCheck = (
            <div style={{ overflowX: 'hidden', background: "rgb(255 253 245)" }}>
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-8"  style={{}}>
                        <Switch>
                            <Route path="/admin/dashboard/allMedicine" exact component={AllMedicines} />
                            <Route path="/admin/dashboard/adminOrders" exact component={AdminOrders} />
                            <Route path="/admin/dashboard" component={AddMedicine} />
                            {props.currentVendor !== null ?  <Redirect to="/admin/dashboard"/> : <VendorSignIn />}
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <>
            {props.isLoading ? <Spinner /> : adminCheck}
        </>
    )
}

export default connect(mapStateToProps)(AdminRoute);