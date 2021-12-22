import React from "react";
import { connect } from "react-redux"
import { Link } from "react-router-dom";
import { addItem, minusItem } from "../redux/cartActionCreators";
import "./cart.css"

const mapStateToProps = state => {
    return{
        cartItems: state.cartReducer.cartItems,
        currentUser: state.authReducer.currentUser,
        totalItems: state.cartReducer.totalItemCount
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addItem: uid => dispatch(addItem(uid)),
        minusItem: uid => dispatch(minusItem(uid))
    }
}

class Cart extends React.Component {

    render() {
        let totalPrice = 0;
        return (
            <>
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                    <div className="offcanvas-header">
                        <h5 id="offcanvasRightLabel">Cart Items</h5>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="list-group">
                            {
                                this.props.cartItems ?
                                    this.props.cartItems.map((items) => {
                                        totalPrice = (items.quantity* items.price) + totalPrice;
                                        localStorage.setItem("TotalPrice", JSON.stringify(totalPrice));
                                        return (
                                            <li className="list-group-item w-100 d-flex justify-content-between align-items-center main-font-color text-capitalize box-shadow mt-2" key={Math.random()}>
                                                <div>{items.medicineName}</div>
                                                <div className="d-flex align-items-center">
                                                    <i className="fa fa-plus"
                                                        onClick={() => this.props.addItem(items.uid)} />
                                                    <p className="mb-0">{items.quantity}</p>
                                                    <i className="fa fa-minus"
                                                        style={{ marginLeft: "10px" }}
                                                        onClick={() => this.props.minusItem(items.uid)} />
                                                </div>
                                            </li>
                                        )
                                    }) : <p> NO ITEMS IN THE CART</p>
                            }
                            <li className="list-unstyled ms-auto">
                                <h4>Total Price: {totalPrice} BDT</h4>
                            </li>
                        </ul>
                        <div data-bs-dismiss="offcanvas">
                            {
                                this.props.currentUser ? <Link to="/user/checkout" className="btn checkout-btn mt-4">Checkout</Link> : <div className="btn checkout-btn mt-4" onClick={() =>  alert("sign in to proceed")}>Checkout</div>
                            }
                        </div>

                    </div>
                </div>
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);