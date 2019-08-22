import React, { Component } from "react";
import { InputText } from "primereact/inputtext";
import { Messages } from "primereact/messages";
import SessionService from "../api/sessionService";
import UserService from "../api/userService";
import { withRouter, Link } from "react-router-dom";
import { Button } from "primereact/button";
import Presenter from "../components/presenter";
import Table from "react-bootstrap/Table";

import { ProgressSpinner } from "primereact/progressspinner";

class profile extends Component {
  constructor(props) {
    super(props);
    this.sessionService = new SessionService();
    this.userService = new UserService();
    this.state = {
      sessionName: null,
      user: null,
      sessions: null
    };
  }

  componentDidMount() {
    this.userService
      .details({ userId: this.props.match.params.userId })
      .then(res => {
        this.setState({
          user: res.user,
          sessions: res.sessions
        });
      })
      .catch(err => {
      });
  }

  updateSessionName = e => {
    this.setState({ sessionName: e.target.value });
  };

  createSession = () => {
    if (!this.state.sessionName) {
      this.messages.show({
        severity: "error",
        summary: "Enter valid session name"
      });
    } else {
      this.sessionService
        .create({ name: this.state.sessionName })
        .then(res => {
          this.props.history.push(`/session/${res._id}`);
        })
        .catch(err => {
        });
    }
  };
  render() {
    const userId = this.props.match.params.userId;
    const loggedInUserId = this.props.loggedInUser
      ? this.props.loggedInUser._id
      : null;
    return (
      <div className="p-grid p-dir-col p-justify-center p-align-center pages presenter">
        {this.state.user ? (
          <>
            <Presenter className="p-col-10 p-md-10" user={this.state.user} />
            <div className="p-col-10 p-md-4">
              {userId === loggedInUserId ? (
                <>
                  <h5 className="display-5">Create New Session</h5>
                  <Messages ref={el => (this.messages = el)} life="5000" />
                  <div className="p-inputgroup">
                    <Button label="Create" onClick={this.createSession} />
                    <InputText
                      placeholder="Enter session name"
                      onChange={this.updateSessionName}
                    />
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
            <div className="p-col-10 p-md-10 mt-2">
              <h5 className="display-5">Or view previous sessions</h5>
              <Table striped bordered hover size="sm" responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Audience</th>
                    <th>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.sessions.map((session, index) => (
                    <tr key={index}>
                      <td>
                        <Link to={`/${session.link}`}>{session.name}</Link>
                      </td>
                      <td>{session.totalAudience}</td>
                      <td>{session.rating}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </>
        ) : (
          <ProgressSpinner />
        )}
      </div>
    );
  }
}

export default withRouter(profile);

