import {singup} from "../api/apiCalls";
import React from "react";

class UserSingupPage extends React.Component {
  state = {
    userName: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
    pendingApiCall: false,
  };

  onChange = (event) => {
    const value = event.target.value;
    const field = event.target.name;
    this.setState({
      [field]: value,
    });
  };

  onClickSingUp = async (event) => {
    event.preventDefault();
    const { userName, displayName, password } = this.state;
    const body = {
      userName,
      displayName,
      password,
    };

    this.setState({ pendingApiCall: true });
    try {
      const response = await singup(body);
    } catch (error) {}
    this.setState({ pendingApiCall: false });
  };

  render() {
    const {pendingApiCall} = this.state;
    return (
      <div className="container w-50">
        <form>
          <div className="mt-3">
            <h1 className="text-center">Sing Up</h1>
            <div className="mt-3">
              <label>Username:</label>
              <input
                name="userName"
                className="form-control"
                onChange={this.onChange}
              />
            </div>
            <div className="mt-3">
              <label>Display Name:</label>
              <input
                name="displayName"
                className="form-control"
                onChange={this.onChange}
              />
            </div>
            <div className="mt-3">
              <label>Password:</label>
              <input
                type={"password"}
                name="password"
                className="form-control"
                onChange={this.onChange}
              />
            </div>
            <div className="mt-3">
              <label>Password Repeat:</label>
              <input
                type={"password"}
                name="passwordRepeat"
                className="form-control"
                onChange={this.onChange}
              />
            </div>

            <div className="d-grid gap-2 mt-3">
              <button
                size="lg"
                className="btn btn-primary btn-block"
                disabled={pendingApiCall}
                onClick={this.onClickSingUp}
              >
                {pendingApiCall
                  ? <div><span className="spinner-border spinner-border-sm mx-3" /> Loading...</div>
                  : "Sing Up"}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default UserSingupPage;
