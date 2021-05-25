import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import productReducer from './reducers/product.reducer';
import cartReducer from './reducers/cart.reducer';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const initialState = {};

const middleware = [thunk];

const reducer = combineReducers({
    product: productReducer,
    cart: cartReducer
});

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['cart'] // which reducer want to store
};

const pReducer = persistReducer(persistConfig, reducer);


const store = createStore(
    pReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

const persistor = persistStore(store);

export { store, persistor };