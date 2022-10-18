import React from "react";
import "./CustomerCartPage.css";
import CartItem from "../CartItem/CartItem";
import InputBase from "../InputBase/InputBsae";
import MousePic from "../assets/mouse-pic.png"
import KeyBoard from "../assets/keyboard-pic.png"
import Headphones from "../assets/headphones-pic.png"


class CustomerCartPage extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      cartItemsData: [
        {name: 'mouse', value: 1, img: MousePic, id: 1, price: 59.99, totalPrice: 0.00},
        {name: 'keyboard', value: 1, img: KeyBoard, id: 2, price: 26.99, totalPrice: 0.00},
        {name: 'headphones', value: 1, img: Headphones, id: 3, price: 36.99, totalPrice: 0.00},
      ],
      total: 0.00,
      error: false
    }
  }

  updateQuantity = ({ target: { name, value } }) => {
    const { cartItemsData } = this.state
    this.calculateTotal()
    let setValue = cartItemsData.map((item) => {
      if (name === item.name) {
        if (parseInt(value) === 0) {
          this.removeItem(item.id)
        }
        return {...item, value: parseInt(value), totalPrice: (+value * item.price).toFixed(2)}
      }
      
      return item
    })
    this.setState({
      cartItemsData: setValue 
    })
    
    
  }
  
  removeItem = (id) => {
    const { cartItemsData } = this.state
    const index = cartItemsData.findIndex(item => item.id === id)
  //   let cartItem = cartItemsData.map((item) => {
  //    if (item.value === 0) {
  //     cartItemsData.splice(item.id, 1)  
  //    }
  //    return item
  // })
  // if (index === -1) {
    cartItemsData.splice(index, 1) 
  // }
  console.log(id, index); 
  // this.setState({
  //   cartItemsData: cartItem
  // })
  
  }

  calculateTotal = () => {
    const { cartItemsData } = this.state
    let array = []
    cartItemsData.map((item) => (
      array.push(item.totalPrice)
    ))
    const sum = array.reduce((accumulator, value) => {
      return accumulator + Number(value);
    }, 0)
    this.setState({
      total: sum.toFixed(2)
    })
  }
  
  nextPage = () => {
    const { total } = this.state
    if (total === 0) {
      this.setState({ error: true })
    }
    else {
      this.props.next(2)
    } 
  }

  

  render() {
    const { cartItemsData, error } = this.state

    
    
      
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
          { cartItemsData.length ? 
              cartItemsData.map((item) => (               
                <div className="cart-items" key={item.id} >            
                  <CartItem name={item.name} price={item.price} totalPrice={item.totalPrice} img={item.img} />
                   <select name={item.name} id={item.id} className="quantity" onChange={this.updateQuantity} defaultValue='0'>
                    {[...Array(10).keys()].map((item) => (<option value={item}>{item}</option>))}
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
                {this.state.total}
              </div>
            </div>  
          
            <div className="shipping-div">
              <div className="total-headings">
                <p>Shipping & handling:</p>
              </div>
              <div className="price-div">-</div>
            </div>
            <div className="discount-div">
              <div className="total-headings">
                <p>Discounts:</p>
              </div>
              <div className="price-div">-</div>
            </div>
            <div className="cart-total-div">
              <div className="total-headings">
                <h5>Cart Total:</h5>
              </div>
              <div className="price-div">
                {this.state.total}
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
              onClick={this.nextPage} 
            />
          </div>
        </div>
      </div>
    )
  }
}

export default CustomerCartPage;