import React from "react";

export default function Input(props) {
  const { labelName, inputName, error, onChangeMethod, inputType} = props;
  const className = error ? "form-control is-invalid" : "form-control";

  return (
    <div>
      <div className="mt-3">
        <label>{labelName}:</label>
        <input
          name={inputName}
          className={className}
          onChange={onChangeMethod}
          type={inputType}
        />
        <div className="invalid-feedback">{error}</div>
      </div>
    </div>
  );
}
