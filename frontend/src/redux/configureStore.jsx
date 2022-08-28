import { createStore } from "redux";
import authReducer from "./authReducer";

let loggedInState = {
  isLoggedIn: false,
  username: undefined,
  displayName: undefined,
  image: undefined,
  password: undefined,
};

let configureStore = () => {
  return createStore(
    authReducer,
    loggedInState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
};

export default configureStore;
