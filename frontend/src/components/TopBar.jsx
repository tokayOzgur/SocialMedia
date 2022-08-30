import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { connect } from "react-redux";
import { logoutSuccess } from "../redux/authActions";

export class TopBar extends Component {
  onClickLogout = () => {
    this.props.dispatch(logoutSuccess());
  };

  render() {
    const { t, username, isLoggedIn, onLogoutSuccess } = this.props;

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
  }
}

let TopBarWithTranslation = withTranslation()(TopBar);

let mapStoreProps = (store) => {
  return {
    isLoggedIn: store.isLoggedIn,
    username: store.username,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    onLogoutSuccess: () => dispatch(logoutSuccess()),
  };
};

export default connect(
  mapStoreProps,
  mapDispatchToProps
)(TopBarWithTranslation);
