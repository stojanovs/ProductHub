/***
 * Profile Reducers
 */

import {
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_PROFILE_UPDATE_FAIL,
  USER_PROFILE_RESET,
} from "../../component/Constants/userConstants";

/**PROFILE REDUCER */

// Profile Reducer
export const userProfileReducer = (state = {}, action) => {
  switch (action.type) {
    // Get Profile request
    case USER_PROFILE_REQUEST:
      return { ...state, loading: true, error: null };
    // Get Profile success
    case USER_PROFILE_SUCCESS:
      return { ...state, loading: false, profile: action.payload, error: null };
    // Get Profile fail
    case USER_PROFILE_FAIL:
      return { ...state, loading: false, error: action.payload };

    // Update Profile request
    case USER_PROFILE_UPDATE_REQUEST:
      return { ...state, updating: true, updateError: null, updateMessage: null };
    // Update Profile success
    case USER_PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        updating: false,
        profile: action.payload.user || action.payload,
        updateMessage: action.payload.message || "Profile updated successfully",
        updateError: null,
      };
    // Update Profile fail
    case USER_PROFILE_UPDATE_FAIL:
      return { ...state, updating: false, updateError: action.payload };

    // Reset Profile
    case USER_PROFILE_RESET:
      return { ...state, profile: null, updateMessage: null, error: null, updateError: null };

    default:
      return state;
  }
};
