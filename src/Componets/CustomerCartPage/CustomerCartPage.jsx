import React from "react";
import "./CustomerCartPage.css";
import ComputerKeyboard from "../ComputerKeyboard/ComputerKeyboard";
import ComputerMouse from "../ComputerMouse/ComputerMouse";
import HeadPhones from "../HeadPhones/HeadPhones";
import InputBase from "../InputBase/InputBsae";


class CustomerCartPage extends React.Component {

render() {

  const cartItems = [
    {componet: <ComputerMouse />},
    {componet: <ComputerKeyboard />},
    {componet: <HeadPhones />}
  ]

  return(
    <div className="parent-div">
      <div className="message-box">
        {/* ternery to check if there are messages or not */}
      </div>
      <div className="cart">
        <div className="cart-headings-div">
          <div className="product-h4">
            <h4>Product</h4>
          </div>
          <div className="price-h4">
            <h4>price</h4>
          </div>
          <div className="quantity-h4">
            <h4>Quantity</h4>
          </div>
          <div className="total-price-h4">  
            <h4>Total Price</h4>
          </div>
          <hr  className="hr"/>
        </div>   
            {cartItems.length ? 
              cartItems.map((item) => (
              <div className="cart-items">              
                {item.componet}
                <select name="Quantity" id="" className="quantity">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
                <h4 className="total-price">00.00</h4> 
                <hr  className="hr"/>          
              </div> 
              ))
              :
              <div className="cart-items">
                <h3>Cart is empty</h3> 
              </div> 
            }
      </div>
      <div className="cart-summary-and-totals">
        <div className="summary-div">
          <h4>SUMMARY</h4>
        </div>
        <hr  className="summary-hr"/>
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
            00.00
            {/* output of function to add cart total */}
          </div>
          </div>  
        
          <div className="shipping-div">
            <div className="total-headings">
              <p>Shipping & handling:</p>
            </div>
            <div className="price-div">00.00</div>
          </div>
          <div className="discount-div">
            <div className="total-headings">
              <p>Discounts:</p>
            </div>
            <div className="price-div">00.00</div>
          </div>
          <div className="cart-total-div">
            <div className="total-headings">
              <h5>Cart Total:</h5>
            </div>
            <div className="price-div">
              00.00
              {/* output of function to add cart total */}
            </div>
          </div>
        </div>
        <hr />
        <div>
          <InputBase 
            className="submit-btn"
            type="submit"
            value="CHECKOUT" 
          />
        </div>
      </div>
    </div>
  )
}

}

export default CustomerCartPage;