import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import userAccessReducer from './reducers/userReducers';
import {
  productListReducer,
  productDetailReducer,
  productReviewAddReducer,
} from './reducers/productReducers';
import cartReducer from './reducers/cartReducers';
import {
  orderCreateReducer,
  orderDetailReducer,
  orderPayReducer,
} from './reducers/orderReducers';

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
  productReviewAdd: productReviewAddReducer,
  orderCreate: orderCreateReducer,
  orderDetail: orderDetailReducer,
  orderPay: orderPayReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk)),
);

export default store;
