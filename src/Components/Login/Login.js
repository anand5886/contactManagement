import React, { Component } from "react";
import { FormInput } from "../SharedServices/Generics/InputElement";
import { ServiceUrl } from "../SharedServices/Constant/ServicesUrl";
import { Services } from "../SharedServices/Services";
import { Messages } from "../SharedServices/Constant/Messages";
import "./Login.css";
export class Login extends Component {
  state = {
    user: {
      username: "",
      password: "",
    },
    errors: {},
    submitted: false,
    isRememberMe: false,
    loginStatus: "",
    IsLoginFormValid: false,
    clientId: "",
  };

  handleChange = (event) => {
    const { user } = this.state;
    user[event.target.name] = event.target.value;
    this.setState({ user });
  };

  validation = () => {
    const {
      user: { username, password },
    } = this.state;
    let errors = {};
    let formIsValid = true;
    var UserIDCheck = new RegExp(
      /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g
    ).test(username);
    if (!username || UserIDCheck === false || !password) {
      errors.username = Messages.INVALID_USERNAME_PASSWORD;
      errors.password = Messages.INVALID_USERNAME_PASSWORD;
      formIsValid = false;
    }
    this.setState({ errors: errors });
    return formIsValid;
  };
  onSubmit = async () => {
    var validationCheck = this.validation();
    if (validationCheck === true) {
      const userdetails = {
        UserName: this.state.user.username,
        UserPasswordHash: this.state.user.password,
      };
      var url = ServiceUrl.VALIDATE_USER;
      var result = await Services.PostHandler(url, JSON.stringify(userdetails));
      this.setState({ loginStatus: result.responsemessage });
      this.setState({ clientId: result.clientId });

      if (
        this.state.loginStatus.toUpperCase() ===
        Messages.LOGIN_SUCCESS.toUpperCase()
      ) {
        localStorage.clientId = this.state.clientId;
        localStorage.username = this.state.user.username;
        localStorage.userStatus = Messages.USER_IS_AUTHENTICATED;
        localStorage.token = result.token;
        this.props.history.push("/Home");
      }
    }
  };
  render() {
    const {
      errors,
      user: { username, password },
      loginStatus,
    } = this.state;
    return (
      <div id="loginContainer">
        <div className="loginbackground">
          <div id="loginLogo">
            <h2>My App</h2>
          </div>
          <div className="container">
            <div className="row" id="loginBox">
              <div className="row"></div>
              <div className="col-sm-12">
                <label id="loginContent"></label>
              </div>
            </div>
            <div className="row" id="loginBox">
              <div className="col-sm-4" id="loginControlsBox">
                <div className="col-sm-12" id="signInText">
                  <span>
                    <b>Sign In</b>
                  </span>
                </div>
                <div className="col-sm-12" id="Usernmae">
                  <FormInput
                    label="Username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={this.handleChange}
                    placeholder="User Name"
                    error={errors.username}
                    required
                    className="form-control"
                  />
                </div>

                <div className="col-sm-12" id="Password">
                  <FormInput
                    label="Password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={this.handleChange}
                    placeholder="Password"
                    error={errors.password}
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-sm-12">
                  <button type="button" id="loginBtn" onClick={this.onSubmit}>
                    Sign In
                  </button>
                </div>

                <div className="col-sm-12">
                  <span id="validationMessage">{errors.username}</span>
                  <br />
                  <p id="validationMessage">{loginStatus}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="footer">
          <span>Privacy Policy</span>
        </div>
      </div>
    );
  }
}
