import React from "react";
// import './ComputerKeyboard.css';
import KeyBoard from "../assets/keyboard-pic.png"

const ComputerKeyboard = () => (

  <div className="main-wrapper">
    <div className="img-wrapper">
      <img src={KeyBoard} alt="" className="item-img"/>
    </div>
    <div className="description-wrapper">
      <h4>Keyboard</h4>
    </div>
    <div className="price-wrapper">
      <h3>25.99</h3>
    </div>
  </div>
)

export default ComputerKeyboard;