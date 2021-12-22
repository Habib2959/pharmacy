import React from "react";
import AdminRoute from "./AdminRoute";
import { connect } from "react-redux";
import { VendorAuthLoading, VendorAuthSuccees, VendorAuthLogOut } from "../redux/vendorActionCreator";
import Spinner from "../spinner/Spinner";
import "../firebase";
import { getAuth, signOut } from "firebase/auth";
import { getDoc, doc, getFirestore, collection,getDocs } from "firebase/firestore";

const mapStateToProps = state => {
    return {
        isLoading: state.VendorAuthReducer.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        VendorAuthLoading: isLoading => dispatch(VendorAuthLoading(isLoading)),
        VendorAuthSuccees: (shopName, vendorId) => dispatch(VendorAuthSuccees(shopName, vendorId)),
        VendorAuthLogOut: () => dispatch(VendorAuthLogOut())
    }
}

const db = getFirestore();
const auth = getAuth();

class AdminMain extends React.Component {
    state = {
        currentVendor: null,
        vendorId: null
    }
    unSubscribeFromAuth = null;

    componentDidMount() {
        this.unSubscribeFromAuth = getAuth().onAuthStateChanged(async user => {
            if (user !== null) {
                this.props.VendorAuthLoading(true);

                // checking vendor from database
                const uid = user.uid;
                const docRef = doc(db, "vendors", uid);
                const snapShot =await getDoc(docRef);
                if (!snapShot.exists()) {
                    alert("You are not a vendor");
                    await signOut(auth);
                    this.setState({
                        currentVendor: user,
                        vendorId: uid
                    }, () => {
                        this.props.VendorAuthLoading(false);
                        this.props.VendorAuthLogOut();
                    })
                } else {
                    // getting data of the matched vendor
                    const querySnapshot = await getDocs(collection(db, "vendors"));
                    // finding the matched vendor
                    let shopname ="";
                    let vendorUid = ""
                    querySnapshot.forEach((doc) => {
                        if (doc.id === uid) {
                            vendorUid = doc.id;
                            shopname= doc.data().shopName;
                            return shopname;
                        }
                      });
                    this.setState({
                        currentVendor: shopname,
                        vendorId : vendorUid
                    }, () => {
                        this.props.VendorAuthLoading(false);
                        this.props.VendorAuthSuccees(this.state.currentVendor, this.state.vendorId);
                    })
                }
                
            } else {
                this.setState({
                    currentVendor: user
                }, () => {
                    this.props.VendorAuthLoading(false);
                    this.props.VendorAuthLogOut();
                })
            }
        })
    }

    componentWillUnmount() {
        this.unSubscribeFromAuth();
    }
    render() {
        return (
            <>
                {this.props.isLoading ? <Spinner /> : <AdminRoute />}
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminMain);