import *as actionTypes from "./actionTypes"

export const VendorAuthLoading = isLoading =>{
    return{
        type: actionTypes.VENDOR_AUTH_LOADING,
        payload: isLoading
    }
}


export const VendorAuthSuccees = (shopName, vendorId) => {
    return{
        type: actionTypes.VENDOR_AUTH_SUCCESS,
        payload: {
            shopName,
            vendorId
        }
    }
}


export const VendorAuthLogOut = () =>{
    return{
        type: actionTypes.VENDOR_AUTH_LOGOUT
    }
}

export const VendorAuthFailed = errorMessage => {
    return{
        type: actionTypes.VENDOR_AUTH_FAILED,
        payload: errorMessage
    }
}