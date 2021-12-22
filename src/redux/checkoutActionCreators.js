import *as actionTypes from "./actionTypes";
import "../firebase"
import { doc, getFirestore, writeBatch, increment, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";


const db = getFirestore();


// thunk for selling medicine
export const checkoutUpdate = (customerId, orderInfo) => async (dispatch) => {
    dispatch({
        type: actionTypes.CHECKOUT_LOADING
    });
    const vendorIdFromLS = localStorage.getItem("selectedShop");
    // set the orders into firestore
    const ordersRef = doc(db, "orders", vendorIdFromLS, "ordersPerUser", customerId);
    const ordersSnap = await getDoc(ordersRef);
  
 
    // updating medicines in firestore
    const batch = writeBatch(db);
    const cartItemsFromLS = JSON.parse(localStorage.getItem("cartItems"));
    cartItemsFromLS.map(items => {
        const docRef = doc(db, "allMedicines", vendorIdFromLS, "medicines", items.uid);
        return batch.update(docRef, {
            "amount": increment(-items.quantity),
            "amountSold": increment(+items.quantity)
        });
    })
    try {
        await batch.commit();
        // placing the order 
        if (ordersSnap.exists()) {
            try {
                await updateDoc(ordersRef, {
                    orders: arrayUnion(orderInfo)
                }, {merge: true})
            } catch (error) {
                console.log(error.message);
            }
        } else {
            try {
                setDoc(ordersRef,{orders: [orderInfo]})
            } catch (error) {
                console.log(error.message);
            }
        }
        localStorage.removeItem("cartItems");
        localStorage.removeItem("selectedShop");
        localStorage.removeItem("totalCartItems");
        localStorage.removeItem("TotalPrice");
        dispatch({
            type: actionTypes.RESET_CART
        })
        dispatch({
            type: actionTypes.CHECKOUT_SUCCESS
        });
    } catch (error) {
        dispatch({
            type: actionTypes.CHECKOUT_FAILED
        })
        console.log(error.message)
    }

}
