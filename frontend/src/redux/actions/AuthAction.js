/***
 * Auth actions
 */
import {
  // Login User Components
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,

  // Regiter  User Components
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  RESET_MESSAGES,

  // User Details Components
  USER_DETAILS_RESET,

  // User Profile Components
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_PROFILE_UPDATE_FAIL,
  USER_PROFILE_RESET,
} from "../../component/Constants/userConstants";

import api from "../../api";

// User Register Action
export const register = (params) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    // save 'data' variable for data coming from backend
    const { data } = await api.post("/auth/register/", params);

    dispatch({
      // if success
      type: USER_REGISTER_SUCCESS,
      payload: data.detail,
    });

    return true;
  } catch (error) {
    // error handling
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// Login Action
export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    // save 'data' variable for data coming from backend
    const { data } = await api.post(
      "/auth/login/",
      // set username to email and password to password
      { username, password }
    );

    // if success
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    // localStorage set item
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    if (error?.response?.data) {
      // error handling
      dispatch({
        type: USER_LOGIN_FAIL,

        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.response.data,
      });
    }
  }
};

// Logout Action
export const logout = () => (dispatch) => {
  // remove items from local storage when the user logs out
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
};

export const resetMessages = () => async (dispatch) => {
  dispatch({
    type: RESET_MESSAGES,
  });
};

// Get User Profile Action
export const getUserProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_PROFILE_REQUEST,
    });

    // Get token from localStorage
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      dispatch({
        type: USER_PROFILE_FAIL,
        payload: "No user token found",
      });
      return;
    }

    const parsedUserInfo = JSON.parse(userInfo);
    const token = parsedUserInfo.token;

    // Fetch profile data from backend
    const { data } = await api.get("/auth/profile/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// Update User Profile Action
export const updateUserProfile = (profileData) => async (dispatch) => {
  try {
    dispatch({
      type: USER_PROFILE_UPDATE_REQUEST,
    });

    // Get token from localStorage
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      dispatch({
        type: USER_PROFILE_UPDATE_FAIL,
        payload: "No user token found",
      });
      return;
    }

    const parsedUserInfo = JSON.parse(userInfo);
    const token = parsedUserInfo.token;

    // Update profile data on backend
    const { data } = await api.put("/auth/profile/", profileData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: USER_PROFILE_UPDATE_SUCCESS,
      payload: data,
    });

    // Also update the email and name in localStorage userInfo
    if (data.user) {
      const updatedUserInfo = {
        ...parsedUserInfo,
        ...data.user,
      };
      localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
      // Update login state
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: updatedUserInfo,
      });
    }

    return true;
  } catch (error) {
    dispatch({
      type: USER_PROFILE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
    return false;
  }
};

// Reset Profile State
export const resetProfileState = () => (dispatch) => {
  dispatch({
    type: USER_PROFILE_RESET,
  });
};

