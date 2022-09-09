import React from "react";
import './SubmitButtons.css'
import InputBase from "../InputBase/InputBsae";

const SubmitButtons = () => (
  <div>
    <div>
      <InputBase
      type='submit'
      value='Save and Sign In'
      className='btn-inputs save-btn' 
      />
    </div> 
    <div className="strikeDiv">
      <span>or</span>
    </div> 
    <div>
      <InputBase
      type='submit' 
      value='Sign in with Facebook'
      className='btn-inputs facebook-btn' 
      />
    </div>
    <div className="terms-div">
      <div className="cancel-div"><a href="/">Cancel</a></div>
      <div className="terms-privacy-div">
        <a href="/">Privacy Policy and Cookies</a>
        <span className="span-pipe">|</span>
        <a href="/">Terms of Sales and Use</a>
      </div>
    </div>
  </div>
)

export default SubmitButtons;