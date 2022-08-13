import React from "react";

export default function ButtonWithProgress(props) {
  const { onClick, pendingApiCall, disabled, text } = props;
  return (
    <div>
      <div className="d-grid gap-2 mt-3">
        <button
          disabled={disabled}
          className="btn btn-primary btn-block"
          onClick={onClick}
        >
          {pendingApiCall&& <span className="spinner-border spinner-border-sm"></span>}{text}
        </button>
      </div>
    </div>
  );
}
