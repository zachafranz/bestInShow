/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

function loginAuth(usernameText, passwordText, callback) {
  console.log('In Login Auth Func with', usernameText, passwordText, callback);
  var loginRequest = new XMLHttpRequest();
  loginRequest.open('POST', '/login', true);
  loginRequest.setRequestHeader('Content-Type', 'application/json');

  loginRequest.onload = function() {
    if (loginRequest.status >= 200 && loginRequest.status < 400) {
      console.log('Successful GET Request');
      var resp = loginRequest.responseText;
      var jsonResp = JSON.parse(resp);
      console.log(jsonResp);
      callback(jsonResp);
    } else {
      console.log('NOT Successful GET Request');
    }
  };

  loginRequest.onerror = function() {
    console.log('Connection Error')
  };

  loginRequest.send(JSON.stringify({ usernameText: usernameText, passwordText: passwordText}));
}

function signUpOut(usernameText, passwordText) {
  var loginRequest = new XMLHttpRequest();
  loginRequest.open('POST', '/signUp', true);
  loginRequest.setRequestHeader('Content-Type', 'application/json');

  loginRequest.onload = function() {
    if (loginRequest.status >= 200 && loginRequest.status < 400) {
      console.log('Successful GET Request');
      var resp = loginRequest.responseText;
      var jsonResp = JSON.parse(resp);
      console.log(jsonResp);
    } else {
      console.log('NOT Successful GET Request');
    }
  };

  loginRequest.onerror = function() {
    console.log('Connection Error')
  };

  loginRequest.send(JSON.stringify({ usernameText: usernameText, passwordText: passwordText}));
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.state = {userLogginIn: false, invalidLogin: false, userInfo: undefined};
  }

  login(usernameText, passwordText) {
    console.log('In Login Comp Login Function with', usernameText, passwordText);
    let loginResp = (servResp) => {
      if (!servResp.error) {
        this.setState(() => ({
          userLogginIn: true,
          userInfo: servResp
        }))
      } else {
        this.setState(() => ({
          invalidLogin: true
        }))
      }
    }
    loginAuth(usernameText, passwordText, loginResp);
  }

  signUp(usernameText, passwordText) {
    signUpOut(usernameText, passwordText);
  }

  render() {
    console.log('Login Component Props are', this.props);
    console.log('Login Component State are', this.state);
    console.log('Login Component has', this);
    const { userLogginIn, invalidLogin, userInfo } = this.state;

    if (userLogginIn === true) {
      return <Redirect to={{
                pathname: '/feed',
                state: { referrer: userInfo}
            }}/>
    }

    let failedLogin;
    if (invalidLogin) failedLogin = <div>Bad Login</div>;
    else failedLogin = <div></div>;


    return (
      <div>
        <input type="text" name="username" id="usernameInput" defaultValue="Username"/>
        <input type="text" name="password" id="passwordInput" defaultValue="Passowrd"/>
        <button onClick={() => {
          let usernameText = document.getElementById('usernameInput').value;
          let passwordText = document.getElementById('passwordInput').value;
          console.log('Clicked Login Button:', usernameText, passwordText);
          this.login(usernameText, passwordText);
        }}>Login</button>
        <button onClick={() => {
          let usernameText = document.getElementById('usernameInput').value;
          let passwordText = document.getElementById('passwordInput').value;
          console.log('Clicked Signup Button:', usernameText, passwordText);
          this.signUp(usernameText, passwordText);
        }}>Sign Up</button>
        {failedLogin}
      </div>
    )
  }
}

export default Login;