import * as actionTypes from "./actionTypes";

export const VendorAuthReducer = (state= {isLoading: true, currentVendor:null, errorMessage:""}, action) => {
    switch (action.type) {
        case actionTypes.VENDOR_AUTH_LOADING:
            return{
                ...state,
                isLoading: action.payload
            }
        case actionTypes.VENDOR_AUTH_SUCCESS:
            return{
                ...state,
                isLoading:false,
                currentVendor: action.payload
            }
        case actionTypes.VENDOR_AUTH_LOGOUT:
            return{
                ...state,
                currentVendor:null,
                isLoading:false,
            }
        case actionTypes.VENDOR_AUTH_FAILED:
            return{
                ...state,
                isLoading: false,
                currentVendor: null,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}