import React from "react";
import './PopUpBox.css';
export const PopUpBox = props => {
  return (
    <div className="popup-box">
      <div className="box">
        <div id="Popup-Header">
          <span id="Popup-Header-Title">{props.popUpTital}</span>
          <span className="close-icon" onClick={props.handleClose}>x</span>
        </div>
        <div>
          {props.content}
        </div>
      </div>
    </div>
  );
};

