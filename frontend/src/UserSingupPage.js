import axios from 'axios';
import React from 'react'

class UserSingupPage extends React.Component {


  state = {
    userName: null,
    agreedClicked: false,
    displayName: null,
    password: null,
    passwordRepeat: null
  }

  onChangeAgreed = event => {
    console.log(this.state);
    this.setState({
      agreedClicked: event.target.checked
    })
  }

  onChange = event => {
    const value = event.target.value;
    const field = event.target.name;
    this.setState({
      [field]: value
    })
  }

  onClickSingUp = event => {
    event.preventDefault();
    const { userName, displayName, password } = this.state;
    const body = {
      userName,
      displayName,
      password
    }
    axios.post('/api/1.0/users/add', body)
  }

  render() {
    return (
      <form>
        <div>
          <label>Username:</label>
          <input name='userName' onChange={this.onChange} />
        </div>
        <div>
          <label>Display Name:</label>
          <input name='displayName' onChange={this.onChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type={'password'} name="password" onChange={this.onChange} />
        </div>
        <div>
          <label>Password Repeat:</label>
          <input type={'password'} name="passwordRepeat" onChange={this.onChange} />
        </div>
        <div>
          <input type={'checkbox'} name="agreedClicked" onChange={this.onChange} /> Agreed
        </div>
        <button disabled={!this.state.agreedClicked} onClick={this.onClickSingUp}>Sing Up</button>
      </form>
    );
  }
}

export default UserSingupPage;


