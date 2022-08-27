import React from "react";
import { withRouter } from "react-router-dom";

function ProfileCard(props) {
  let pathUsername = props.match.params.username;
  let loggedInUsername = props.username;
  let message = "We can not edit";
  if (pathUsername === loggedInUsername) {
    message = "We can edit";
  }

  return <div>{message} </div>;
}

export default withRouter(ProfileCard);
