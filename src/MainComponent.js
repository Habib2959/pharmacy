import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import UserChoosing from './authentication/UserChoosing';
import UserMain from "./user/UserMain";
import AdminMain from "./admin/AdminMain";
import SearchTableData from "./user/SearchTableData";
import { connect } from "react-redux";
import SignUpForm from "./authentication/SignUpForm";
import Checkout from "./user/Checkout";
import UserOrders from "./user/UserOrders";
import { getAuth,signOut } from "@firebase/auth";
import { authSuccees, authLoading, authLogOut } from "./redux/actionCreators";
import { resetCart } from "./redux/cartActionCreators";
import VendorApplication from "./admin/VendorApplication";
import { doc, getDoc, getFirestore } from "firebase/firestore";



const db = getFirestore();

const mapStateToProps = state => {
    return {
        currentUser: state.authReducer.currentUser,
        isLoading: state.authReducer.isLoading,
        isVendor: state.authReducer.isVendor
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authSuccees: (currentUser) => dispatch(authSuccees(currentUser)),
        authLoading: isLoading => dispatch(authLoading(isLoading)),
        resetCart: () => dispatch(resetCart()),
        authLogOut: () => dispatch(authLogOut())
    }
}


class MainComponent extends React.Component {
    state = {
        currentUser: null,
    }
    unSubscribeFromAuth = null;

    componentDidMount() {
        this.unSubscribeFromAuth = getAuth().onAuthStateChanged(async (user) => {
            this.props.authLoading(true);
            if (user) {
                if (!this.props.isVendor) {
                    const vendorRef = doc(db, "vendors", user.uid);
                    const vendorSnap = await getDoc(vendorRef);
    
                    if (vendorSnap.exists()) {
                        try {
                            alert("This is a vendor email");
                            await signOut(getAuth());
                            this.props.authLogOut();
                            this.props.authLoading(false);
                        } catch (error) {
                            alert(error.message);
                            this.props.authLoading(false);
                        }

                    } else {
                        this.setState({
                            currentUser: user,
                        }, () => {
                            this.props.authLoading(false);
                            this.props.authSuccees(this.state.currentUser);
                        })
                    }
                }else{
                    this.props.authLoading(false);
                }

            } else {
                localStorage.removeItem("cartItems");
                localStorage.removeItem("selectedShop");
                localStorage.removeItem("totalCartItems");
                localStorage.removeItem("TotalPrice");
                this.props.resetCart();
                this.props.authLoading(false);
            }
        })
    }

    componentWillUnmount() {
        this.unSubscribeFromAuth();
    }
    render() {
        return (
            <>
                <Switch>
                    <Route path="/admin" component={AdminMain} />
                    <Route path="/user" exact>
                        <UserMain />
                    </Route>
                    <Route path="/user/medicines/:shopId" component={SearchTableData} />
                    <Route path="/user/userLogin" >
                        {!this.props.currentUser && this.props.isLoading ? <Redirect to="/user" /> : <SignUpForm />}
                    </Route>
                    <Route path="/user/orders" component={UserOrders} />
                    <Route path="/user/checkout" component={Checkout} />
                    <Route path="/vendor-apply" component={VendorApplication} />
                    <Route path="/" exact component={UserChoosing} />
                </Switch>
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);