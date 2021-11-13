import axios from 'axios';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_REVIEW_ADD_REQUEST,
  PRODUCT_REVIEW_ADD_SUCCESS,
  PRODUCT_REVIEW_ADD_FAIL,
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

const addProductReview = (productId, review) => async (dispatch, getState) => {
  console.log(productId);
  console.log(review);
  try {
    dispatch({ type: PRODUCT_REVIEW_ADD_REQUEST, payload: review });
    const {
      userData: { userInfo },
    } = getState;
    const { data } = await axios.post(
      `/api/products/${productId}/reviews`,
      review,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      },
    );
    dispatch({ type: PRODUCT_REVIEW_ADD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_REVIEW_ADD_FAIL, payload: error.message });
  }
};

export { listProducts, detailProduct, addProductReview };
