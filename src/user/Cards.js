import React from "react";
import { Link } from "react-router-dom";


const Cards = props => {
    const tableDataFetch = clickedPharmacyId =>{
        localStorage.setItem("selectedShop", clickedPharmacyId);
    }
    return (
        <>
            <div className="container">
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {
                        props.allStores.map(items => {
                            return (
                                <div className="col" key={Math.random()}>
                                    <Link className="text-decoration-none main-font-color text-center" to={`/user/medicines/${items.id}`} onClick={() => tableDataFetch(items.id)}>
                                        <div className="card card-box-shadow">
                                            <img src={items.imageUrl} className="card-img-top" alt="Lazz" />
                                            <div className="card-body">
                                                <h4 className="card-text text-capitalize">{items.shopName}</h4>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Cards;