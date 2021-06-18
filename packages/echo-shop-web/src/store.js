import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import {
  userLoginReducer
} from './reducers/userReducers';
import {
  productListReducer
} from './reducers/productReducers';

const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = {
  userLogin: { userInfo }
};

const reducer = combineReducers({
  userLogin: userLoginReducer,
  productList: productListReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;