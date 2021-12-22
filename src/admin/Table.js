import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";


const Table = props => {
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>mg</th>
                        <th>In stock</th>
                        <th>Sold</th>
                        <th>Price per piece</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.allInfo ?
                            props.allInfo.map((items) => {
                                return (
                                    <tr key={Math.random()}>
                                        <td className="text-capitalize">{items.medicineName}</td>
                                        <td>{items.mg}</td>
                                        <td>{items.amount}</td>
                                        <td>{items.amountSold}</td>
                                        <td>{items.price}</td>
                                        <td>
                                            <div>
                                                <button id={items.medicineName.toLowerCase()+items.mg} className="custom-button btn" disabled={items.amount <= 0} onClick={event => { props.toggleModal(); props.idHandler(event) }}>{items.amount <= 0 ? "Out of stock" : "Sell item"}</button>
                                                <Modal isOpen={props.isOpen} toggle={props.toggleModal}>
                                                    <ModalHeader toggle={props.toggleModal}></ModalHeader>
                                                    <ModalBody>
                                                        <h5>Medicine name: <span className="fs-5 fw-light">{items.medicineName}</span> </h5>
                                                        <form onSubmit={(e)=>props.handleSubmit(e)}>
                                                            <div className="input-group mb-3">
                                                                <input type="number" className="form-control"
                                                                    placeholder="how many medicines you want to sell ?"
                                                                    name="soldAmount"
                                                                    ref={props.soldAmount} />
                                                                <button className="btn submit-btn" type="submit">Sell</button>
                                                            </div>
                                                        </form>
                                                    </ModalBody>
                                                </Modal>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }) : <tr></tr>
                    }
                </tbody>
            </table>
        </>
    )
}

export default Table;