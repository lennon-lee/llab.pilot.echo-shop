import axios from 'axios';
import Cookie from 'js-cookie';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING,
  CART_SAVE_PAYMENT,
} from '../constants/cartConstants';

const addToCart = (productId, qty, callback) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/products/${productId}`);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });
    const {
      cartData: { cartItems },
    } = getState();
    Cookie.set('cartItems', JSON.stringify(cartItems));

    if (callback) {
      callback();
    }
  } catch (error) {
    console.error(error);
  }
};

const removeFromCart = productId => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });
    const {
      cartData: { cartItems },
    } = getState();
    Cookie.set('cartItems', JSON.stringify(cartItems));
  } catch (error) {
    console.error(error);
  }
};

const saveShipping = data => async dispatch => {
  dispatch({ type: CART_SAVE_SHIPPING, payload: data });
};

const savePayment = data => async dispatch => {
  dispatch({ type: CART_SAVE_PAYMENT, payload: data });
};

export { addToCart, removeFromCart, saveShipping, savePayment };
