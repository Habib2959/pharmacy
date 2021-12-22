import *as actionTypes from "./actionTypes";

export const UiReducer = (state = { allStores: [], isLoading:false }, action) => {
    switch (action.type) {
        case actionTypes.FETCH_STORE:
            return {
                ...state,
                allStores: action.payload
            }
        case actionTypes.FETCH_STORE_LOADING:
            return{
                ...state,
                isLoading: action.payload
            }
        default:
            return state;
    }
}