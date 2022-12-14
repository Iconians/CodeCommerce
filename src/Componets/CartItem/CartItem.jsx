// import React from "react";
// // import './ComputerMouse.css';
// import MousePic from "../assets/mouse-pic.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

const CartItem = ({ name, price, img, }) => { 

    return(
      <div className="main-wrapper">
        <FontAwesomeIcon icon={faClose} className="close" />
        <div className="description" >
          <img src={img} alt="" className="item-img" />
          <h4>{name.charAt(0).toUpperCase() + name.substring(1)}</h4>
        </div>
        <div className="price-wrapper">
          <h3>{price}</h3>
        </div>
      </div>
    )
}

export default CartItem;