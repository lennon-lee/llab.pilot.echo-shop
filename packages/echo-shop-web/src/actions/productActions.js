import axios from 'axios';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
} from '../constants/productConstants';

const listProducts =
  (category = '', searchKeyword = '', sortOrder = '') =>
  async dispatch => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });

      const { data } = await axios.get(
        `/api/products?category=${category}&searchKeyword=${searchKeyword}&sortOrder=${sortOrder}`,
      );
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
  };

const detailProduct = productId => async dispatch => {
  try {
    dispatch({ type: PRODUCT_DETAIL_REQUEST, payload: productId });

    const { data } = await axios.get(`/api/products/${productId}`);
    dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAIL_FAIL, payload: error.message });
  }
};

export { listProducts, detailProduct };
