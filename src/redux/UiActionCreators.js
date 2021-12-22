import * as actionTypes from "./actionTypes";
import "../firebase";
import { collection, getDocs, getFirestore, orderBy, query } from "@firebase/firestore";

const db = getFirestore();

const storeFetchLoading = isLoading => {
    return {
        type: actionTypes.FETCH_STORE_LOADING,
        payload: isLoading
    }
}

const storeFetched = allStores => {
    return {
        type: actionTypes.FETCH_STORE,
        payload: allStores
    }
}

export const storeFetching = () => async (dispatch) => {
    dispatch(storeFetchLoading(true))
    const storesRef = collection(db, "vendors");
    const first = query(storesRef, orderBy("shopName"));
    try {
        const snapShot = await getDocs(first)
        const allStores = snapShot.docs.map(items => {
            return { ...items.data(), id: items.id };
        });
        dispatch(storeFetched(allStores));
        dispatch(storeFetchLoading(false))
    } catch (error) {
        console.log(error.message);
        dispatch(storeFetchLoading(false))
    }

}
