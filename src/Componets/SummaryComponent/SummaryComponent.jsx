import React from "react";
import CartSummary from "../CartSummary/CartSummary";
import InputBase from "../InputBase/InputBase";
import PromoCodeComponent from "../PromoCodeComponent/PromoCodeComponent";
import ShippingMethod from "../ShippingMethod/ShippingMethod";
import ShippingSummary from "../ShippingSummary/ShippingSummary";

const SummaryComponent = ({
  index,
  error,
  total,
  next,
  discounts,
  shipping,
  subTotal,
  disableBtn,
  cartData,
  shippingData,
}) => {
  const buttonValue = () => {
    if (index === 0) {
      return "CHECKOUT";
    } else {
      return "  NEXT  ";
    }
    // else if (index === 1) {
    //   return "NEXT";
    // }
  };
  return (
    <div className="cart-summary-and-totals">
      <div className="summary-div">
        <h4>SUMMARY</h4>
      </div>
      <hr className="summary-hr" />
      {index === 0 ? (
        <PromoCodeComponent />
      ) : (
        <CartSummary cartData={cartData} />
      )}
      <hr />
      <div className="totals-div">
        <div className="cart-subtotal-div">
          <div className="total-headings">
            <p>Cart Subtotal:</p>
          </div>
          <div className="subtotal-price-div price-div">{subTotal}</div>
        </div>

        <div className="shipping-div">
          <div className="total-headings">
            <p>Shipping & handling:</p>
          </div>
          <div className="price-div">{shipping.shippingCost}</div>
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
          <div className="price-div">{total}</div>
        </div>
      </div>
      <hr />
      {index === 1 ? <ShippingSummary shippingData={shippingData} /> : null}
      {index === 1 ? <ShippingMethod shipping={shipping} /> : null}
      <div className="btn-div">
        {error ? <p>select items to checkout</p> : null}
        <InputBase
          className={
            "submit-btn " + (disableBtn ? "submit-btn-disabled" : null)
          }
          type="submit"
          value={buttonValue()}
          onClick={next}
          disabled={disableBtn}
        />
      </div>
    </div>
  );
};

export default SummaryComponent;
