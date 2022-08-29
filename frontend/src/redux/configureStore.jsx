import { createStore } from "redux";
import SecureLS from "secure-ls";
import authReducer from "./authReducer";

let secureLs = new SecureLS();

let getStateFromStorage = () => {
  let hoaxAuth = secureLs.get("hoax-auth");
  let stateInLocalStorage = {
    isLoggedIn: false,
    username: undefined,
    displayName: undefined,
    image: undefined,
    password: undefined,
  };
  if (hoaxAuth) {
    return hoaxAuth;
  }
  return stateInLocalStorage;
};

let updateStateInStorage = (newState) => {
  secureLs.set("hoax-auth", newState);
};

let configureStore = () => {
  let store = createStore(
    authReducer,
    getStateFromStorage(),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  store.subscribe(() => {
    updateStateInStorage(store.getState());
  });
  return store;
};

export default configureStore;
