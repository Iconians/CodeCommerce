import React from "react";
// import './ComputerMouse.css';
import MousePic from "../assets/mouse-pic.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

const ComputerMouse = ({price}) => { 

  price('mouse',25.99, 1)
    
  


    return(
      <div className="main-wrapper">
        <FontAwesomeIcon icon={faClose} className="close"/>
        <div className="description" >
          <img src={MousePic} alt="" className="item-img" />
          <h4>Mouse</h4>
        </div>
        <div className="price-wrapper">
          <h3>55.99</h3>
        </div>
      </div>
    )

      
}


export default ComputerMouse;