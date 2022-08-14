import React from "react";
import LanguageSelector from '../components/LanguageSelector';
import UserSingupPage from '../pages/UserSingupPage';
import LoginPage from '../pages/LoginPage';
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import { HashRouter, Route, Redirect, Switch } from "react-router-dom";


function App() {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route exact path={"/"} component={HomePage} />
          <Route path={"/login"} component={LoginPage} />
          <Route path={"/singup"} component={UserSingupPage} />
          <Route path={"/user/:username"} component={UserPage} />
          <Redirect to={"/"} />
        </Switch>
      </HashRouter>
      <LanguageSelector />
    </div>
  );
}

export default App;
