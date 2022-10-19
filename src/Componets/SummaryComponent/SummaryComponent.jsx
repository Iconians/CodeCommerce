import React from "react";
import InputBase from "../InputBase/InputBsae";

const SummaryComponent = ({ index, error, total, next, discounts, shipping, subTotal}) => {
  
  if (index === 0) {
    return (
      <div className="cart-summary-and-totals">
          <div className="summary-div">
            <h4>SUMMARY</h4>
          </div>
          <hr className="summary-hr"/>
          <div className="promo-code-div">
            <p>Do you have a promo code?</p>
            <div className="code-inputs-wrapper">
            <InputBase className="code-input" placeholder="code" />
            <InputBase className="code-input-btn" type="button" value="APPLY" />
            </div>
          </div>
          <hr />
          <div className="totals-div">
            <div className="cart-subtotal-div">
              <div className="total-headings">
                <p>Cart Subtotal:</p>
              </div>
              <div className="subtotal-price-div price-div">
                {subTotal}
              </div>
            </div>  
          
            <div className="shipping-div">
              <div className="total-headings">
                <p>Shipping & handling:</p>
              </div>
              <div className="price-div">{shipping}</div>
            </div>
            <div className="discount-div">
              <div className="total-headings">
                <p>Discounts:</p>
              </div>
              <div className="price-div">{discounts}</div>
            </div>
            <div className="cart-total-div">
              <div className="total-headings">
                <h5>Cart Total:</h5>
              </div>
              <div className="price-div">
                {total}
              </div>
            </div>
          </div>
          <hr />
          <div>
            {error ? <p>select items to checkout</p> : null}
            <InputBase 
              className="submit-btn"
              type="submit"
              value="CHECKOUT"
              onClick={next} 
            />
          </div>
        </div>
    )
  }
}

export default SummaryComponent