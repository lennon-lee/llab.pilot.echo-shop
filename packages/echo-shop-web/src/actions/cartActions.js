import axios from 'axios';
import Cookie from 'js-cookie';
import {
  CART_ADD_ITEM,
  // CART_REMOVE_ITEM,
  // CART_SAVE_SHIPPING,
  // CART_SAVE_PAYMENT
} from '../constants/cartConstants';

const addToCart = (productId, qty, callback) => async (dispatch, getState) => {
  try {
    console.log(productId);
    console.log(qty);
    const { data } = await axios.get(`/api/products/${productId}`);
    console.log(data);
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
    console.log(cartItems);
    Cookie.set('cartItems', JSON.stringify(cartItems));

    if (callback) {
      callback();
    }
  } catch (error) {
    console.error(error);
  }
};

export default addToCart;
