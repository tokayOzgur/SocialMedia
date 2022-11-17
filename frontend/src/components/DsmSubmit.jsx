import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProfileImageWithDefault from "./ProfileImageWithDefault";
import { useTranslation } from "react-i18next";
import { postDsm } from "../api/apiCalls";

const DsmSubmit = () => {
  const { image } = useSelector((store) => ({ image: store.image }));

  const [focused, setFocused] = useState(false);
  const [dsm, setDsm] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    if (!focused) {
      setDsm("");
    }
  }, [focused]);

  const onClickDsm = async () => {
    const body = {
      content: dsm,
    };

    try {
      await postDsm(body);
    } catch (error) {}
  };

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
          className="form-control"
          rows={focused ? "3" : "1"}
          onFocus={() => setFocused(true)}
          onChange={(event) => setDsm(event.target.value)}
          value={dsm}
        />
        {focused && (
          <div className="text-right mt-1">
            <button className="btn btn-primary" onClick={onClickDsm}>
              Hoaxify
            </button>
            <button
              className="btn btn-light d-inline-flex ml-1"
              onClick={() => setFocused(false)}
            >
              <i className="material-icons">close</i>
              {t("Cancel")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DsmSubmit;
