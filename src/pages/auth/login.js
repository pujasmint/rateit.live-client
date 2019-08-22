import React from "react";
import { Panel } from "primereact/panel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import AuthService from "../../api/authservice";
import { Redirect, withRouter } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.service = new AuthService();
    this.state = {
      username: "",
      password: ""
    };
  }

  onChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.service
      .logIn(this.state)
      .then(response => {
        this.props.setLoggedInUser(response);
      })
      .catch(err => {
      });
  };

  onClickSignUp = () => {
    this.props.history.push(`/signup`);
  };
  render() {
    return this.props.user ? (
      <Redirect to={`/profile/${this.props.user._id}`} />
    ) : (
      <div className="p-grid p-justify-center p-align-center authpage">
        <div className="p-col-10 p-md-6">
          <Panel header="Login">
            <form onSubmit={this.handleSubmit}>
              <div className="p-grid p-fluid p-justify-center">
                <div className="p-col-8">
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-user" />
                    </span>
                    <InputText
                      placeholder="Username"
                      name="username"
                      onChange={this.onChangeInput}
                      required
                    />
                  </div>
                </div>
                <div className="p-col-8">
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-key" />
                    </span>
                    <InputText
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={this.onChangeInput}
                      required
                    />
                  </div>
                </div>
                <div className="p-col-5">
                  <Button
                    label="Login"
                    className="p-button-success"
                    type="submit"
                  />
                </div>
                <div className="p-col-5">
                  <Button
                    onClick={this.onClickSignUp}
                    label="Signup"
                    className="p-button-info"
                    type="button"
                  />
                </div>
              </div>
            </form>
          </Panel>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
