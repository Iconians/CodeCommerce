import React from "react";
import InputBase from "../InputBase/InputBase";
import "./ShippingComponent.css";

const ShippingComponent = ({ index, shipping, total }) => {
  return (
    <div className="shipping-component-parent-div">
      <div className="shipping-form-div">
        <div className="shipping-title">
          <h4>SHIPPING INFORMATION</h4>
          <hr />
        </div>
        <div className="shipping-form">
          <div className="flex address-title-field">
            <h5>Address Title</h5>
            <InputBase type="text" placeholder="Address Title" />
          </div>
          <div className="flex name-field">
            <h5>Name - Surname</h5>
            <InputBase type="text" placeholder="Name" />
          </div>
          <div className="flex address-field">
            <h5>Your Address</h5>
            <InputBase type="text" placeholder="Address" />
          </div>
          <div className="flex zip-select-fields">
            <div className="flex zip-code-field">
              <h5>Zip Code</h5>
              <InputBase type="text" placeholder="zip" />
            </div>
            <div className="flex country-select-div">
              <h5>Country</h5>
              <select name="Country" id="" defaultValue="Select">
                {[...Array(10).keys()].map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div className="flex city-select-div">
              <h5>City</h5>
              <select name="city" id="" defaultValue="Select">
                {[...Array(10).keys()].map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div className="flex state-select-div">
              <h5>State</h5>
              <select name="state" id="">
                {[...Array(10).keys()].map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex cellphone-field">
            <h5>Cell Phone</h5>
            <InputBase
              className="cell-area-code-input"
              placeholder="Area Code"
            />
            <InputBase className="cellphone-input" placeholder="Number" />
          </div>
          <div className="flex phone-field">
            <h5>Telephone</h5>
            <InputBase
              className="phone-area-code-input"
              placeholder="Area Code"
            />
            <InputBase className="phone-input" placeholder="Number" />
          </div>
        </div>
      </div>
      <div className="shipping-method-div">
        <div className="shipping-method-title">
          <hr />
          <h4>SHIPPING METHOD</h4>
        </div>
        <div className="shipping-options">
          <div className="flex standard-option">
            <InputBase
              name="shipping-option"
              checked={shipping(10)}
              type="radio"
            />
            <h5>Standard</h5>
            <p>Delivery in 4-6 Business Days - Free($40 min.)</p>
          </div>
          <div className="flex standard-option express">
            <InputBase
              name="shipping-option"
              type="radio"
              checked={shipping(5)}
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
