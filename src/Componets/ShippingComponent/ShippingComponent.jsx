import React from "react";
import InputBase from "../InputBase/InputBase";
import "./ShippingComponent.css";

const ShippingComponent = ({
  index,
  handleInputChange,
  standardShipping,
  expressShipping,
  errorMsg,
}) => {
  const formData1stPart = [
    {
      divClassName: "address-title-field",
      h5: "Address Title",
      name: "addressTitle",
      placeholder: "Address Title",
      error: "addressTitleError",
    },
    {
      divClassName: "name-field",
      h5: "Name - Surname",
      name: "name",
      placeholder: "Name",
      error: "nameError",
    },
    {
      divClassName: "address-field",
      h5: "Your Address",
      name: "address",
      placeholder: "Address",
      error: "addressError",
    },
  ];

  const formData2ndpart = [
    {
      divClassName: "zip-code-field",
      h5: "Zip Code",
      name: "zip",
      placeholder: "zip",
      error: "zipError",
    },
    {
      divClassName: "country-select-div",
      h5: "Country",
      name: "country",
      value: "Country",
      error: "countryError",
    },
    {
      divClassName: "city-select-div",
      h5: "City",
      name: "city",
      value: "City",
      error: "cityError",
    },
    {
      divClassName: "state-select-div",
      h5: "State",
      name: "state",
      value: "State",
      error: "stateError",
    },
  ];

  const formData3rddPart = [
    {
      divClassName: "cellphone-field",
      input1class: "cell-area-code-input",
      input2Class: "cellphone-input",
      h5: "Cell Phone",
      type: "text",
      name: "cellAreaCode",
      name2: "cellNum",
      placeholder: "Area Code",
      placeholder2: "Number",
      error: "cellAreaCodeError",
      error2: "cellNumError",
    },
    {
      divClassName: "phone-field",
      input1class: "phone-area-code-input",
      input2Class: "phone-input",
      h5: "Telephone",
      type: "text",
      name: "phoneAreaCode",
      name2: "phoneNum",
      placeholder: "Area Code",
      placeholder2: "Number",
      error: "phoneAreaCodeError",
      error2: "phoneNumError",
    },
  ];

  return (
    <div className="shipping-component-parent-div">
      <div className="shipping-form-div">
        <div className="shipping-title">
          <h4>SHIPPING INFORMATION</h4>
          <hr />
        </div>
        <div className="shipping-form">
          {formData1stPart.map((item) => (
            <div className={`flex input-height`}>
              <h5>{item.h5}</h5>
              <div className={item.divClassName}>
                {errorMsg &&
                errorMsg[item.error] &&
                errorMsg[item.error].length > 1 ? (
                  <div className="error">{errorMsg[item.error]}</div>
                ) : null}
                <InputBase
                  type="text"
                  name={item.name}
                  placeholder={item.placeholder}
                  onChange={handleInputChange}
                  autoComplete="off"
                />
              </div>
            </div>
          ))}
          <div className="flex zip-select-fields">
            {formData2ndpart.map((item) =>
              item.name === "zip" ? (
                <div className={`flex input-height`}>
                  <h5>{item.h5}</h5>
                  <div className={item.divClassName}>
                    {errorMsg &&
                    errorMsg[item.error] &&
                    errorMsg[item.error].length > 1 ? (
                      <div className="error">{errorMsg[item.error]}</div>
                    ) : null}
                    <InputBase
                      type="text"
                      placeholder={item.placeholder}
                      name={item.name}
                      onChange={handleInputChange}
                      autoComplete="off"
                    />
                  </div>
                </div>
              ) : (
                <div className={`flex input-height`}>
                  <h5>{item.h5}</h5>
                  <div className={item.divClassName}>
                    {errorMsg &&
                    errorMsg[item.error] &&
                    errorMsg[item.error].length > 1 ? (
                      <div className="error">{errorMsg[item.error]}</div>
                    ) : null}
                    <select
                      name={item.name}
                      id=""
                      defaultValue="Select"
                      onChange={handleInputChange}
                    >
                      <option>-Select-</option>
                      <option>{item.value}</option>
                    </select>
                  </div>
                </div>
              )
            )}
          </div>
          {formData3rddPart.map((item) => (
            <div className={`flex input-height`}>
              <h5>{item.h5}</h5>
              <div className={item.divClassName}>
                {errorMsg &&
                errorMsg[item.error] &&
                errorMsg[item.error].length > 1 ? (
                  <div className="error">{errorMsg[item.error]}</div>
                ) : null}
                <InputBase
                  className={item.input1class}
                  placeholder={item.placeholder}
                  name={item.name}
                  onChange={handleInputChange}
                  maxLength="3"
                  autoComplete="off"
                />
              </div>
              <div>
                {errorMsg &&
                errorMsg[item.error2] &&
                errorMsg[item.error2].length > 1 ? (
                  <div className="error">{errorMsg[item.error2]}</div>
                ) : null}
                <InputBase
                  className={item.input2Class}
                  placeholder={item.placeholder2}
                  name={item.name2}
                  onChange={handleInputChange}
                  maxLength="7"
                  autoComplete="off"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="shipping-method-div">
        <div className="shipping-method-title">
          <hr />
          <h4>SHIPPING METHOD</h4>
          {errorMsg &&
          errorMsg["shippingMethodError"] &&
          errorMsg["shippingMethodError"].length > 1 ? (
            <div className="error">{errorMsg["shippingMethodError"]}</div>
          ) : null}
        </div>
        <div className="shipping-options">
          <div className="flex standard-option">
            <input
              name="shipping-option"
              type="radio"
              onChange={standardShipping}
            />
            <h5>Standard</h5>
            <p>Delivery in 4-6 Business Days - Free($40 min.)</p>
          </div>
          <div className="flex standard-option express">
            <input
              name="shipping-option"
              type="radio"
              onChange={expressShipping}
            />
            <h5>Express</h5>
            <p>Delivery in 1-3 Business Days - $5.00</p>
          </div>
        </div>
        <div className="back-btn">
          <InputBase type="submit" value="Back To Cart" onClick={index} />
        </div>
      </div>
    </div>
  );
};

export default ShippingComponent;
