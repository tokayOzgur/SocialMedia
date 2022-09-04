import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const ProfileCard = (props) => {
  let pathUsername = props.match.params.username;
  let message = "We can not edit";

  if (pathUsername === props.loggedInUsername) {
    message = "We can edit";
  }

  return <div>{message} </div>;
};

let mapStoreProps = (store) => {
  return {
    loggedInUsername: store.username,
  };
};

export default connect(mapStoreProps)(withRouter(ProfileCard));
