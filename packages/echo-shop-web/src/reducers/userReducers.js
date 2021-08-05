import {
  USER_ACCESS_REQUEST, USER_ACCESS_SUCCESS, USER_ACCESS_FAIL,
  USER_EXIT,
} from '../constants/userConstatns';

const userAccessReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ACCESS_REQUEST:
      return { loading: true };
    case USER_ACCESS_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_ACCESS_FAIL:
      return { loading: false, error: action.payload };
    case USER_EXIT:
      return {};
    default:
      return state;
  }
};

export default userAccessReducer;
