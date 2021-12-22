import React from "react";
import { connect } from "react-redux";
import "../firebase";
import { getFirestore, collectionGroup, query, getDocs } from "firebase/firestore";
import Spinner from "../spinner/Spinner";
import ShowUserOrders from "./ShowUserOrders";
import Header from "../header/Header";


const db = getFirestore();
const mapStateToProps = state => {
    return {
        currentUser: state.authReducer.currentUser,
        isLoading: state.authReducer.isLoading,
    }
}

class UserOrders extends React.Component {
    state = {
        orders: [],
        loading: true
    }

    async componentDidMount() {
        const orders = query(collectionGroup(db, "ordersPerUser"));
        let userOrders = []
        try {
            const querySnapshot = await getDocs(orders);
            for (let i = 0; i < querySnapshot.docs.length; i++) {
                if (querySnapshot.docs[i].id === this.props.currentUser.uid) {
                    userOrders.push(...querySnapshot.docs[i].data().orders)
                }
            }
            this.setState({
                loading: false,
                orders: userOrders
            })
        } catch (error) {
            this.setState({
                loading: false
            })
            console.log(error.message);
        }
    }

    render() {
        return (
            <>
                {
                    this.props.isLoading ? <Spinner /> :
                        <>
                            <Header />
                            {
                                this.state.loading ? <Spinner /> :
                                    <div className="container">
                                        <ShowUserOrders
                                            orders={this.state.orders} />
                                    </div>
                            }
                        </>
                }
            </>
        )
    }
}

export default connect(mapStateToProps)(UserOrders);