import React from "react";
import {connect} from "react-redux";
import "../firebase";
import { collection, getFirestore, getDocs } from "firebase/firestore";
import Spinner from "../spinner/Spinner";
import ShowOrders from "./ShowOrders";


const db = getFirestore();

const mapStateToProps = state => {
    return {
        vendorId: state.VendorAuthReducer.currentVendor.vendorId
    }
}

class AdminOrders extends React.Component {
    state = {
        orders:[],
        loading: true
    }
     componentDidMount(){
         const ordersRef = collection(db, "orders", this.props.vendorId, "ordersPerUser");
         let allOrders = [];
         getDocs(ordersRef).then(response=>{
             response.docs.map(items => {
                 allOrders.push(...items.data().orders);
                 return allOrders
             });
             this.setState({
                loading: false,
                orders: allOrders,
             })
         }).catch(error => {
            this.setState({
                loading: false,
                orders: [],
             })
             console.log(error);
         })
        
    }
    render() {
        return (
            <>
                {
                    this.state.loading ? <Spinner /> : 
                    <ShowOrders 
                    orders={this.state.orders} />                   
                }
            </>
        )
    }
}

export default connect(mapStateToProps) (AdminOrders);