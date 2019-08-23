import React from "react";
var QRCode = require("qrcode.react");

export default function invitedetails(props) {
  return (
    <div className="p-grid p-justify-center p-align-center">
      <h1 className="display-2 text-danger m-4">{props.invitekey}</h1>
      <QRCode
        value={`http://rateit.live/rating/${props.invitekey}`}
        size={375}
        renderAs="svg"
        includeMargin={true}
        className="m-2"
      />
    </div>
  );
}
