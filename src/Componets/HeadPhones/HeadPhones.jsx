import React from "react";
// import './HeadPhones.css';
import Headphones from "../assets/headphones-pic.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

const HeadPhones = ({price}) => (

  <div className="main-wrapper">
    <FontAwesomeIcon icon={faClose} className="close"/>
    <div className="description">
    <img src={Headphones} alt="" className="item-img"/>
    <h4>HeadPhones</h4>
    </div>
    <div className="price-wrapper">
      <h3 onLoad={price('headphones', 36.99, 3)}>36.99</h3>
    </div>
  </div>
)

export default HeadPhones;