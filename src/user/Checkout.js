import React from "react";
import Header from "../header/Header";
import { connect } from "react-redux";
import { checkoutUpdate } from "../redux/checkoutActionCreators";
import "./userStyle.css";
import { vendorCheck } from "../redux/actionCreators";


const mapStateToProps = state => {
    return {
        totalItems: state.cartReducer.totalItemCount,
        cartItems: state.cartReducer.cartItems,
        currentUser: state.authReducer.currentUser,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        checkoutUpdate : (customerId, orderInfo) => dispatch(checkoutUpdate(customerId, orderInfo)),
        vendorCheck : (isVendor) => dispatch(vendorCheck(isVendor))
    }
}

class Checkout extends React.Component {
    state = {
        name: "",
        telNumber: "",
        address: "",
        cartItems:[],
        totalPrice:0,
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = e => {
        e.preventDefault();
        if (this.state.name === '' || this.state.telNumber === '' || this.state.address === '') {
            alert('Please fill up your informations')
        } else {
            this.setState({
                cartItems: this.props.cartItems,
                totalPrice: JSON.parse(localStorage.getItem("TotalPrice"))
            }, () => {
                this.props.checkoutUpdate(this.props.currentUser.uid, this.state);
            })            
        }
    }
    componentDidMount(){
        this.props.vendorCheck(false)
    }
    render() {
        return (
            <>
                <Header />
                <div className="container">
                    {
                        this.props.totalItems === 0 ? <p>No Items in cart</p> :

                            <form className="mt-4" onSubmit={this.handleSubmit}>
                                <input type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    className="form-control"
                                    onChange={this.handleChange} />
                                <br />
                                <input type="tel"
                                    name="telNumber"
                                    placeholder="Enter your number"
                                    className="form-control"
                                    onChange={this.handleChange} />
                                <br />
                                <textarea name="address"
                                    rows="5" cols="40"
                                    placeholder="Enter your address"
                                    className="form-control"
                                    onChange={this.handleChange} />
                                <br />
                                <button type="submit" className="btn submit-btn">Submit</button>
                            </form>
                    }
                </div>
            </>
        )
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Checkout);