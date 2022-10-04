import React from "react";
import ComputerKeyboard from "../ComputerKeyboard/ComputerKeyboard";
import ComputerMouse from "../ComputerMouse/ComputerMouse";
import HeadPhones from "../HeadPhones/HeadPhones";
import InputBase from "../InputBase/InputBsae";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

class CustomerCartPage extends React.Component {

render() {

  const cartItems = [
    {componet: <ComputerMouse />},
    {componet: <ComputerKeyboard />},
    {componet: <HeadPhones />}
  ]

  return(
    <div>
      <div className="message-box">
        {/* ternery to check if there are messages or not */}
      </div>
      <div className="cart-items-parent-div">
        <div className="headings-div">
          <h4>Product</h4>
          <h4>price</h4>
          <h4>Quantity</h4>
          <h4>Total Price</h4>
        </div> 
          {cartItems.length ? 
            cartItems.map((item) => (
            <div className="cart-items">
              <FontAwesomeIcon  icon={faClose}/>
              {item.componet}
              <select name="Quantity" id="">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              <h4>generate total</h4>           
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
        <div className="promo-code-div">
          <p>Do you have a promo code?</p>
          <div className="code-inputs-wrapper">
          <InputBase placeholder="code" />
          <InputBase 
            type="button"
            value="APPLY"
          />
          </div>
        </div>
        <div className="totals-div">
          <div className="cart-subtotal-div">
            <p>Cart Subtotal:</p>
          </div>  
          <div className="subtotal-price-div">
            {/* output of function to add cart total */}
          </div>
          <div className="shaipping-div">
            <p>Shipping & handling:</p>
            <div>-</div>
          </div>
          <div className="discount-div">
            <p>Discounts:</p>
            <div>-</div>
          </div>
          <div className="cart-total-div">
            <h5>Cart Total:</h5>
            <div>
              {/* output of function to add cart total */}
            </div>
          </div>
        </div>
        <div>
          <InputBase 
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