import React from "react";
import InputBase from "../InputBase/InputBase";
import "./MessageBox.css";

const messageBox = ({ reset, index, completed }) => {
  if (index === 0) {
    return (
      <div className="message-box">
        <p>No messages</p>
        <InputBase
          className="reset-btn"
          onClick={reset}
          value="reset"
          type="button"
        />
      </div>
    );
  } else if (index === 1) {
    return (
      <div className="step-progress-bar-wrapper">
        <div className="step-item completed">
          <div className="step-counter"></div>
          <div className="step-name">Cart</div>
        </div>
        <div className="step-item active">
          <div className="step-counter "></div>
          <div className="step-name">Delivery</div>
        </div>
        <div className="step-item ">
          <div className="step-counter "></div>
          <div className="step-name">Payment</div>
        </div>
        <div className="step-item ">
          <div className="step-counter"></div>
          <div className="step-name">Confirmation</div>
        </div>
      </div>
    );
  }
};

export default messageBox;
