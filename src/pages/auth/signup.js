import React from "react";
import { Panel } from "primereact/panel";
import { InputText } from "primereact/inputtext";
import { Messages } from "primereact/messages";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Dropdown } from "primereact/dropdown";
import AuthService from "../../api/authservice";
import { Redirect } from "react-router-dom";

class Signup extends React.Component {
  professionItems = [
    { label: "Musician", value: "musician" },
    { label: "Lecturer", value: "lecturer" },
    { label: "Yoga teacher", value: "yogateacher" },
    { label: "Chef", value: "chef" },
    { label: "Standup comedian", value: "standupcomedian" },
    {label: "Developer", value: "Developer"}
  ];
  constructor(props) {
    super(props);
    this.service = new AuthService();
    this.state = {
      fullname: "",
      username: "",
      password: "",
      contact: "",
      email: "",
      profession: "",
      image: ""
    };
  }

  onChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onUpload = e => {
    this.setState({ image: e.target.files[0] });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.image) {
      this.messages.show({
        severity: "error",
        summary: "Upload profile image"
      });
    }
    this.service
      .signUp(this.state)
      .then(response => {
        this.props.setLoggedInUser(response);
      })
      .catch(err => {
       
      });
  };
  render() {
    return this.props.user ? (
      <Redirect to={`/profile/${this.props.user._id}`} />
    ) : (
      <div className="p-grid p-justify-center p-align-center authpage">
        <div className="p-col-10 p-md-6">
          <Panel header="Signup">
            <Messages
              className="p-col-10"
              ref={el => (this.messages = el)}
              life="5000"
            />
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
                      <i className="pi pi-info" />
                    </span>
                    <InputText
                      placeholder="Fullname"
                      name="fullname"
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
                    <Password
                      placeholder="Password"
                      name="password"
                      onChange={this.onChangeInput}
                      required
                    />
                  </div>
                </div>
                <div className="p-col-8">
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-envelope" />
                    </span>
                    <InputText
                      placeholder="Email"
                      type="email"
                      name="email"
                      onChange={this.onChangeInput}
                      required
                    />
                  </div>
                </div>
                <div className="p-col-8">
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-mobile" />
                    </span>
                    <InputText
                      placeholder="Contact"
                      required
                      name="contact"
                      onChange={this.onChangeInput}
                    />
                  </div>
                </div>
                <div className="p-col-8">
                  <div className="p-inputgroup">
                    <Dropdown
                      required
                      value={this.state.profession}
                      name="profession"
                      options={this.professionItems}
                      onChange={this.onChangeInput}
                      placeholder="Select your profession"
                    />
                  </div>
                </div>
                <div className="p-col-8">
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-image" />
                    </span>
                    <input
                      type="file"
                      name="image"
                      id="file"
                      class="inputfile"
                      onChange={this.onUpload}
                    />
                  </div>
                </div>
                <div className="p-col-5">
                  <Button
                    label="Signup"
                    className="p-button-success"
                    type="submit"
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

export default Signup;
