import React from "react";
import CartItem from "../CartItem/CartItem";

const Cart = ({ index, cartDataArr, updateQuantity}) => {

  if (index === 0) {

    return(
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
      { cartDataArr.length ? 
          cartDataArr.map((item) => (               
            <div className="cart-items" key={item.id} >            
              <CartItem name={item.name} price={item.price} totalPrice={item.totalPrice} img={item.img} />
               <select name={item.name} id={item.id} className="quantity" onChange={updateQuantity} defaultValue='0'>
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
    )
  }
}

export default Cart