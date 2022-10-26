import React from "react";
import { CardIcon } from "../constants";
import "./PaymentSummary.css";

const PaymentSummary = ({ cardType, total, cardNumber }) => {
  const lastFour = () => {
    if (cardType === "AMERICAN_EXPRESS") {
      return cardNumber.cardNumber.replaceAll(" ", "").slice(10, 14);
    } else {
      return cardNumber.cardNumber.slice(15, 19);
    }
  };
  return (
    <div className="payment-summary-parent-div">
      <div className="payment-summary-title">
        <hr />
        <h4>PAYMENT</h4>
      </div>
      <div className="payment-summary-body">
        <div className="payment-summary-img-div">
          <img
            className="payment-summary-img"
            src={CardIcon[cardType]}
            alt="card"
          />
        </div>
        <h5>{cardType}</h5>
        <p>
          {lastFour()} Total payment: {total}
        </p>
      </div>
    </div>
  );
};

export default PaymentSummary;
