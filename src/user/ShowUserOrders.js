import React from "react";

const ShowUserOrders = props => {
    return (
        <>
        <h2 className="text-center">Orders</h2>
            {
                props.orders.length <= 0 ? <h2>There is no order</h2> :
                    props.orders.map(orderInfo => {
                        return (
                            <div className="card my-3 text-capitalize" key={Math.random()}>
                                <div className="card-body">
                                    <p className="card-text">Name: <span className="text-dark">{orderInfo.name}</span></p>
                                    <p className="card-text">Contact no. : <span className="text-dark">{orderInfo.telNumber}</span></p>
                                    <p className="card-text">Address: <span className="text-dark">{orderInfo.address}</span></p>
                                    <div className="d-flex flex-row">
                                        {orderInfo.cartItems.map(cartItems => {
                                            return (
                                                <p key={Math.random()} className="badge bg-light text-dark me-2 text-capitalize mt-1">{cartItems.medicineName} X {cartItems.quantity}</p>
                                            )
                                        })}
                                    </div>
                                    <p className="card-text">Total Price: <span className="text-dark">{orderInfo.totalPrice}</span></p>
                                </div>
                            </div>
                        )
                    })
            }
        </>
    )
}

export default ShowUserOrders;