import React, { Component } from "react";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";

class LoginPage extends Component {
  state = {
    username: null,
    password: null,
  }

  onChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

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
            <button className="btn btn-primary btn-block">{t("Login")}</button>
          </div>          
        </form>
      </div>
    );
  }
}

const LoginPageWithTranslation = withTranslation()(LoginPage);
export default LoginPageWithTranslation;

