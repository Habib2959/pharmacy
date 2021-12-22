import * as actionTypes from "./actionTypes";



export const authReducer = (state= {isLoading: true, currentUser:null, errorMessage:"", isVendor:true}, action) => {
    switch (action.type) {
        case actionTypes.VENDOR_CHECK:
            return{
                ...state,
                isVendor: action.payload,
                isLoading: false
            }
        case actionTypes.AUTH_LOADING:
            return{
                ...state,
                isLoading: action.payload
            }
        case actionTypes.AUTH_SUCCESS:
            return{
                ...state,
                isLoading:false,
                currentUser: action.payload
            }
        case actionTypes.AUTH_LOGOUT:
            return{
                ...state,
                currentUser:null,
                isLoading:false,
            }
        case actionTypes.AUTH_FAILED:
            console.log("authreducer", action.payload);
            return{
                ...state,
                isLoading: false,
                currentUser: null,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}