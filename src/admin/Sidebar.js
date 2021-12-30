import React from "react";
import './sidebar.css';
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import "../firebase";
import { withRouter } from "react-router-dom";
import { VendorAuthLogOut } from "../redux/vendorActionCreator";
import { connect } from "react-redux";


const mapStateToProps = state => {
    return {
        currentVendor: state.VendorAuthReducer.currentVendor
    }
}

const MapDispatchToProps = dispatch => {
    return {
        VendorAuthLogOut: () => dispatch(VendorAuthLogOut())
    }
}


const auth = getAuth();

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.VendorSignOut = this.VendorSignOut.bind(this)
    }

    VendorSignOut = async () => {
        await signOut(auth);
    }
    render() {
        return (
            <>
                <div className="sidebar navbar-expand-lg">
                    <div className="d-flex justify-content-between">
                        <h2 style={{ color: "#FFFAF0" }}>{this.props.currentVendor !== "" ? this.props.currentVendor.shopName : "DashBoard"}</h2>
                        <hr />
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <i className="fa fa-bars"></i>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="list-group">
                            <li className="listItem">
                                <Link to="/admin/dashboard"> <i className="fa fa-plus"></i>Add New Medicine </Link>
                            </li>
                            <li className="listItem">
                                <Link to="/admin/dashboard/allMedicine"> <i className="fa fa-medkit"></i>All Medicine list </Link>
                            </li>
                            <li className="listItem">
                                <Link to="/admin/dashboard/adminOrders"> <i className="fa fa-calendar"></i>Orders </Link>
                            </li>
                            <li className="listItem" onClick={this.VendorSignOut}>
                                <i className="fa fa-sign-out"
                                ></i>SignOut
                            </li>
                        </ul>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(connect(mapStateToProps, MapDispatchToProps)(Sidebar));