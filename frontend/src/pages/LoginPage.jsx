import React, { Component } from "react";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";
import { login } from "../api/apiCalls";

import ButtonWithProgress from "../components/ButtonWithProgress";
import { withApiProgress } from "../shared/ApiProgress";

class LoginPage extends Component {
  state = {
    username: null,
    password: null,
    error: null,
  };

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      error: null,
    });
  };

  onClickLogin = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const creds = {
      username,
      password,
    };
    this.setState.error = null;
    try {
      await login(creds);
    } catch (apiError) {
      this.setState({
        error: apiError.response.data.message,
      });
    }
  };

  render() {
    const { t,pendingApiCall } = this.props;
    const { username, password, error } = this.state;
    let buttonEnabled = username && password;
    return (
      <div className="container w-50">
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
          {this.state.error && (
            <div className="alert alert-danger mt-2">{error}</div>
          )}
          
          <ButtonWithProgress
            onClick={this.onClickLogin}
            disabled={!buttonEnabled || pendingApiCall}
            pendingApiCall={pendingApiCall}
            text={t("Login")}
          />
        </form>
      </div>
    );
  }
}

const LoginPageWithTranslation = withTranslation()(LoginPage);
export default withApiProgress(LoginPageWithTranslation,"/api/1.0/auth");
 