import React from "react";

const ShowOrders = props => {
    return (
        <>
            {
                props.orders.length <= 0 ? <h2>There is no order</h2> :
                    props.orders.map(orderInfo => {
                        return (
                            <div className="card my-3 text-capitalize" key={Math.random()}>
                                <div className="card-body">
                                    <p className="card-text">Name: <span style={{color:"#000"}}>{orderInfo.name}</span></p>
                                    <p className="card-text">Contact no. : <span style={{color:"#000"}}>{orderInfo.telNumber}</span></p>
                                    <p className="card-text">Address: <span style={{color:"#000"}}>{orderInfo.address}</span></p>
                                    <div className="d-flex flex-row">
                                        {orderInfo.cartItems.map(cartItems => {
                                            return (
                                                <p key={Math.random()} className="badge bg-light text-dark me-2 text-capitalize">{cartItems.medicineName} X {cartItems.quantity}</p>
                                            )
                                        })}
                                    </div>
                                    <p className="card-text">Total Price: <span style={{color:"#000"}}>{orderInfo.totalPrice}</span></p>
                                </div>
                            </div>
                        )
                    })
            }
        </>
    )
}

export default ShowOrders;