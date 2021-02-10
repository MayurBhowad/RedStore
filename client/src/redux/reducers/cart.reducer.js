import { ADD_TO_CART, LOADING_CART, INCREASE_QUANTITY, DECREASE_QUANTITY, REMOVE_PRODUCT, REMOVE_FROM_CART, REMOVE_ALL_ITEMS } from "../types"

const initialState = {
    loading: false,
    cartItem: []
}

// {
//     productNumber: 1111,
//     productDetails: { productNumber: 1111, productImages: ["https://firebasestorage.googleapis.com/v0/b/reactimgupload-be04a.appspot.com/o/30iaua06r7n?alt=media&token=ddbc9303-6001-49e8-bbcb-c3496c670ae0"] },
//     itemCount: 3
// }

export default (state = initialState, action) => {
    // console.log(action.payload);
    switch (action.type) {
        case LOADING_CART:
            return {
                ...state,
                loading: true
            }
        case ADD_TO_CART:
            let product_existed = state.cartItem.map(el => { return el.productNumber });
            let existed = product_existed.includes(action.payload.productNumber);

            if (!existed) {
                return {
                    ...state,
                    cartItem: [...state.cartItem, action.payload],
                    loading: false
                }
            }
            if (existed) {
                return {
                    ...state,
                    cartItem: state.cartItem.map(el => el.productNumber === action.payload.productNumber ?
                        { ...el, itemCount: el.itemCount + 1 } : el),
                    loading: false
                }
            }

        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItem: state.cartItem.filter(el => el.productNumber !== action.payload),
                loading: false
            }

        case INCREASE_QUANTITY:
            return {
                ...state,
                cartItem: state.cartItem.map(el => el.productNumber === action.payload.productNumber ?
                    { ...el, itemCount: el.itemCount + 1 } : el),
                loading: false
            }

        case DECREASE_QUANTITY:
            return {
                ...state,
                cartItem: state.cartItem.map(el => el.productNumber === action.payload.productNumber ?
                    { ...el, itemCount: el.itemCount - 1 } : el),
                loading: false
            }

        case REMOVE_PRODUCT:
            return {
                ...state,
                cartItem: state.cartItem.filter(el => el.productNumber !== action.payload.productNumber),
                loading: false
            }

        case REMOVE_ALL_ITEMS:
            return {
                ...state,
                cartItem: [],
                loading: false
            }

        default:
            return state;
    }
}