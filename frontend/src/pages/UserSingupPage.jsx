import React from "react";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { withApiProgress } from "../shared/ApiProgress";
import { connect } from "react-redux";
import { singupHandler } from "../redux/authActions";

class UserSingupPage extends React.Component {
  state = {
    username: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
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

    let { history, dispatch } = this.props;
    let { push } = history;

    const { username, displayName, password } = this.state;

    const body = {
      username,
      displayName,
      password,
    };

    try {
      await dispatch(singupHandler(body));
      push("/");
    } catch (error) {
      if (error.response.data.validationErrors) {
        this.setState({ errors: error.response.data.validationErrors });
      }
    }
  };

  render() {
    const { errors } = this.state;
    const { username, displayName, password, passwordRepeat } = errors;
    const { t, pendingApiCall } = this.props;
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
            <ButtonWithProgress
              onClick={this.onClickSingUp}
              disabled={pendingApiCall || passwordRepeat !== undefined}
              pendingApiCall={pendingApiCall}
              text={t("Sing Up")}
            />
          </div>
        </form>
      </div>
    );
  }
}
const UserSingupPageWithApiProgressForSingupRequest = withApiProgress(
  UserSingupPage,
  "/api/1.0/users"
);
const UserSingupPageWithApiProgressForAuthRequest = withApiProgress(
  UserSingupPageWithApiProgressForSingupRequest,
  "/api/1.0/auth"
);
const UserSingupPageWithTranslation = withTranslation()(
  UserSingupPageWithApiProgressForAuthRequest
);

export default connect()(UserSingupPageWithTranslation);
