import *as actionTypes from "./actionTypes";
import "../firebase"
import { doc, setDoc, getDoc, getFirestore, writeBatch, updateDoc, collection, getDocs, increment } from "firebase/firestore";


const db = getFirestore();

export const soldMedicine = (buttonId, amountSold) => {
    return {
        type: actionTypes.SOLD_MEDICINE,
        payload: {
            uid: buttonId,
            amountSold: amountSold
        }
    }
}

export const fetchLoading = isLoading => {
    return{
        type: actionTypes.FETCH_LOADING,
        payload: isLoading
    }
}


// user auth
export const authLoading = isLoading => {
    return {
        type: actionTypes.AUTH_LOADING,
        payload: isLoading
    }
}


export const authSuccees = (currentUser) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: currentUser
    }
}


export const authLogOut = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authFailed = errorMessage => {
    return {
        type: actionTypes.AUTH_FAILED,
        payload: errorMessage
    }
}

export const vendorCheck = (isVendor) => {
    return{
        type:actionTypes.VENDOR_CHECK,
        payload: isVendor
    }
}


// using thunk for add medicine
export const addMedicineToFirestore = (medicineInfo, vendorId) => async (dispatch) => {
    const uidForNewMedicine = medicineInfo.medicineName.toLowerCase() + medicineInfo.mg;
     const medicineUidRef = doc(db, "allMedicines", vendorId, "medicines", uidForNewMedicine);
     const medicineUidSnap = await getDoc(medicineUidRef);
    //  duplicate medicine check
     if (medicineUidSnap.exists()) {
         try {
            await updateDoc(medicineUidRef, {
                amount: +medicineUidSnap.data().amount + +medicineInfo.amount
            })
         } catch (error) {
             console.log(error);
         }
     } else {
         try {
            await setDoc(medicineUidRef, medicineInfo, {merge: true});
         } catch (error) {
            console.log(error);
         }
     }
     
}

// thunk for fetch medicines
export const fetchMedicines = vendorId => async (dispatch) => {
    const docRef = collection(db, "allMedicines", vendorId, "medicines");
    dispatch(fetchLoading(true));
    try {
        const UpdatedDocSnap = await getDocs(docRef);
        let updatedArray = [];
        
        if (UpdatedDocSnap.docs.length > 0) {
            for (let i= 0;  i< UpdatedDocSnap.docs.length; i++) {
                updatedArray.push(UpdatedDocSnap.docs[i].data()) 
            }
        } 
        dispatch(fetchLoading(false));
        dispatch({ type: actionTypes.FETCH_MEDICINES, payload: updatedArray });
    } catch (error) {
        dispatch(fetchLoading(false));
        console.log(error.message);
    }

}


// thunk for selling medicine
export const addingSoldMedicineToFirestore = (medicineId, amountSold, vendorId) => async (dispatch) => {
    dispatch(fetchLoading(true));
    const batch = writeBatch(db);

    const docRef = doc(db, "allMedicines", vendorId, "medicines", medicineId);
    batch.update(docRef, {
        "amount": increment(-amountSold),
        "amountSold": increment(+amountSold)
    })
    try {
        await batch.commit();
        // updating UI with new medicines
        const allMedicineRef = collection(db, "allMedicines", vendorId, "medicines");
        const allMedicineSnap = await getDocs(allMedicineRef);
        let updatedArray = [];
        
            for (let i= 0;  i< allMedicineSnap.docs.length; i++) {
                updatedArray.push(allMedicineSnap.docs[i].data()) 
            }
        dispatch({ type: actionTypes.FETCH_MEDICINES, payload: updatedArray });
        dispatch(fetchLoading(false));
    } catch (error) {
        dispatch(fetchLoading(false));
        console.log(error.message)
    }
}
