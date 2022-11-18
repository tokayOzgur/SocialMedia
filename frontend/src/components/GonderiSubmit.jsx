import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProfileImageWithDefault from "./ProfileImageWithDefault";
import { useTranslation } from "react-i18next";
import { postGonderi } from "../api/apiCalls";

const GonderiSubmit = () => {
  const { image } = useSelector((store) => ({ image: store.image }));

  const [focused, setFocused] = useState(false);
  const [gonderi, setGonderi] = useState("");
  const { t } = useTranslation();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!focused) {
      setGonderi("");
      setErrors({});
    }
  }, [focused]);

  useEffect(() => {
    setErrors({});
  }, [gonderi]);

  const onClickGonderi = async () => {
    const body = {
      content: gonderi,
    };

    try {
      await postGonderi(body);
      setFocused(false);
    } catch (error) {
      if (error.response.data.validationErrors) {
        setErrors(error.response.data.validationErrors);
      }
    }
  };
  let textAreaClass = "form-control ";
  if (errors.content) {
    textAreaClass += " is-invalid";
  }
  return (
    <div className="card p-1 flex-row">
      <ProfileImageWithDefault
        image={image}
        width="32"
        height="32"
        className="rounded m-1"
      />
      <div className="flex-fill">
        <textarea 
          className={textAreaClass}
          rows={focused ? "3" : "1"}
          onFocus={() => setFocused(true)}
          onChange={(event) => setGonderi(event.target.value)}
          value={gonderi}
        />
        <div className="invalid-feedback">{errors.content}</div>
        {focused && (
          <div className="text-right mt-1">
            <button className="btn btn-primary" onClick={onClickGonderi}>
              Paylaş
            </button>
            <button
              className="btn btn-light d-inline-flex ml-1"
              onClick={() => setFocused(false)}
            >
              <i className="material-icons">close</i>
              {t("Cancel")}
            </button>
            <div className="invalid-feedback">{errors.content}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GonderiSubmit;
