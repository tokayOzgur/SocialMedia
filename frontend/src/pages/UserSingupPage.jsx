import { singup } from "../api/apiCalls";
import React from "react";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";

class UserSingupPage extends React.Component {
  state = {
    username: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
    pendingApiCall: false,
    errors: {},
  };

  onChange = (event) => {
    const { name, value } = event.target;
    const errors = { ...this.state.errors };
    errors[name] = undefined;
    if (name === "password" || name === "passwordRepeat") {
      if (name === "password" && value !== this.state.passwordRepeat) {
        errors.passwordRepeat = this.props.t("Password missmatch!");
      } else if (name === "passwordRepeat" && value !== this.state.password) {
        errors.passwordRepeat = this.props.t("Password missmatch!");
      } else {
        errors.passwordRepeat = undefined;
      }
    }
    this.setState({
      [name]: value,
      errors,
    });
  };

  onClickSingUp = async (event) => {
    event.preventDefault();
    const { username, displayName, password } = this.state;
    const body = {
      username,
      displayName,
      password,
    };

    this.setState({ pendingApiCall: true });
    try {
      const response = await singup(body);
    } catch (error) {
      if (error.response.data.validationErrors) {
        this.setState({ errors: error.response.data.validationErrors });
      }
    }
    this.setState({ pendingApiCall: false });
  };

  render() {
    const { pendingApiCall, errors } = this.state;
    const { username, displayName, password, passwordRepeat } = errors;
    const { t } = this.props;
    return (
      <div className="container w-50">
        <form>
          <div className="mt-3">
            <h1 className="text-center">{t("Sing Up")}</h1>
            <Input
              labelName={t("Username")}
              inputName={"username"}
              error={username}
              onChangeMethod={this.onChange}
            />

            <Input
              labelName={t("Display Name")}
              inputName={"displayName"}
              error={displayName}
              onChangeMethod={this.onChange}
            />

            <Input
              labelName={t("Password")}
              inputName={"password"}
              error={password}
              onChangeMethod={this.onChange}
              inputType={"password"}
            />

            <Input
              labelName={t("Password Repeat")}
              inputName={"passwordRepeat"}
              error={passwordRepeat}
              onChangeMethod={this.onChange}
              inputType={"password"}
            />

            <div className="d-grid gap-2 mt-3">
              <button
                size="lg"
                className="btn btn-primary btn-block"
                disabled={pendingApiCall || passwordRepeat !== undefined}
                onClick={this.onClickSingUp}
              >
                {pendingApiCall ? (
                  <div>
                    <span className="spinner-border spinner-border-sm mx-3" />
                    Loading...
                  </div>
                ) : (
                  t("Sing Up")
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
const UserSingupPageWithTranslation = withTranslation()(UserSingupPage);
export default UserSingupPageWithTranslation;
