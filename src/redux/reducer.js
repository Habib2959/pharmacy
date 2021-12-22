import * as actionTypes from './actionTypes';
import { authReducer } from './authReducer';
import { VendorAuthReducer } from './vendorAuthReducer';
import { combineReducers } from 'redux';
import {UiReducer} from "./UiReducer"
import { cartReducer } from './cartReducer';
import { checkoutReducer } from './checkoutReducer';

export const adminReducer = (state = { allInfo: [], soldAmount: 0, isLoading:false }, action) => {
    switch (action.type) {
        case actionTypes.FETCH_MEDICINES:
            return {
                ...state,
                allInfo: action.payload,
                isLoading:false
            }
        case actionTypes.FETCH_LOADING:
            return{
                ...state,
                isLoading: action.payload
            }
        default:
            return state;
    }
}

export const reducer = combineReducers({
    adminReducer,
    authReducer,
    VendorAuthReducer,
    UiReducer,
    cartReducer,
    checkoutReducer
})