import React, { Component } from "react";
import ExploreService from "../api/exploreService";
import { Messages } from "primereact/messages";
import Presenter from "../components/presenter";

export default class explore extends Component {
  constructor(props) {
    super(props);
    this.exploreService = new ExploreService();
    this.state = {
      professionals: null,
      profession: null
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.profession !== this.props.match.params.profession
    ) {
      this.getProfessionals();
    }
  }

  componentDidMount() {
    this.getProfessionals();
  }

  getProfessionals = () => {
    this.exploreService
      .find({
        profession: this.props.match.params.profession
      })
      .then(res => {
        this.setState({
          professionals: res
        });
        this.messages.show({
          severity: "success",
          summary: ` Explore ${
            this.props.match.params.profession
          } professionals below!`
        });
      })
      .catch(err => {
        this.setState({
          professionals: null
        });
        this.messages.show({
          severity: "info",
          summary: ` No ${
            this.props.match.params.profession
          } professionals yet!`
        });
      });
  };
  render() {
    return (
      <div className="p-grid p-justify-start p-align-center pages">
        <Messages className="p-col-12" ref={el => (this.messages = el)} />
        <h5 className="display-5 p-col-12">{`Explore all ${
          this.props.match.params.profession
        } below`}</h5>
        {this.state.professionals ? (
          <div className="p-col-12 p-md-3">
            {this.state.professionals.map(pro => (
              <Presenter user={pro} />
            ))}
          </div>
        ) : (
          <h4>No Data</h4>
        )}
      </div>
    );
  }
}
           