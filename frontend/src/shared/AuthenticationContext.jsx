import React, { Component } from "react";

export let Authentication = React.createContext();

export class AuthenticationContext extends Component {
  state = {
    isLoggedIn: false,
    username: undefined,
    displayName: undefined,
    image: undefined,
    password: undefined,
  };

  onLoginSuccess = (authState) => {
    this.setState({
      ...authState, //tüm fieldlara denk
      isLoggedIn: true,
    });
  };

  onLogoutSuccess = () => {
    this.setState({
      isLoggedIn: false,
      username: undefined,
    });
  };

  render() {
    return (
      <div>
        <Authentication.Provider
          value={{
            state: { ...this.state },
            onLoginSuccess: this.onLoginSuccess,
            onLogoutSuccess: this.onLogoutSuccess,
          }}
        >
          {this.props.children}
        </Authentication.Provider>
      </div>
    );
  }
}

export default AuthenticationContext;
