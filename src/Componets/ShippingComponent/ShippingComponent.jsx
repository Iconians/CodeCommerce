import React from "react";
import InputBase from "../InputBase/InputBase";
import "./ShippingComponent.css"

const ShippingComponent = () => {
  return (
    <div className="shipping-component-parent-div">
      <div className="shipping-form-div">
        <div className="shipping-title">
          <h4>SHIPPING INFORMATION</h4>
          <hr />
        </div>
        <div className="shipping-form">
          <div className="flex address-title-field">
            <h4>Address Title</h4>
            <input type="text" placeholder="Address Title" />
          </div>
          <div className="flex name-field">
            <h4>Name - Surname</h4>
            <input type="text" placeholder="Name" />
          </div>
          <div className="flex address-field">
            <h4>Your Address</h4>
            <input type="text" placeholder="Address" />
          </div>
          <div className="flex zip-select-fields">
            <div className="flex zip-code-field">
              <h4>Zip Code</h4>
              <input type="text" placeholder="zip" />
            </div>
            <div className="flex country-select-div">
              <h4>Country</h4>
              <select name="Country" id="">
                {[...Array(10).keys()].map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div className="flex city-select-div">
              <h4>City</h4>
              <select name="city" id="">
                {[...Array(10).keys()].map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div className="flex state-select-div">
              <h4>State</h4>
              <select name="state" id="">
                {[...Array(10).keys()].map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex cellphone-field">
            <h4>Cell Phone</h4>
            <InputBase placeholder="Area Code" />
            <InputBase placeholder="Number" />
          </div>
          <div className="flex phone-field">
            <h4>Telephone</h4>
            <InputBase placeholder="Area Code" />
            <InputBase placeholder="Number" />
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
            <InputBase type="radio" />
            <h4>Standard</h4>
            <p>Delivery in 4-6 Business Days - Free($40 min.)</p>
          </div>
          <div className="flex standard-option">
            <InputBase type="radio" />
            <h4>Express</h4>
            <p>Delivery in 1-3 Business Days - $5.00</p>
          </div>
        </div>
        <div className="back-btn">
          <InputBase type="submit" />
        </div>
      </div>
    </div>
  );
};

export default ShippingComponent;
