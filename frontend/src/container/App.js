import React from "react";
import ApiProgress from "../shared/ApiProgress";
import LanguageSelector from '../components/LanguageSelector';
import UserSingupPage from '../pages/UserSingupPage';
import LoginPage from '../pages/LoginPage';
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
function App() {
  return (
    <div className="row">
      {/* <HomePage/> */}
      <UserPage/>
      <LanguageSelector />
    </div>
  );
}

export default App;
