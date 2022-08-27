import React from "react";
import { withRouter } from "react-router-dom";
import { Authentication } from "../shared/AuthenticationContext";

const ProfileCard = (props) => {
  let pathUsername = props.username;
  let loggedInUsername = props.username;
  let message = "We can not edit";
  if (pathUsername === loggedInUsername) {
    message = "We can edit";
  }

  return <div>{message} </div>;
};

class ProfileCardContextWraper extends React.Component {
  static contextType = Authentication;
  render() {
    return (
      <div>
        <ProfileCard {...this.props}  username={this.context.state.username} />
      </div>
    );
  }
}

export default withRouter(ProfileCardContextWraper);
