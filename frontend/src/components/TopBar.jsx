import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../redux/authActions";

const TopBar = (props) => {
  const { t } = useTranslation();

  const { username, isLoggedIn } = useSelector((store) => {
    return {
      isLoggedIn: store.isLoggedIn,
      username: store.username,
    };
  });

  const dispatch = useDispatch();
  let onLogoutSuccess = () => {
    dispatch(logoutSuccess);
  };
  let links = (
    <ul className="navbar-nav">
      <Link className="nav-link text-light" to={"/login"}>
        <li>{t("Login")}</li>
      </Link>
      <Link className="nav-link text-light" to={"/singup"}>
        <li>{t("Sing Up")}</li>
      </Link>
    </ul>
  );
  if (isLoggedIn) {
    links = (
      <ul className="navbar-nav">
        <Link className="nav-link text-light" to={`/user/${username}`}>
          <li>{username}</li>
        </Link>
        <Link className="nav-link text-light" to={"/login"}>
          <li onClick={onLogoutSuccess}>{t("Logout")}</li>
        </Link>
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
            SocialMedia
          </Link>

          {links}
        </div>
      </nav>
    </div>
  );
};

export default TopBar;
