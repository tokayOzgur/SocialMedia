import { login } from "../api/apiCalls";
import * as ACTIONS from "./Constants";

export const logoutSuccess = () => {
  return {
    type: ACTIONS.LOGOUT_SUCCESS,
  };
};

export const loginSuccess = (authState) => {
  return {
    type: ACTIONS.LOGIN_SUCCESS,
    payload: authState,
  };
};

export const loginHandler = (credentials) => {
  return async function (dispatch) {
    let response = await login(credentials);
    let authState = {
      ...response.data,
      password: credentials.password,
    };
    dispatch(loginSuccess(authState));
    return response;
  };
};
