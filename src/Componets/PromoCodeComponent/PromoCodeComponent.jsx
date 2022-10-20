import React from "react";
import InputBase from "../InputBase/InputBase";

const PromoCodeComponent = () => {


  return (

    <div className="promo-code-div">
      <p>Do you have a promo code?</p>
      <div className="code-inputs-wrapper">
        <InputBase className="code-input" placeholder="code" />
        <InputBase className="code-input-btn" type="button" value="APPLY" />
    </div>
  </div>
  )
}

export default PromoCodeComponent