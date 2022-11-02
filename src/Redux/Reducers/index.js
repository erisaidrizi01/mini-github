import { combineReducers } from "redux";
import { signin } from "../../Pages/SignIn/SignIn.reducers";

export const actionTypes = {
  SIGNIN_LOADING: "SIGNIN_LOADING",
  SIGNIN_SUCCESS: "SIGNIN_SUCCESS",
  SIGNIN_ERROR: "SIGNIN_ERROR",
  UPDATE_FOLLOWING: "UPDATE_FOLLOWING",
  USER_LOGOUT: "USER_LOGOUT",
};

const reducers = combineReducers({
  signin: signin,
});

export default reducers;
