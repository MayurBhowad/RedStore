import axios from 'axios';
import { LOADING, SET_PRODUCT, SET_PRODUCTS } from '../types';

//GET ALL PRODUCTS
export const getAllProducts = (page, limit) => dispatch => {
    dispatch({ type: LOADING });
    axios.get(`/api/product/allProducts?page=${page}&limit=${limit}`)
        .then(res => {
            dispatch({
                type: SET_PRODUCTS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: SET_PRODUCTS,
                payload: []
            })
        })
}

//GET Single product details by PRODUCT NUMBER
export const getProductByProductNumber = (productNumber) => dispatch => {
    dispatch({ type: LOADING });
    axios.get(`/api/product/${productNumber}`)
        .then(res => {
            // console.log(res.data[0]);
            dispatch({
                type: SET_PRODUCT,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: SET_PRODUCT,
                payload: {}
            })
        })
}

export const sendBillOrderDetails = (bill) => dispatch => {
    // dispatch({ type: LOADING });
    axios.post(`/api/user/userDetails`, bill).then(bill => {
        console.log(bill);
    })
}