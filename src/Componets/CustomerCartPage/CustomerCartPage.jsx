import React from "react";
import "./CustomerCartPage.css";
import CartItem from "../CartItem/CartItem";
import MousePic from "../assets/mouse-pic.png"
import KeyBoard from "../assets/keyboard-pic.png"
import Headphones from "../assets/headphones-pic.png"
import MassageBox from "../MessageBox/MessageBox";
import SummaryComponent from "../SummaryComponent/SummaryComponent";

const INIT_CARTDATA = [
  {name: 'mouse', value: 1, img: MousePic, id: 1, price: 59.99, totalPrice: 0.00},
  {name: 'keyboard', value: 1, img: KeyBoard, id: 2, price: 26.99, totalPrice: 0.00},
  {name: 'headphones', value: 1, img: Headphones, id: 3, price: 36.99, totalPrice: 0.00},
]

class CustomerCartPage extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      cartData: [
        {name: 'mouse', value: 1, img: MousePic, id: 1, price: 59.99, totalPrice: 0.00},
        {name: 'keyboard', value: 1, img: KeyBoard, id: 2, price: 26.99, totalPrice: 0.00},
        {name: 'headphones', value: 1, img: Headphones, id: 3, price: 36.99, totalPrice: 0.00},
      ],
      total: 0.00,
      error: false,
      cartIndex: 0,
      summaryIndex: 0
    }
  }

  updateQuantity = ({ target: { name, value } }) => {
    const { cartData } = this.state
    this.calculateTotal()
    let setValue = cartData.map((item) => { 
      if (name === item.name) {
        if (parseInt(value) === 0) {
          this.removeItem(item.id )
        }
        return {...item, value: parseInt(value), totalPrice: (+value * item.price).toFixed(2)}
      }
      
      return item
    })
    this.setState({
      cartData: setValue 
    })
    
    
  }
  
  removeItem = (id) => {
    const { cartData } = this.state
    const index = cartData.findIndex(item => item.id === id)
  // if (index === -1) {
    let newArr = cartData.splice(index, 1) 
  // }
  this.setState({
    cartData: newArr
  })
   
  }

  calculateTotal = () => {
    const { cartData } = this.state
    let array = []
    cartData.map((item) => (
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
      // this.props.next(2)
    } 
  }

  resetcomponet = () => {
    this.setState({
      cartData: INIT_CARTDATA,
      total: 0
    })
  }

  

  render() {
    const { cartData, error, cartIndex, total } = this.state

    
    
      
    return(

      <div className="parent-div">
       <MassageBox reset={this.resetcomponet} index={cartIndex} />
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
          { cartData.length ? 
              cartData.map((item) => (               
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
        < SummaryComponent index={cartIndex} error={error} total={total} next={this.nextPage} />
      </div>
    )
  }
}

export default CustomerCartPage;