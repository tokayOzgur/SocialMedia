import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
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
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  let store = createStore(
    authReducer,
    getStateFromStorage(),
    composeEnhancers(applyMiddleware(thunk))
  );
  store.subscribe(() => {
    updateStateInStorage(store.getState());
  });
  return store;
};

export default configureStore;
