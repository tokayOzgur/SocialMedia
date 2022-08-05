import { singup } from "../api/apiCalls";
import React from "react";

class UserSingupPage extends React.Component {
  state = {
    username: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
    pendingApiCall: false,
    errors: {},
  };

  onChange = (event) => {
    const { name, value } = event.target;
    const errors = { ...this.state.errors };
    errors[name] = undefined;
    this.setState({
      [name]: value,
      errors
    });
  };

  onClickSingUp = async (event) => {
    event.preventDefault();
    const { username, displayName, password } = this.state;
    const body = {
      username,
      displayName,
      password,
    };

    this.setState({ pendingApiCall: true });
    try {
      const response = await singup(body);
    } catch (error) {
      if (error.response.data.validationErrors) {
        this.setState({ errors: error.response.data.validationErrors });
      }
    }
    this.setState({ pendingApiCall: false });
  };

  render() {
    const { pendingApiCall, errors } = this.state;
    const { username } = errors;
    return (
      <div className="container w-50">
        <form>
          <div className="mt-3">
            <h1 className="text-center">Sing Up</h1>
            <div className="mt-3">
              <label>username:</label>
              <input
                name="username"
                className={
                  username ? "form-control is-invalid" : "form-control"
                }
                onChange={this.onChange}
              />
              <div className="invalid-feedback">{username}</div>
            </div>
            <div className="mt-3">
              <label>Display Name:</label>
              <input
                name="displayName"
                className="form-control"
                onChange={this.onChange}
              />
              <div className="invalid-feedback">
                Please provide a valid city.
              </div>
            </div>
            <div className="mt-3">
              <label>Password:</label>
              <input
                type={"password"}
                name="password"
                className="form-control"
                onChange={this.onChange}
              />
              <div className="invalid-feedback">
                Please provide a valid city.
              </div>
            </div>
            <div className="mt-3">
              <label>Password Repeat:</label>
              <input
                type={"password"}
                name="passwordRepeat"
                className="form-control"
                onChange={this.onChange}
              />
              <div className="invalid-feedback">
                Please provide a valid city.
              </div>
            </div>

            <div className="d-grid gap-2 mt-3">
              <button
                size="lg"
                className="btn btn-primary btn-block"
                disabled={pendingApiCall}
                onClick={this.onClickSingUp}
              >
                {pendingApiCall ? (
                  <div>
                    <span className="spinner-border spinner-border-sm mx-3" />
                    Loading...
                  </div>
                ) : (
                  "Sing Up"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default UserSingupPage;
