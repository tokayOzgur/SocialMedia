
import React from 'react'

class UserSingupPage extends React.Component {


  state = {
    username: null,
    agreedClicked:false,
    displayName:null,
    password:null,
    passwordRepeat:null
  }

  // onChangeUsername = event => {
  //   console.log(event.target.value);
  //   this.setState({
  //     username : event.target.value
  //   });
  // }

  // onChangeAgreed= event=>{
  //   console.log(this.state);
  //   this.setState({
  //     agreedClicked:event.target.checked
  //   })
  // }

  onChange = event=>{
    const value = event.target.value;
    const field = event.target.name;
    this.setState({
      [field]:value
    })
  }

  render() {
    return (
      <form>
        <div>
          <label>Username:</label>
          <input name='username' onChange={this.onChange} />
        </div>

        <div>
          <label>Display Name:</label>
          <input name='displayName' onChange={this.onChange}/>
        </div>

        <div>
          <label>Password:</label>
          <input type={'password'} name="password" onChange={this.onChange}/>
        </div>
        <div>
          <label>Password Repeat:</label>
          <input type={'password'} name="passwordRepeat" onChange={this.onChange}/>
        </div>
        <div>
          <input type={'checkbox'} name="agreedClicked" onChange={this.onChange} /> Agreed
        </div>
        <button disabled={!this.state.agreedClicked}>Sing Up</button>
      </form>
    );
  }
}

export default UserSingupPage;


