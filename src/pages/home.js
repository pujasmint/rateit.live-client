import React from "react";
import homeVideo from "../assets/ws.mp4";
import presenter from "../assets/presenter.jpg";
import audience from "../assets/audience.jpg";
import EnterDetails from "../components/enterdetails";
import { Card } from "primereact/card";
import { withRouter } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import Footer from "../components/footer";

class home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }
  onPresenterClick = () => {
    if (this.props.loggedInUser) {
      this.props.history.push(`/profile/${this.props.loggedInUser._id}`);
    } else {
      this.props.history.push(`/login`);
    }
  };

  onAudienceClick = () => {
    this.setState({
      visible: true
    });
  };

  onHide = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const headerP = <img alt="Card" src={presenter} />;
    const headerA = <img alt="Card" src={audience} />;
    return (
      <>
        <Dialog
          header="Enter Details"
          visible={this.state.visible}
          onHide={this.onHide}
          maximizable
        >
          <EnterDetails />
        </Dialog>
        <div className="p-grid p-justify-center p-align-center authpage">
          <div className="homeCards" onClick={this.onPresenterClick}>
            <Card header={headerP}>
              <h5 className="text-center">Presenter</h5>
            </Card>
          </div>
          <div className="homeCards" onClick={this.onAudienceClick}>
            <Card header={headerA}>
              <h5 className="text-center">Audience</h5>
            </Card>
          </div>
        </div>
        <video autoPlay muted loop id="myVideo">
          <source src={homeVideo} type="video/mp4" />
        </video>
        <Footer />
      </>
    );
  }
}

export default withRouter(home);
