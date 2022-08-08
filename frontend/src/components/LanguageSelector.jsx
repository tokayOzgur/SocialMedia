import React from "react";
import { withTranslation } from "react-i18next";
import { changeLanguageInApiCalls } from "../api/apiCalls";

const LanguageSelector = (props) => {
  const onChangeLanguage = (language) => {
    const { i18n } = props;
    i18n.changeLanguage(language);
    changeLanguageInApiCalls(language);
  };
  const { t } = props;
  return (
    <div className="container">
      <div className="mt-3 position-absolute bottom-0 start-0">
        <label>{t("Choose a language:")}</label>
        <img
          src="https://www.worldometers.info/img/flags/uk-flag.gif"
          width={"24px"}
          height={"24px"}
          alt="English"
          className="mx-3"
          onClick={() => onChangeLanguage("en")}
          style={{ cursor: "pointer" }}
        ></img>
        <img
          src="https://www.worldometers.info/img/flags/tu-flag.gif"
          width={"28px"}
          height={"24px"}
          alt="Turkish"
          onClick={() => onChangeLanguage("tr")}
          style={{ cursor: "pointer" }}
        ></img>
      </div>
    </div>
  );
};
export default withTranslation()(LanguageSelector);
