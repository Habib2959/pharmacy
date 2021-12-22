import *as actionTypes from "./actionTypes";

export const resetCart = () => {
    return{
        type: actionTypes.RESET_CART
    }
}

export const addToCart = cartItem => dispatch => {
    let cartItems = [];
    let cartItemsFromLS = JSON.parse(localStorage.getItem("cartItems"));
    // adding fisrt item
    if (!cartItemsFromLS || cartItemsFromLS.length === 0) {
        cartItems.push(cartItem);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        dispatch({
            type: actionTypes.CART_ITEMS,
            payload: JSON.parse(localStorage.getItem("cartItems"))
        })
    } else {
        // checking whether the medicine from the same shop or not
        if (cartItemsFromLS[cartItemsFromLS.length - 1].shopId === cartItem.shopId) {
            // checking duplicate cart item
            const duplicateItemIndex = cartItemsFromLS.findIndex(items => items.uid === cartItem.uid)
            if (duplicateItemIndex === -1) {
                cartItemsFromLS.push(cartItem);
                localStorage.setItem("cartItems", JSON.stringify(cartItemsFromLS));
                dispatch({
                    type: actionTypes.CART_ITEMS,
                    payload: JSON.parse(localStorage.getItem("cartItems"))
                })
            } else {
                cartItemsFromLS[duplicateItemIndex].quantity = cartItemsFromLS[duplicateItemIndex].quantity + 1;
                localStorage.setItem("cartItems", JSON.stringify(cartItemsFromLS));
                dispatch({
                    type: actionTypes.CART_ITEMS,
                    payload: JSON.parse(localStorage.getItem("cartItems"))
                })
            }
        } else {
            // confirming to delete previous cart
            if (window.confirm("Selecting from other shop will remove your previous items")) {
                cartItems = [];
                cartItems.push(cartItem);
                localStorage.setItem("cartItems", JSON.stringify(cartItems));
                dispatch({
                    type: actionTypes.CART_ITEMS,
                    payload: JSON.parse(localStorage.getItem("cartItems"))
                })
            }   
        }
    }
    // Total cart item count
    const cartItemForQuantityCount = JSON.parse(localStorage.getItem("cartItems"));
    let totalCartItems = 0
    cartItemForQuantityCount.map(items => {
        return totalCartItems += items.quantity
    })
    localStorage.setItem("totalCartItems", totalCartItems);
    dispatch({
        type: actionTypes.TOTAL_ITEMS_IN_CART,
        payload: totalCartItems
    })
}

export const addItem = uid => dispatch => {
    let cartItemsFromLS = JSON.parse(localStorage.getItem("cartItems"));
    let totalItem = JSON.parse(localStorage.getItem("totalCartItems"));
    const itemIndex = cartItemsFromLS.findIndex(items => items.uid === uid);
    cartItemsFromLS[itemIndex].quantity = cartItemsFromLS[itemIndex].quantity + 1;
    totalItem += 1
    localStorage.setItem("cartItems", JSON.stringify(cartItemsFromLS));
    dispatch({
        type: actionTypes.CART_ITEMS,
        payload: JSON.parse(localStorage.getItem("cartItems"))
    })
    localStorage.setItem("totalCartItems", totalItem);
    dispatch({
        type: actionTypes.TOTAL_ITEMS_IN_CART,
        payload: totalItem
    })
}

export const minusItem = uid => dispatch => {
    let cartItemsFromLS = JSON.parse(localStorage.getItem("cartItems"));
    let totalItem = JSON.parse(localStorage.getItem("totalCartItems"));
    const itemIndex = cartItemsFromLS.findIndex(items => items.uid === uid);
    if (cartItemsFromLS[itemIndex].quantity < 1) {
        cartItemsFromLS.splice(itemIndex, 1);
        localStorage.setItem("cartItems", JSON.stringify(cartItemsFromLS));
        dispatch({
            type: actionTypes.CART_ITEMS,
            payload: JSON.parse(localStorage.getItem("cartItems"))
        })
    } else {
        cartItemsFromLS[itemIndex].quantity -= 1;
        totalItem -= 1
        localStorage.setItem("cartItems", JSON.stringify(cartItemsFromLS));
        localStorage.setItem("totalCartItems", totalItem);
        dispatch({
            type: actionTypes.CART_ITEMS,
            payload: JSON.parse(localStorage.getItem("cartItems"))
        })
        dispatch({
            type: actionTypes.TOTAL_ITEMS_IN_CART,
            payload: totalItem
        })
    }
}