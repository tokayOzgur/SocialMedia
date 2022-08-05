import axios from 'axios';
import React from 'react';


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
      <div className='container'>
        <form>
          <div className='mt-3'>
            <h1 className='text-center'>Sing Up</h1>
            <div className='mt-3'>
              <label>Username:</label>
              <input name='userName' className='form-control' onChange={this.onChange} />
            </div>
            <div className='mt-3'>
              <label>Display Name:</label>
              <input name='displayName' className='form-control' onChange={this.onChange} />
            </div>
            <div className='mt-3'>
              <label>Password:</label>
              <input type={'password'} name="password" className='form-control' onChange={this.onChange} />
            </div>
            <div className='mt-3'>
              <label>Password Repeat:</label>
              <input type={'password'} name="passwordRepeat" className='form-control' onChange={this.onChange} />
            </div>
            <div className='mt-3'>
              <div class="input-group mb-3">
                  <div class="input-group-text">
                    <input className='form-check-input mt-0' type={'checkbox'} name="agreedClicked" onChange={this.onChangeAgreed} />
                  </div>
                <input type="text" class="form-control" value={"Agreed"} />
              </div>
            </div>
            <div class="d-grid gap-2">
              <button size="lg" className='btn btn-primary btn-block' disabled={!this.state.agreedClicked} onClick={this.onClickSingUp}>Sing Up</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default UserSingupPage;


