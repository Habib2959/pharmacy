import React from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
} from 'reactstrap';
import Logo from "../assets/images/pharmacyLogo.png"
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { authLogOut } from "../redux/actionCreators";
import { withRouter } from "react-router";
import { getAuth, signOut } from "@firebase/auth";
import "../firebase";
import Cart from "../cart/Cart";
import "./header.css"



const mapStateToProps = state => {
    return {
        currentUser: state.authReducer.currentUser,
        isLoading: state.authReducer.isLoading,
        totalItems: state.cartReducer.totalItemCount
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authLogOut: () => dispatch(authLogOut())
    }
}

const auth = getAuth();

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            cartItems: null,
        }
    }


    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    signOut = async () => {
        try {
            await signOut(auth);
            this.props.authLogOut()
        } catch (error) {
            alert(error.message);
        }
    }


    render() {
        return (
            <>
                <div>
                    <Navbar style={{ backgroundColor: "#f1f0ec" }} light expand="md">
                        <div className="container">
                            <Link to="/user">
                                <img src={Logo} alt="logo" width="50px" />
                            </Link>
                            <div className="d-block d-sm-none">
                                <div className="fa fa-shopping-cart" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"
                                    onClick={this.showCartItems}>
                                    <p className="cart-number">
                                        {
                                            this.props.totalItems
                                        }
                                    </p>
                                </div>
                            </div>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav navbar className="ms-auto" >
                                    {
                                        this.props.currentUser ? (
                                            <>
                                                <NavItem className="mobile-list-style">
                                                    <Link to="/user" className="NavLink" onClick={this.signOut}>Signout</Link>
                                                </NavItem>
                                                <NavItem className="margin mobile-list-style">
                                                    <Link to="/user/orders" className="NavLink">Orders</Link>
                                                </NavItem>
                                                <NavItem className="margin user-name main-font-color mobile-list-style">
                                                    <p className="fw-bold d-inline-block">{this.props.currentUser.displayName}</p>
                                                    <i className="fa fa-user-circle-o ms-3" />
                                                </NavItem>
                                                <NavItem className="margin mobile-list-style d-none d-sm-none d-md-block">
                                                    <div className="fa fa-shopping-cart" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"
                                                        onClick={this.showCartItems}>
                                                        <p className="cart-number">
                                                            {
                                                                this.props.totalItems
                                                            }
                                                        </p>
                                                    </div>
                                                </NavItem>
                                            </>
                                        ) : (
                                            <>
                                                <NavItem className="mobile-list-style">
                                                    <Link to="/user/userLogin" className="NavLink">Sign In</Link>
                                                </NavItem>
                                                <NavItem className="margin mobile-list-style d-none d-sm-none d-md-block">
                                                    <div className="fa fa-shopping-cart" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"
                                                        onClick={this.showCartItems}>
                                                        <p className="cart-number">
                                                            {
                                                                this.props.totalItems
                                                            }
                                                        </p>
                                                    </div>
                                                </NavItem>
                                            </>
                                        )
                                    }

                                </Nav>
                            </Collapse>

                        </div>
                    </Navbar>
                </div>
                <Cart />
            </>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));