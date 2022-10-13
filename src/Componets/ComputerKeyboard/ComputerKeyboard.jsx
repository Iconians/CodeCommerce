import React from "react";
// import './ComputerKeyboard.css';
import KeyBoard from "../assets/keyboard-pic.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

const ComputerKeyboard = () => (

  <div className="main-wrapper">
    <FontAwesomeIcon icon={faClose} className="close"/>
    <div className="description">
    <img src={KeyBoard} alt="" className="item-img"/>
      <h4>Keyboard</h4>
    </div>
    <div className="price-wrapper">
      <h3>25.99</h3>
    </div>
  </div>
)

export default ComputerKeyboard;