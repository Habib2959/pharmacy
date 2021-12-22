import React from "react";
import UserRoute from "./UserRoute";
import "./userStyle.css";
import { connect } from "react-redux";
import { vendorCheck } from "../redux/actionCreators";

const mapDispatchToProps = dispatch => {
    return{
        vendorCheck : (isVendor) => dispatch(vendorCheck(isVendor))
    }
}

const UserMain = props => {
    props.vendorCheck(false)
    return (
        <>
            <UserRoute />
        </>
    )
}

export default connect(null, mapDispatchToProps) (UserMain);