import { LOADING, SET_PRODUCT, SET_PRODUCTS } from '../types';

const initialState = {
    loading: false,
    product: {},
    products: [],
    totalProducts: 0
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: true
            }
        case SET_PRODUCT:
            return {
                ...state,
                product: action.payload,
                loading: false
            }
        case SET_PRODUCTS:
            return {
                ...state,
                products: action.payload.products,
                loading: false,
                totalProducts: action.payload.totalProducts
            }
        default:
            return state;
    }
}