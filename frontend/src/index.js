import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import UserSingupPage from './pages/UserSingupPage';
import LoginPage from './pages/LoginPage';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './i18n';
import LanguageSelector from './components/LanguageSelector';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <LoginPage/>
    {/* <UserSingupPage></UserSingupPage> */}
    <LanguageSelector/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
