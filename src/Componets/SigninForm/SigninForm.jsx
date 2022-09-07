import React from "react";
import InputBase from '../InputBase/InputBsae';
import SubmitButtons from "../SubmitButtons/SubmitButtons";
import './SigninForm.css';

class SigninForm extends React.Component {

  render() {

    const inputData = [
      {label: 'Your Email Address *', name: 'email', type: 'text', class: 'inputs'},
      {label: 'Enter Your Password *', name: 'password', type: 'password', class: 'inputs'},
    ]

    return(
      <div> 
        <form>
          {inputData.length ? inputData.map((item) => (
            <div className="form-div">
            <label htmlFor={item.name}>{item.label} </label> 
              <InputBase 
              type={item.type}
              name={item.name}
              className={item.class}
              />            
            </div>        
          )): null}

          <SubmitButtons />
          
        </form>
      </div>
    )
  }
}

export default SigninForm;