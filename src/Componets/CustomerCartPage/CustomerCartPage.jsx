import React from "react";
import "./CustomerCartPage.css";
import MousePic from "../assets/mouse-pic.png"
import KeyBoard from "../assets/keyboard-pic.png"
import Headphones from "../assets/headphones-pic.png"
import MassageBox from "../MessageBox/MessageBox";
import SummaryComponent from "../SummaryComponent/SummaryComponent";
import Cart from "../Cart/cart";

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
      subTotal: 0,
      total: 0,
      discounts: 0,
      shipping: 0,
      error: false,
      cartIndex: 0,
    }
  }

  updateQuantity = ({ target: { name, value } }) => {
    const { cartData } = this.state
    let setValue = cartData.map((item) => { 
      if (name === item.name) {
        return {...item, value: parseInt(value), totalPrice: (+value * item.price).toFixed(2)}
      }
      return item
    })
    this.calculateTotal(setValue)
    this.setState({
      cartData: setValue 
    })
    this.removeItem(setValue)
  }
  
  removeItem = (array) => {
    let newCartList = array.filter((item) => {
      return item.value !== 0
    })
    this.setState({
      cartData: newCartList
    })
  }

  calculateTotal = (itemPrice) => {
    let array = []
    itemPrice.map((item) => (
      array.push(item.totalPrice)
    ))
    const sum = array.reduce((accumulator, value) => {
      return accumulator + Number(value);
    }, 0)
    this.setState({
      subTotal: sum.toFixed(2)
    })
    this.grandTotal(sum)
  }

  grandTotal = (subtotal) => {
    const { discounts, shipping } = this.state
   let interger1 = Math.max(subtotal - discounts)
   let sum = Math.max(interger1 + shipping)

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
      this.setState({ cartIndex: + 1})
    } 
  }

  resetcomponet = () => {
    this.setState({
      cartData: INIT_CARTDATA,
      subTotal: 0,
      total: 0
    })
  }

  render() {
    const { 
      cartData, 
      error, 
      cartIndex, 
      total, 
      discounts, 
      shipping, 
      subTotal, 
    } = this.state
   
    return(

      <div className="parent-div">
        <MassageBox reset={this.resetcomponet} index={cartIndex} />
        <Cart index={cartIndex} cartDataArr={cartData} updateQuantity={this.updateQuantity} />
        <SummaryComponent index={cartIndex} error={error} total={total} next={this.nextPage} discounts={discounts} shipping={shipping} subTotal={subTotal} />
      </div>
    )
  }
}

export default CustomerCartPage;