import React from "react";
import ApiProgress from "../shared/ApiProgress";
import LanguageSelector from '../components/LanguageSelector';
import UserSingupPage from '../pages/UserSingupPage';
import LoginPage from '../pages/LoginPage';
function App() {
  return (
    <div className="row">
      <div className="col">
        <ApiProgress path="/api/1.0/users">
          <LoginPage />
        </ApiProgress>
      </div>
      <div className="col">
        <ApiProgress path="/api/1.0/auth">
          <UserSingupPage />
        </ApiProgress>
      </div>
      <LanguageSelector />
    </div>
  );
}

export default App;
