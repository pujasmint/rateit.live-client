import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import Nav from "./components/nav";
//import Footer from "./components/footer";
import AuthService from "./api/authservice";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Session from "./pages/session";
import Rating from "./pages/rating";
import Explore from "./pages/explore";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
    this.service = new AuthService();
  }

  fetchUser() {
    if (this.state.user === null) {
      this.service
        .getLoggedInUser()
        .then(response => this.setLoggedInUser(response))
        .catch(err => {
        });
    }
  }

  setLoggedInUser = user => {
    this.setState({
      user
    });
  };

  logout = () => {
    this.service
      .logOut()
      .then(() => this.setLoggedInUser(null))
      .catch(err => {
      });
  };

  render() {
    this.fetchUser();
    return (
      <>
        <Nav logout={this.logout} user={this.state.user} />
        <Switch>
          <Route
            path="/login"
            render={props => (
              <Login
                {...props}
                setLoggedInUser={this.setLoggedInUser}
                user={this.state.user}
              />
            )}
          />
          <Route
            path="/signup"
            render={props => (
              <Signup
                {...props}
                setLoggedInUser={this.setLoggedInUser}
                user={this.state.user}
              />
            )}
          />
          <Route
            path="/profile/:userId"
            render={props => (
              <Profile {...props} loggedInUser={this.state.user} />
            )}
          />
          <Route
            path="/session/:sessionId"
            render={props => (
              <Session {...props} loggedInUser={this.state.user} />
            )}
          />
          <Route path="/rating/:invitekey" component={Rating} />} />
          <Route path="/explore/:profession" component={Explore} />} />
          <Route
            path="/"
            render={props => <Home {...props} loggedInUser={this.state.user} />}
          />
        </Switch>
      </>
    );
  }
}



export default App;
