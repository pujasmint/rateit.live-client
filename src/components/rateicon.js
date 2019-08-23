import React, { Component } from "react";

var scaleRotate = {
  fontSize: "42px",
  transform: "rotate(30deg)",
  cursor: "pointer"
};
var styleDefault = {
  fontSize: "42px",
  cursor: "pointer"
};

export default class RatingIcon extends Component {
  constructor(props) {
    super(props);
    this.handleHover = this.handleHover.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
  }
  state = {
    hover: false
  };
  handleHover() {
    this.setState({ hover: true });
  }

  handleLeave() {
    this.setState({ hover: false });
  }
  render() {
    return (
      <>
        {this.state.hover ? (
          <span
            onClick={() => this.props.onClickRating(this.props.rating)}
            onMouseLeave={this.handleLeave}
            style={scaleRotate}
          >
            {this.props.emoji}
          </span>
        ) : (
          <span onMouseOver={this.handleHover} style={styleDefault}>
            {this.props.emoji}
          </span>
        )}
      </>
    );
  }
}
