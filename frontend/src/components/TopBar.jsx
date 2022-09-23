import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../redux/authActions";

const TopBar = (props) => {
  const { t } = useTranslation();

  const { username, isLoggedIn } = useSelector((store) => ({
    isLoggedIn: store.isLoggedIn,
    username: store.username,
  }));

  const dispatch = useDispatch();

  const onLogoutSuccess = () => {
    dispatch(logoutSuccess());
  };

  let links = (
    <ul className="navbar-nav ml-auto float-end">
      <li>
        <Link className="nav-link" to="/login">
          {t("Login")}
        </Link>
      </li>
      <li>
        <Link className="nav-link" to="/signup">
          {t("Sign Up")}
        </Link>
      </li>
    </ul>
  );
  if (isLoggedIn) {
    links = (
      <ul className="navbar-nav ml-auto float-end">
        <li>
          <Link className="nav-link" to={`/user/${username}`}>
            {username}
          </Link>
        </li>
        <li
          className="nav-link"
          onClick={onLogoutSuccess}
          style={{ cursor: "pointer" }}
        >
          {t("Logout")}
        </li>
      </ul>
    );
  }

  return (
    <div className="shadow">
      <nav className="navbar navbar-dark bg-dark mb-3 navbar-expand">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img
              src={logo}
              className="rounded float-start mx-3"
              width={50}
              alt="Social Media Logo"
            />
            DSM
          </Link>

          {links}
        </div>
      </nav>
    </div>
  );
};

export default TopBar;
