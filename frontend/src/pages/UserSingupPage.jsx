import React, { useState } from "react";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { withApiProgress } from "../shared/ApiProgress";
import { connect } from "react-redux";
import { singupHandler } from "../redux/authActions";

const UserSingupPage = (props) => {
  let [form, setForm] = useState({
    username: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
  });
  let [errors, setErrors] = useState({});

  let onChange = (event) => {
    const { name, value } = event.target;
    setErrors((previousErrors) => ({ ...previousErrors, [name]: undefined }));
    setForm((previousForm) => ({ ...previousForm, [name]: value }));
  };

  let onClickSingUp = async (event) => {
    event.preventDefault();

    let { history, dispatch } = props;
    let { push } = history;

    let { username, displayName, password } = form;
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
        setErrors(error.response.data.validationErrors);
      }
    }
  };

  const {
    username: usernameError,
    displayName: displayNameError,
    password: passwordError,
  } = errors;
  const { t, pendingApiCall } = props;

  let passwordRepeatError;
  if (form.password !== form.passwordRepeat) {
    passwordRepeatError = t("Password mismatch");
  }

  return (
    <div className="container w-50">
      <form>
        <div className="mt-3">
          <h1 className="text-center">{t("Sing Up")}</h1>
          <Input
            labelName={t("Username")}
            inputName={"username"}
            error={usernameError}
            onChangeMethod={onChange}
          />

          <Input
            labelName={t("Display Name")}
            inputName={"displayName"}
            error={displayNameError}
            onChangeMethod={onChange}
          />

          <Input
            labelName={t("Password")}
            inputName={"password"}
            error={passwordError}
            onChangeMethod={onChange}
            inputType={"password"}
          />

          <Input
            labelName={t("Password Repeat")}
            inputName={"passwordRepeat"}
            error={passwordRepeatError}
            onChangeMethod={onChange}
            inputType={"password"}
          />
          <ButtonWithProgress
            onClick={onClickSingUp}
            disabled={pendingApiCall || passwordRepeatError !== undefined}
            pendingApiCall={pendingApiCall}
            text={t("Sing Up")}
          />
        </div>
      </form>
    </div>
  );
};
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
