import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import "../styles/PopupNewUser.scss";

const PopupNewUser = ({ mobileNumber, handlePopup }) => {
  return (
    <div className="PopupContainer">
      <div className="PopupHeader">
        <FontAwesomeIcon
          icon={faTriangleExclamation}
          style={{ color: "red", margin: "0 5px" }}
        />
        <span>Message</span>
      </div>
      <hr />
      <div className="PopupBody">
        <span>
          Do you want to add this number <strong>{mobileNumber}</strong> as a new user?
        </span>
      </div>
      <div className="PopupFooter">
        <button onClick={() => handlePopup(true)}>Yes</button>
        <button onClick={() => handlePopup(false)}>No</button>
      </div>
    </div>
  );
};

export default PopupNewUser;
