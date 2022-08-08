import React, { Component } from "react";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";
import { login } from "../api/apiCalls";

class LoginPage extends Component {
  state = {
    username: null,
    password: null,
  };

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onClickLogin = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const creds = {
      username,
      password,
    };
    login(creds);
  };

  render() {
    const { t } = this.props;
    return (
      <div className="container w-25">
        <form>
          <h1 className="text-center">{t("Login")}</h1>
          <Input
            labelName={t("Username")}
            inputName={"username"}
            onChangeMethod={this.onChange}
          />

          <Input
            labelName={t("Password")}
            inputName={"password"}
            inputType={"password"}
            onChangeMethod={this.onChange}
          />

          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-primary btn-block" onClick={this.onClickLogin}>{t("Login")}</button>
          </div>
        </form>
      </div>
    );
  }
}

const LoginPageWithTranslation = withTranslation()(LoginPage);
export default LoginPageWithTranslation;
