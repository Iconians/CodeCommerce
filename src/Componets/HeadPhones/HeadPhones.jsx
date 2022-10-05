import React from "react";
// import './HeadPhones.css';
import Headphones from "../assets/headphones-pic.png"

const HeadPhones = () => (

  <div className="main-wrapper">
    <div className="img-wrapper">
      <img src={Headphones} alt="" className="item-img"/>
    </div>
    <div className="description-wrapper">
      <h4>HeadPhones</h4>
    </div>
    <div className="price-wrapper">
      <h3>36.99</h3>
    </div>
  </div>
)

export default HeadPhones;