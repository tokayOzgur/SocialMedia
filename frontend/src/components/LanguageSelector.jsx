import React from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../api/apiCalls';

const LanguageSelector = props => {
  const { i18n } = useTranslation();

  const onChangeLanguage = language => {
    i18n.changeLanguage(language);
    changeLanguage(language);
  };

  return (
    <div className="container">
      <div className="mt-3 position-absolute bottom-0 start-0">
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
export default LanguageSelector;
