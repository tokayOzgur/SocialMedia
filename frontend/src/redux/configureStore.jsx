import { createStore } from "redux";
import authReducer from "./authReducer";

let configureStore = () => {
  let hoaxAuth = localStorage.getItem("hoax-auth");
  let stateInLocalStorage = {
    isLoggedIn: false,
    username: undefined,
    displayName: undefined,
    image: undefined,
    password: undefined,
  };
  if (hoaxAuth) {
    try {
      stateInLocalStorage = JSON.parse(hoaxAuth);
    } catch (error) {}
  }

  let store = createStore(
    authReducer,
    stateInLocalStorage,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  store.subscribe(() => {
    localStorage.setItem("hoax-auth", JSON.stringify(store.getState()));
  });
  return store;
};

export default configureStore;
