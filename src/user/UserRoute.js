import React from "react";
import Header from "../header/Header";
import { connect } from "react-redux";
import Spinner from "../spinner/Spinner"
import ShowPharmacy from "./ShowPharmacy";


const mapStateToProps = state => {
    return {
        currentUser: state.authReducer.currentUser,
        isLoading: state.authReducer.isLoading,
    }
}

const UserRoute = props => {
    let returnComponent = <div></div>;
    if (props.isLoading) {
        returnComponent = (<Spinner />)
    } else {
        returnComponent = (
            <>
                <Header />
                <ShowPharmacy />
            </>
        )
    }
    return (
        <>
            {returnComponent}
        </>
    )
}

export default connect(mapStateToProps)(UserRoute);