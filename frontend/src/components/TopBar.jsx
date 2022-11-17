import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../redux/authActions";
import ProfileImageWithDefault from "./ProfileImageWithDefault";

const TopBar = (props) => {
  const { t } = useTranslation();

  const { username, isLoggedIn, displayName, image } = useSelector((store) => ({
    isLoggedIn: store.isLoggedIn,
    username: store.username,
    displayName: store.displayName,
    image: store.image,
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
      <ul className="navbar-nav ml-auto ">
        <li className="nav-item ">
          <div className="d-flex dropdown" style={{ cursor: "pointer" }}>
            <ProfileImageWithDefault
              image={image}
              width="32"
              height="32"
              className="rounded m-auto"
            />
            <span className="nav-link dropdown-toggle">{displayName}</span>
          </div>

          <div className="dropdown-menu p-0 shadow show">
            <Link className="dropdown-item d-flex p-2" to={`/user/${username}`}>
              <i className="material-icons text-info mr-2">person</i>
              {t("My Profile")}
            </Link>
            <span
              className="dropdown-item d-flex p-2"
              onClick={onLogoutSuccess}
              style={{ cursor: "pointer" }}
            >
              <i className="material-icons text-danger mr-2">
                power_settings_new
              </i>
              {t("Logout")}
            </span>
          </div>
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
