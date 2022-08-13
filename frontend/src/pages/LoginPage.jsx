import React, { Component } from "react";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";
import { login } from "../api/apiCalls";
import axios from "axios";
import ButtonWithProgress from "../components/ButtonWithProgress";

class LoginPage extends Component {
  state = {
    username: null,
    password: null,
    error: null,
    pendingApiCall: false,
  };

  componentDidMount() {
    axios.interceptors.request.use((request) => {
      this.setState({ pendingApiCall: true });
      return request;
    });
    axios.interceptors.response.use(
      (response) => {
        this.setState({ pendingApiCall: false });
        return response;
      },
      (error) => {
        this.setState({ pendingApiCall: false });
        throw error;
      }
    );
  }

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
    const { t } = this.props;
    const { username, password, error, pendingApiCall } = this.state;
    let buttonEnabled = username && password;
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
          {this.state.error && (
            <div className="alert alert-danger">{error}</div>
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
export default LoginPageWithTranslation;
