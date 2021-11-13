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

const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const productDetailReducer = (state = { product: [] }, action) => {
  switch (action.type) {
    case PRODUCT_DETAIL_REQUEST:
      return { loading: true };
    case PRODUCT_DETAIL_SUCCESS:
      return { loading: false, product: action.payload, success: true };
    case PRODUCT_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const productReviewAddReducer = (state = { product: [] }, action) => {
  switch (action.type) {
    case PRODUCT_REVIEW_ADD_REQUEST:
      return { loading: true };
    case PRODUCT_REVIEW_ADD_SUCCESS:
      return { loading: false, review: action.payload, success: true };
    case PRODUCT_REVIEW_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export { productListReducer, productDetailReducer, productReviewAddReducer };
