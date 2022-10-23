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
      error2: "callNumError",
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
            <div className={`flex ${item.divClassName}`}>
              <h5>{item.h5}</h5>
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
              />
            </div>
          ))}
          {/* <div className="flex address-title-field">
            <h5>Address Title</h5>
            <InputBase
              type="text"
              name="addressTitle"
              placeholder="Address Title"
              onChange={handleInputChange}
            />
          </div> */}
          {/* <div className="flex name-field">
            <h5>Name - Surname</h5>
            <InputBase
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex address-field">
            <h5>Your Address</h5>
            <InputBase
              type="text"
              placeholder="Address"
              name="address"
              onChange={handleInputChange}
            />
          </div> */}
          <div className="flex zip-select-fields">
            {formData2ndpart.map((item) =>
              item.name === "zip" ? (
                <div className={`flex ${item.divClassName} `}>
                  <h5>{item.h5}</h5>
                  <InputBase
                    type="text"
                    placeholder={item.placeholder}
                    name={item.name}
                    onChange={handleInputChange}
                  />
                </div>
              ) : (
                <div className={`flex ${item.divClassName} `}>
                  <h5>{item.h5}</h5>
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
              )
            )}
            {/* <div className="flex zip-code-field">
              <h5>Zip Code</h5>
              <InputBase
                type="text"
                placeholder="zip"
                name="zip"
                onChange={handleInputChange}
              />
            </div> */}
            {/* <div className="flex country-select-div"> 
              <h5>Country</h5>
              <select
                name="country"
                id=""
                defaultValue="Select"
                onChange={handleInputChange}
              >
                {[...Array(10).keys()].map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div className="flex city-select-div">
              <h5>City</h5>
              <select
                name="city"
                id=""
                defaultValue="Select"
                onChange={handleInputChange}
              >
                {[...Array(10).keys()].map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div className="flex state-select-div">
              <h5>State</h5>
              <select name="state" id="" onChange={handleInputChange}>
                {[...Array(10).keys()].map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div> */}
          </div>
          {formData3rddPart.map((item) => (
            <div className={`flex ${item.divClassName}`}>
              <h5>{item.h5}</h5>
              <InputBase
                className={item.input1class}
                placeholder={item.placeholder}
                name={item.name}
                onChange={handleInputChange}
              />
              <InputBase
                className={item.input2Class}
                placeholder={item.placeholder2}
                name={item.name2}
                onChange={handleInputChange}
              />
            </div>
          ))}

          {/* <div className="flex cellphone-field">
            <h5>Cell Phone</h5>
            <InputBase
              className="cell-area-code-input"
              placeholder="Area Code"
              name="cellAreaCode"
              onChange={handleInputChange}
            />
            <InputBase
              className="cellphone-input"
              placeholder="Number"
              name="cellNum"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex phone-field">
            <h5>Telephone</h5>
            <InputBase
              className="phone-area-code-input"
              name="phoneAreaCode"
              placeholder="Area Code"
              onChange={handleInputChange}
            />
            <InputBase
              className="phone-input"
              name="phoneNum"
              placeholder="Number"
              onChange={handleInputChange}
            />
          </div> */}
        </div>
      </div>
      <div className="shipping-method-div">
        <div className="shipping-method-title">
          <hr />
          <h4>SHIPPING METHOD</h4>
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
