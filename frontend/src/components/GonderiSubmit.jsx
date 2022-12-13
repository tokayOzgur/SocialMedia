import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProfileImageWithDefault from "./ProfileImageWithDefault";
import { useTranslation } from "react-i18next";
import { postGonderi, postGonderiAttachment } from "../api/apiCalls";
import { useApiProgress } from "../shared/ApiProgress";
import ButtonWithProgress from "./ButtonWithProgress";
import Input from "./Input";

const GonderiSubmit = () => {
  const { image } = useSelector((store) => ({ image: store.image }));
  const pendingApiCall = useApiProgress("post", "/api/1.0/gonderi");

  const [focused, setFocused] = useState(false);
  const [gonderi, setGonderi] = useState("");
  const [newImage, setNewImage] = useState();
  const { t } = useTranslation();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!focused) {
      setGonderi("");
      setErrors({});
      setNewImage();
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

  const onChangeFile = (event) => {
    if (event.target.files.length < 1) {
      return;
    }
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setNewImage(fileReader.result);
      uploadFile(file);
    };
    fileReader.readAsDataURL(file);
  };

  const uploadFile = async (file) => {
    const attachment = new FormData();
    attachment.append("file", file);
    await postGonderiAttachment(attachment);
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
          <div className="mt-1 d-flex align-items-start">
            <>
              <div className="text-right mt-1">
                <ButtonWithProgress
                  className="btn btn-dark d-inline-flex m-2  border"
                  onClick={onClickGonderi}
                  text="Paylaş"
                  pendingApiCall={pendingApiCall}
                  disabled={pendingApiCall}
                />
                <button
                  className="btn btn-light d-inline-flex m-2  border"
                  onClick={() => setFocused(false)}
                  disabled={pendingApiCall}
                >
                  <i className="material-icons">close</i>
                  {t("Cancel")}
                </button>
              </div>

              <Input type="file" onChange={onChangeFile} />
              {newImage && (
                <img
                  className="img-thumbnail w-25"
                  src={newImage}
                  alt="posts-attachment"
                />
              )}
            </>
            <div className="invalid-feedback">{errors.content}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GonderiSubmit;
