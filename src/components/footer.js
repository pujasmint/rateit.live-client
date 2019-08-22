import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faInstagram} from '@fortawesome/free-brands-svg-icons';


export default function footer() {
  var fontSize = {
    marginRight: "10px"
  }
  return (
    <footer id="sticky-footer" className="py-3 bg-dark text-white-50">
      <div className="container text-center">
        <small>Copyright &copy; Rateit.live</small>
        <p>
        <FontAwesomeIcon color="white" icon={faFacebookF} style={fontSize}/>
        <FontAwesomeIcon color="white" icon={faTwitter} style={fontSize}/>
        <FontAwesomeIcon color="white" icon={faInstagram} style={fontSize}/>
        </p>
      </div>
    </footer>
  );
}
