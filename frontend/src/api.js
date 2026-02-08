import axios from "axios";
import store from "./store";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
/**
  intercept any error responses from the api
  and check if the token is no longer valid.
  ie. Token has expired or user is no longer
  authenticated.
  logout the user if the token has expired
 **/
/* Log api requests */
api.interceptors.request.use(
  (request) => {
    const accessToken = store?.getState()?.userLogin?.userInfo?.token;
    if (accessToken) {
      request.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return request;
  },
  (err) => {
    return Promise.reject(err);
  }
);
/* Log api response & reset auth states if Access-Token is no longer valid */
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    return Promise.reject(err);
  }
);
export default api;
