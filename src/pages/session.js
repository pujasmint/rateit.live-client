import React, { Component } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import Invitedetails from "../components/invitedetails";
import { ProgressSpinner } from "primereact/progressspinner";
import { Panel } from "primereact/panel";
import { Chart } from "primereact/chart";
import SessionRatingService from "../api/sessionRatingService";
import SessionService from "../api/sessionService";
import { Messages } from "primereact/messages";
import { Link } from "react-router-dom";
import isEqual from "lodash.isequal";

export default class session extends Component {
  constructor(props) {
    super(props);
    this.sessionRatingService = new SessionRatingService();
    this.sessionService = new SessionService();
    this.state = {
      visible: false,
      session: null,
      sessionData: null,
      pieChartData: null,
      lineChartData: null,
      lastRating: null,
      totalAudience: null
    };
  }

  chartOptions = {
    animation: {
      duration: 0
    }
  };

  getEmojiOnRating(ratings) {
    switch (parseInt(ratings)) {
      case 1:
        return "🤒";
      case 2:
        return "😣";
      case 3:
        return "😕";
      case 4:
        return "😎";
      case 5:
        return "🤑";
      default:
        return "😎";
    }
  }

  getPieChartData(pieData) {
    const data = {
      labels: Object.keys(pieData).map(rating => this.getEmojiOnRating(rating)),
      datasets: [
        {
          data: Object.values(pieData),
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
        }
      ]
    };
    return data;
  }

  stopSession = () => {
    this.sessionService
      .finish({
        id: this.state.session._id,
        status: "FINISHED",
        rating: this.state.lastRating,
        totalAudience: this.state.totalAudience
      })
      .then(res => {
        this.messages.show({
          severity: "info",
          summary: "Session successfully ended"
        });
        this.pollSessionData();
      });
  };

  startSession = () => {
    this.sessionService
      .update({
        id: this.props.match.params.sessionId,
        status: "PROGRESS"
      })
      .then(res => {
        this.messages.show({
          severity: "success",
          summary: "Session successfully started"
        });
        this.pollSessionData();
      });
  };

  getLineChartData(lineData) {
    const data = {
      labels: Object.keys(lineData).map(label => {
        const localDate = new Date(label);
        return `${localDate.getHours()}:${localDate.getMinutes()}:${localDate.getSeconds()}`;
      }),
      datasets: [
        {
          label: "Rating",
          data: Object.values(lineData),
          fill: false,
          backgroundColor: "#42A5F5",
          borderColor: "#42A5F5"
        }
      ]
    };
    return data;
  }

  pollSessionData = () => {
    const intervalHandler = setInterval(() => {
      this.sessionRatingService
        .details({
          sessionId: this.props.match.params.sessionId
        })
        .then(res => {
          if (
            !isEqual(res.sessionRatings, this.state.sessionRatings) ||
            !isEqual(res.session, this.state.session)
          ) {
            this.setState({
              session: res.session,
              pieChartData:
                res.userRatings && this.getPieChartData(res.userRatings),
              lineChartData:
                res.sessionRatings && this.getLineChartData(res.sessionRatings),
              sessionRatings: res.sessionRatings,
              lastRating: res.lastRating,
              totalAudience: res.totalAudience
            });
          }
          if (res.session.status !== "PROGRESS") {
            clearInterval(intervalHandler);
          }
        });
    }, 5000);
  };

  componentDidMount() {
    this.sessionRatingService
      .details({
        sessionId: this.props.match.params.sessionId
      })
      .then(res => {
        this.setState({
          session: res.session,
          pieChartData:
            res.userRatings && this.getPieChartData(res.userRatings),
          lineChartData:
            res.sessionRatings && this.getLineChartData(res.sessionRatings),
          lastRating: res.lastRating,
          totalAudience: res.totalAudience,
          sessionRatings: res.sessionRatings
        });
        if (res.session.status === "PROGRESS") {
          this.pollSessionData();
        }
      });
  }

  onClickInviteDetails = () => {
    this.setState({ visible: true });
  };

  onHideInviteDetails = () => {
    this.setState({ visible: false });
  };

  render() {
    return (
      <div className="p-grid p-justify-center pages">
        <Messages className="p-col-10" ref={el => (this.messages = el)} />
        {this.state.session ? (
          <>
            <Dialog
              header="Joining Details"
              visible={this.state.visible}
              onHide={this.onHideInviteDetails}
              maximizable
            >
              <Invitedetails invitekey={this.state.session.invitekey} />
            </Dialog>

            <div className="p-col-10 p-md-5">
              <Panel header="Session Summary">
                <div className="p-grid p-dir-col">
                  {this.state.lastRating ? (
                    <>
                      <h2 className="p-col-12 text-center display-2">
                        {this.state.lastRating}
                      </h2>
                      <h5 className="p-col-12 text-center display-5">
                        Total Audience:{" "}
                        <span class="text-success">
                          {this.state.totalAudience}
                        </span>
                      </h5>
                    </>
                  ) : (
                    <h3 className="p-col-12 text-center display-3">No Data</h3>
                  )}
                  <h5 className="p-col-12 text-center display-6">
                    Presenter:{" "}
                    <Link
                      className="text-center"
                      to={`/profile/${this.state.session.creator._id}`}
                    >
                      {this.state.session.creator.fullname}
                    </Link>
                  </h5>

                  <Button
                    label="Joining Details"
                    className="p-button-info mb-1"
                    type="button"
                    onClick={this.onClickInviteDetails}
                  />
                  {this.props.loggedInUser &&
                  this.state.session.creator._id ===
                    this.props.loggedInUser._id &&
                  this.state.session.status === "PROGRESS" ? (
                    <Button
                      label="Finish Session"
                      className="p-button-danger"
                      onClick={this.stopSession}
                      type="button"
                    />
                  ) : (
                    ""
                  )}
                  {this.props.loggedInUser &&
                  this.state.session.creator._id ===
                    this.props.loggedInUser._id &&
                  this.state.session.status === "NOTSTARTED" ? (
                    <Button
                      label="Start Session"
                      className="p-button-success"
                      onClick={this.startSession}
                      type="button"
                    />
                  ) : (
                    ""
                  )}
                </div>
              </Panel>
            </div>
            <div className="p-col-10 p-md-5">
              <Panel header="Audience rating">
                {this.state.pieChartData ? (
                  <Chart type="doughnut" data={this.state.pieChartData} />
                ) : (
                  <h3 className="p-col-12 text-center display-2">No Data</h3>
                )}
              </Panel>
            </div>
            <div className="p-col-10">
              <Panel header="Average rating">
                {this.state.lineChartData ? (
                  <Chart type="line" data={this.state.lineChartData} />
                ) : (
                  <h3 className="p-col-12 text-center display-3">No Data</h3>
                )}
              </Panel>
            </div>
          </>
        ) : (
          <ProgressSpinner className="p-col-10" />
        )}
      </div>
    );
  }
}