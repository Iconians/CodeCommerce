import React from "react";
import "./CustomerCartPage.css";
import ComputerKeyboard from "../ComputerKeyboard/ComputerKeyboard";
import ComputerMouse from "../ComputerMouse/ComputerMouse";
import HeadPhones from "../HeadPhones/HeadPhones";
import InputBase from "../InputBase/InputBsae";
import CartItem from "../CartItem/CartItem";


class CustomerCartPage extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      quantity: [
        {name: 'mouse', value: 1, id: 1, price: 59.99},
        {name: 'keyboard', value: 1, id: 2, price: 26.99},
        {name: 'headphones', value: 1, id: 3, price: 38.99}
      ]
    }
  }

  updateQuantity = ({ target: { name, value } }) => {
    const { quantity } = this.state
    let setValue = quantity.map((item) => {
      if (name === item.name) {
        return {...item, value: value, totalPrice: (+value * item.price)}
      }
      return item
    })
    this.setState({
      quantity:  setValue 
    })
  }
  
  render() {
    const { quantity } = this.state;
    return(
      <div className="parent-div">
        <div className="message-box">
          <p>No messages</p>
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
            { quantity.length ? 
                quantity.map((item) => (
                  <div className="cart-items" key={item.id}>
                    <CartItem name={item.name} price={item.price} totalPrice={item.totalPrice} />    
                    {/* {item.componet} */}
                    {/* create function to setstate of item price then multipy that by quantity */}
                    <select name={item.name} id={item.id} className="quantity" onLoad={this.collectQuantity} defaultValue='0' onChange={this.updateQuantity}>
                      {[...Array(10).keys()].map((item) => (<option value={item} >{item}</option>))}
                    </select>
                    <h4 className="total-price">{item.totalPrice}</h4> 
                    <hr className="hr"/>          
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
              {/* output of function to add total */}

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