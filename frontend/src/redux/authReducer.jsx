import * as ACTIONS from "./Constants";

let defaultState = {
  isLoggedIn: false,
  username: undefined,
  displayName: undefined,
  image: undefined,
  password: undefined,
};

let authReducer = (state = { ...defaultState }, action) => {
  if (action.type === ACTIONS.LOGOUT_SUCCESS) {
    return defaultState;
  } else if (action.type === ACTIONS.LOGIN_SUCCESS) {
    return {
      ...action.payload,
      isLoggedIn: true,
    };
  }
  return state;
};

export default authReducer;
