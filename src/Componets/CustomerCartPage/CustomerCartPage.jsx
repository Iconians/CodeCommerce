import React from "react";
import "./CustomerCartPage.css";
import ComputerKeyboard from "../ComputerKeyboard/ComputerKeyboard";
import ComputerMouse from "../ComputerMouse/ComputerMouse";
import HeadPhones from "../HeadPhones/HeadPhones";
import InputBase from "../InputBase/InputBsae";


class CustomerCartPage extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      prices: [],
      // quantity: [
      //   {name: 'mouse', value: 1, id: 1},
      //   {name: 'keyboard', value: 1, id: 2},
      //   {name: 'headphones', value: 1, id: 3}
      // ]
    }
  }

    collectPrice = (name, price, id, quantity) => {
      setTimeout(() => {
        this.setState((prevState) => ({  
          prices: [...prevState.prices, { name: name, price: price, id: id, quantity: quantity } ]
        }))
      }, 1000);  
    } 
  
    
  

  // collectQuantity = (e) => {
  //  const name = e.target.name;
  //  console.log(name)
  //  const id = e.target.id;
  //  const value = e.target.value
   
  //  setTimeout(() => {
  //    this.setState((prevState) => ({
  //     quantity: [...prevState.quantity, { name: name, value: value, id: id} ]
  //    }))
  //   }, 1000);
  // }

  updateQuantity = (e) => {
    const { prices } = this.state
    const name = e.target.name;
    const value = e.target.value;
    let setValue = prices.map((item) => {
      if (name === item.name) {
        return {...item, quantity: parseInt(value)}
      }
      return item
    })
    this.setState({
      prices:  setValue 
    })
  }

  // totalProductPrice = () => {
  //   const { prices, quantity } = this.state
  
  //   setTimeout(() => {
  //   let price = Math.max()
  //   let qty = Math.max()
  //   if ( === ) {
  //     console.log(( Math.max(price * qty).toFixed(2) )) 
  //   }
  //   }, 1000);
  // }
  
  
  cartItems = [
    {componet: <ComputerMouse price={this.collectPrice} />, name: 'mouse', id: 1},
    {componet: <ComputerKeyboard price={this.collectPrice} />, name: 'keyboard', id: 2},
    {componet: <HeadPhones price={this.collectPrice} />, name: 'headphones', id: 3}
  ]

  render() {
   

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
            { this.cartItems.length ? 
                this.cartItems.map((item) => (
                <div className="cart-items" key={item.id}>            
                  {item.componet}
                  {/* create function to setstate of item price then multipy that by quantity */}
                  <select name={item.name} id={item.id} className="quantity" onLoad={this.collectQuantity} onChange={this.updateQuantity}>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                  </select>
                  <h4 className="total-price">{}</h4> 
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