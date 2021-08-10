import Axios from 'axios';
import Cookie from 'js-cookie';
import {
  USER_ACCESS_REQUEST,
  USER_ACCESS_SUCCESS,
  USER_ACCESS_FAIL,
  USER_EXIT,
} from '../constants/userConstatns';

const login = (email, password) => async dispatch => {
  dispatch({ type: USER_ACCESS_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post('/api/users/signin', { email, password });
    dispatch({ type: USER_ACCESS_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_ACCESS_FAIL, payload: error.message });
  }
};

const logout = () => dispatch => {
  Cookie.remove('userInfo');
  dispatch({ type: USER_EXIT });
};

const register = (name, email, password) => async dispatch => {
  dispatch({ type: USER_ACCESS_REQUEST, payload: { name, email, password } });
  try {
    const { data } = await Axios.post('/api/users/register', {
      name,
      email,
      password,
    });
    dispatch({ type: USER_ACCESS_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_ACCESS_FAIL, payload: error.message });
  }
};

const update =
  ({ userId, name, email, password }) =>
  async (dispatch, getState) => {
    const {
      userData: { userInfo },
    } = getState();
    dispatch({
      type: USER_ACCESS_REQUEST,
      payload: {
        userId,
        name,
        email,
        password,
      },
    });
    try {
      const { data } = await Axios.put(
        `/api/users/${userId}`,
        { name, email, password },
        { headers: { Authorization: `Bearer ${userInfo.token}` } },
      );
      dispatch({ type: USER_ACCESS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: USER_ACCESS_FAIL, payload: error.message });
    }
  };

export { login, logout, register, update };
