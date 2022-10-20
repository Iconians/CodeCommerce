import React from "react";
import InputBase from "../InputBase/InputBase";

const messageBox = ({ reset, index }) => {

  if (index === 0) {
    return (
      <div className="message-box">
      <p>No messages</p>
      <InputBase className="reset-btn" onClick={reset} value="reset" type='button' />
    </div>
    ) 
  }
  else if (index === 1) {
    return 'build code'
  }
  


}

export default messageBox