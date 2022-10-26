import React from "react";
import InputBase from "../InputBase/InputBase";
import "./PaymentComponent.css";
import { CARD, CardIcon } from "../constants";

const PaymentComponent = ({
  index,
  total,
  errorMsg,
  handleInputChange,
  cardType,
  maxLength,
  paymentData,
  nextPage,
}) => {
  const formData1stPart = [
    {
      name: "cardName",
      h4: "Cardholders Name",
      className: "name-div",
      placeholder: "name",
      error: "cardNameError",
    },
    {
      name: "cardNumber",
      h4: "Card Number",
      className: "number-div",
      placeholder: "Card Number",
      error: "cardNumberError",
    },
  ];

  const formData2ndpart = [
    {
      className: "month-div",
      name: "cardMonth",
      value: "January",
      error: "cardMonthError",
    },
    {
      className: "year-div",
      name: "cardYear",
      value: "2020",
      error: "cardYearError",
    },
  ];

  return (
    <div className="payment-parent-div">
      <div className="payment-title">
        <h4>PAYMENT INFORMATION</h4>
        <hr />
      </div>
      <div className="card-details">
        {formData1stPart.map((item) => (
          <div className="payment-flex">
            <h4>{item.h4}</h4>
            <div className={item.className}>
              {errorMsg &&
              errorMsg[item.error] &&
              errorMsg[item.error].length > 1 ? (
                <div className="error">{errorMsg[item.error]}</div>
              ) : null}
              <InputBase
                placeholder={item.placeholder}
                type="text"
                value={paymentData && paymentData[item.name]}
                name={item.name}
                onChange={handleInputChange}
                maxLength={maxLength}
              />
              {item.error &&
              item.name === "cardNumber" &&
              CARD.includes(cardType) ? (
                <img className="img" src={CardIcon[cardType]} alt="card" />
              ) : null}
            </div>
          </div>
        ))}

        <div className="expire-div payment-flex">
          <h4>Exp.Date</h4>
          {formData2ndpart.map((item) => (
            <div className={item.className}>
              {errorMsg &&
              errorMsg[item.error] &&
              errorMsg[item.error].length > 1 ? (
                <div className="error">{errorMsg[item.error]}</div>
              ) : null}
              <select name={item.name} id="" onChange={handleInputChange}>
                <option value="select">-Select-</option>
                <option value={item.value}>{item.value}</option>
              </select>
            </div>
          ))}
        </div>
        <div className="payment-flex">
          <h4>CVV</h4>
          <div className="cvv-div">
            {errorMsg &&
            errorMsg["cardCvvError"] &&
            errorMsg["cardCvvError"].length > 1 ? (
              <div className="error">{errorMsg["cardCvvError"]}</div>
            ) : null}
            <InputBase
              placeholder="CVV"
              type="text"
              name="cardCvv"
              onChange={handleInputChange}
              maxLength="3"
            />
          </div>
        </div>
      </div>
      <div className="payment-btn-div">
        <InputBase type="submit" value={`PAY ${total}`} onClick={nextPage} />
      </div>
      <div className="back-btn payment-back-btn">
        <InputBase type="submit" value="BACK TO ADDRESS" onClick={index} />
      </div>
    </div>
  );
};

export default PaymentComponent;
