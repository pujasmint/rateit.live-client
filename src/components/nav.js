import React from "react";
import { Dropdown } from "primereact/dropdown";
import logo from "../assets/rateitlogo.png";
import { Navbar, Nav } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";

class nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profession: null
    };
  }
  professionItems = [
    { label: "Musician", value: "musician" },
    { label: "Lecturer", value: "lecturer" },
    { label: "Yoga teacher", value: "yogateacher" },
    { label: "Chef", value: "chef" },
    { label: "Standup comedian", value: "standupcomedian" },
    { label: "Developer", value: "Developer"}
  ];

  onChange = e => {
    this.setState({ profession: e.target.value });
    this.props.history.push(`/explore/${e.target.value}`);
  };
  render() {
    return (
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        className="top"
      >
        <Navbar.Brand>
          <Link to="/">
            <img className="logo" src={logo} alt="pic" />
          </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav>
            {this.props.user ? (
              <>
                <Nav.Link
                  href="#"
                  onClick={this.props.logout}
                  className="text-danger">
                  Logout
                </Nav.Link>
                <Link
                  className="text-info nav-link"
                  to={`/profile/${this.props.user._id}`}>
                  Home
                </Link>
              </>
            ) : (
              ""
            )}

            <Dropdown
              required
              name="profession"
              value={this.state.profession}
              options={this.professionItems}
              onChange={this.onChange}
              placeholder="Explore professionals"
            />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withRouter(nav);
