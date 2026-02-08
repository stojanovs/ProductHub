/***
 * AuthReducers
 */

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
} from "../../component/Constants/userConstants";

/**USER REDUCERS */

// Login Reducer
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    // Register Request
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true };
    // Register Success
    case USER_REGISTER_SUCCESS:
      return { ...state, loading: false, message: action.payload, error: null };
    // Register fail
    case USER_REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload };

    // getUserdetails request
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    // getUserdetails success
    case USER_DETAILS_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    // getUserdetails fail
    case USER_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
    // getUserdetails reset
    case USER_DETAILS_RESET:
      return { ...state, user: {} };

    // userLogin request
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    //userLogin Success
    case USER_LOGIN_SUCCESS:
      // success
      return {
        ...state,
        loading: false,
        userInfo: { ...state.userInfo, ...action.payload },
      };
    //userLogin fail
    case USER_LOGIN_FAIL:
      // fail
      return { ...state, loading: false, error: action.payload };
    //userlogout
    case USER_LOGOUT:
      // reset
      return {};

    default:
      return state;
  }
};
