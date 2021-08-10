import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import userAccessReducer from './reducers/userReducers';
import {
  productListReducer,
  productDetailReducer,
} from './reducers/productReducers';

const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = {
  userData: { userInfo },
};

const reducer = combineReducers({
  userData: userAccessReducer,
  productList: productListReducer,
  productDetail: productDetailReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk)),
);

export default store;
