import *as actionTypes from "./actionTypes";


export const checkoutReducer = (state={isLoading: false}, action) => {
    switch (action.type) {
        case actionTypes.CHECKOUT_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
            case actionTypes.CHECKOUT_LOADING:
            return {
                ...state,
                isLoading: true
            }
            case actionTypes.CHECKOUT_FAILED:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state;
    }
}
