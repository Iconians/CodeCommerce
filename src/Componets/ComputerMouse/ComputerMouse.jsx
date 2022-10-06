import React from "react";
// import './ComputerMouse.css';
import MousePic from "../assets/mouse-pic.png"

const ComputerMouse = () => (

  <div className="main-wrapper">
    <div className="description-wrapper">
    <img src={MousePic} alt="" className="item-img" />
      <h4>Mouse</h4>
    </div>
    <div className="price-wrapper">
      <h3>55.99</h3>
    </div>
  </div>
)

export default ComputerMouse;