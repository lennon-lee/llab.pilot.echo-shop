import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import userAccessReducer from './reducers/userReducers';
import {
  productListReducer,
  productDetailReducer,
} from './reducers/productReducers';
import cartReducer from './reducers/cartReducers';
import orderCreateReducer from './reducers/orderReducers';

const userInfo = Cookie.getJSON('userInfo') || null;
const cartItems = Cookie.getJSON('cartItems') || [];

const initialState = {
  userData: { userInfo },
  cartData: { cartItems, shipping: {}, payment: {} },
};

const reducer = combineReducers({
  userData: userAccessReducer,
  cartData: cartReducer,
  productList: productListReducer,
  productDetail: productDetailReducer,
  orderCreate: orderCreateReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk)),
);

export default store;
