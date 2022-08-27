import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './i18n';
import App from './container/App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
// import AuthenticationContext from './shared/AuthenticationContext';

let loggedInState = {
    isLoggedIn: false,
    username: undefined,
    displayName: undefined,
    image: undefined,
    password: undefined,
}

let defaultState = {
    isLoggedIn: false,
    username: undefined,
    displayName: undefined,
    image: undefined,
    password: undefined,
}

let reducer = (state = { ...defaultState }, action) => {
    if (action.type === 'logout-success') {
        return defaultState;
    }
    return state;
}

let store = createStore(reducer, loggedInState);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
