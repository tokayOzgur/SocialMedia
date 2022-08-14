import React from "react";
import ApiProgress from "../shared/ApiProgress";
import LanguageSelector from '../components/LanguageSelector';
import UserSingupPage from '../pages/UserSingupPage';
import LoginPage from '../pages/LoginPage';
function App() {
  return (
    <div className="row">
      <div className="col">
          <LoginPage />
      </div>
      <div className="col">
          <UserSingupPage />
      </div>
      <LanguageSelector />
    </div>
  );
}

export default App;
