import React from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Messages } from "primereact/messages";
import { withRouter } from "react-router-dom";

class enterdetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entryKey: null
    };
  }
  updateEntryKey = e => {
    this.setState({
      entryKey: e.target.value
    });
  };

  enterRatingSession = () => {
    if (this.state.entryKey) {
      this.props.history.push(`/rating/${this.state.entryKey}`);
    } else {
      this.messages.show({
        severity: "error",
        summary: "Enter valid session key"
      });
    }
  };
  render() {
    return (
      <div className="p-grid p-justify-center p-align-center">
        <div className="p-col-12">
          <Messages ref={el => (this.messages = el)} life="5000" />
          <div className="p-inputgroup">
            <Button label="Enter" onClick={this.enterRatingSession} />
            <InputText
              placeholder="Enter key from screen"
              onChange={this.updateEntryKey}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(enterdetails);
