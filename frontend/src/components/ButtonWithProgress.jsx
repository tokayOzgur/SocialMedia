import React from "react";

const ButtonWithProgress = (props) => {
  const { onClick, pendingApiCall, disabled, text } = props;

  return (
    <div>
    <div className="d-grid gap-2 mt-3">
      <button
        disabled={disabled}
        className="btn btn-dark btn-block"
        onClick={onClick}
      >
        {pendingApiCall&& <span className="spinner-border spinner-border-sm"></span>}{text}
      </button>
    </div>
  </div>
  );
};

export default ButtonWithProgress;
