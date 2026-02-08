import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer } from "./redux/reducers/AuthReducer";
import { ProductReducer } from "./redux/reducers/productreducer";
import { userProfileReducer } from "./redux/reducers/profileReducer";

// Initializing reducers

const reducer = combineReducers({
  userLogin: userLoginReducer,
  ProductReducer,
  userProfile: userProfileReducer,
});

// get userInfo from localStorage
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// initialState
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  ProductReducer: { loading: false, products: [], pagination: {} },
  userProfile: { profile: null, loading: false, updating: false },
};
// middleware used thunk
const middleware = [thunk];

// store variable initialized
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
