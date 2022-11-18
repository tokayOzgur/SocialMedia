import React from "react";

const ButtonWithProgress = (props) => {
  const { onClick, pendingApiCall, disabled, text, className } = props;

  return (
    <div>
      <div className="my-2">
        <button
          className={className || "btn btn-primary"}
          onClick={onClick}
          disabled={disabled}
        >
          {pendingApiCall && (
            <span className="spinner-border spinner-border-sm"></span>
          )}
          {text}
        </button>
      </div>
    </div>
  );
};

export default ButtonWithProgress;
