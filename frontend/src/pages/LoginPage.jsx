import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { withApiProgress } from "../shared/ApiProgress";
import { connect } from "react-redux";
import { loginHandler } from "../redux/authActions";

const LoginPage = (props) => {
  let [username, setUsername] = useState();
  let [password, setPassword] = useState();
  let [error, setError] = useState();

  useEffect(() => {
    setError(undefined);
  }, [username, password]);

  const onClickLogin = async (event) => {
    event.preventDefault();
    const creds = {
      username,
      password,
    };

    let { history, dispatch } = props;
    const { push } = history;

    setError(undefined);
    try {
      await dispatch(loginHandler(creds));
      push("/");
    } catch (apiError) {
      setError(apiError.response.data.message);
    }
  };

  const { t, pendingApiCall } = props;
  let buttonEnabled = username && password;
  return (
    <div className="container w-50">
      <form>
        <h1 className="text-center">{t("Login")}</h1>
        <Input
          labelName={t("Username")}
          onChangeMethod={(event) => {
            setUsername(event.target.value);
          }}
        />
        <Input
          labelName={t("Password")}
          inputType={"password"}
          onChangeMethod={(event) => {
            setPassword(event.target.value);
          }}
        />
        {error && (
          <div className="alert text-danger mt-2 bg-dark border border-danger border-2">
            {t("Error")}: {error}
          </div>
        )}

        <ButtonWithProgress
          onClick={onClickLogin}
          disabled={!buttonEnabled || pendingApiCall}
          pendingApiCall={pendingApiCall}
          text={t("Login")}
        />
      </form>
    </div>
  );
};

const LoginPageWithTranslation = withTranslation()(LoginPage);

export default connect()(
  withApiProgress(LoginPageWithTranslation, "/api/1.0/auth")
);
