import * as actionTypes from './actionTypes';


const initialState ={
    totalItemCount:localStorage.getItem("totalCartItems") ? JSON.parse(localStorage.getItem("totalCartItems")): 0, 
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")): []
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TOTAL_ITEMS_IN_CART:
        return{
            ...state,
            totalItemCount: action.payload
        }
        case actionTypes.CART_ITEMS:
            return{
                ...state,
                cartItems: action.payload
            }
        case actionTypes.RESET_CART:
            return{
                totalItemCount:0,
                cartItems:[]
            } 
        default:
           return state;
    }
}