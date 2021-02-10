import axios from 'axios';
import { LOADING_CART, ADD_TO_CART, INCREASE_QUANTITY, DECREASE_QUANTITY, REMOVE_PRODUCT, REMOVE_FROM_CART, REMOVE_ALL_ITEMS } from "../types"



//ADD ITEM to cart
export const addToCartMain = (productNumber) => dispatch => {
    dispatch({ type: LOADING_CART });
    // console.log(productNumber);
    axios.get(`/api/product/${productNumber}`).then(productDetails => {
        dispatch({
            type: ADD_TO_CART,
            payload: { productNumber: productNumber, productDetails: productDetails.data, itemCount: 1 }
        })
    })
}

//REMOVE ITEM FROM CART
export const removeFromCartMain = (productNumber) => dispatch => {
    dispatch({ type: LOADING_CART });
    dispatch({
        type: REMOVE_FROM_CART,
        payload: productNumber
    })
}

export const increaseQnt = (productNumber) => dispatch => {
    dispatch({ type: LOADING_CART });
    dispatch({
        type: INCREASE_QUANTITY,
        payload: { productNumber: productNumber, itemCount: 1 }
    })

}
export const decreaseQnt = (productNumber) => dispatch => {
    dispatch({ type: LOADING_CART });
    dispatch({
        type: DECREASE_QUANTITY,
        payload: { productNumber: productNumber, itemCount: -1 }
    })
}

export const removeProduct = (productNumber) => dispatch => {
    dispatch({ type: LOADING_CART });
    dispatch({
        type: REMOVE_PRODUCT,
        payload: { productNumber: productNumber }
    })
}

export const makeCartEmpty = () => dispatch => {
    dispatch({ type: LOADING_CART });
    dispatch({ type: REMOVE_ALL_ITEMS });
}