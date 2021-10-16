import axios from 'axios';
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
} from '../constants/orderConstants';

const createOrder = order => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    const {
      userData: { userInfo },
    } = getState();
    const {
      data: { data: newOrder },
    } = await axios.post('api/orders', order, {
      headers: {
        Authorization: ` Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: newOrder });
  } catch (error) {
    dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
  }
};

const detailOrder = orderId => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAIL_REQUEST, payload: orderId });
    const {
      userData: { userInfo },
    } = getState();
    const { data } = await axios.get(`api/orders/${orderId}`, {
      headers: {
        Authorization: ` Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_DETAIL_FAIL, payload: error.message });
  }
};

const payOrder = (order, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST, payload: paymentResult });
    const {
      userData: { userInfo },
    } = getState();
    console.log(`userInfo : ${userInfo}`);
    const { data } = await axios.put(
      `api/orders/${order._id}/pay`,
      paymentResult,
      {
        headers: {
          Authorization: ` Bearer ${userInfo.token}`,
        },
      },
    );
    console.log(`data : ${data}`);
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_PAY_FAIL, payload: error.message });
  }
};

export { createOrder, detailOrder, payOrder };
