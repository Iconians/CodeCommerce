import React from "react";
import InputBase from "../InputBase/InputBsae";
import SubmitButtons from "../SubmitButtons/SubmitButtons";
import './CreateAccForm.css'

class CreateAccForm extends React.Component {
  
  render() {

   const inputData = [
    {label: 'Your Email Address *', class: 'email-input inputs', type: 'email', name: 'email', },
    {label: 'Create Password *', 
     label2: 'Password must be 8-20 characters, including at least one capital letter, at one small letter, one number and one special character -!@#$%^&*()_+',
     class: 'password-input-1 inputs', 
     type: 'password', 
     name: 'password' 
    },
    {label: 'Confirm Password *', class: 'password-input-2 inputs', type: 'password', name: 'confimPassword' },
    {label: 'First Name *', class: 'first-name-input inputs', type: 'text', name: 'firstName' },
    {label: 'Surname *', class: 'surname-input inputs', type: 'text', name: 'surname' },
    {label: 'Postcode', class: 'postcode-input inputs', type: 'number', name: 'postcode' },
   ]

    return(
      <div>
        <form>
          {inputData.length ? inputData.map((item) => (
           <div className="form-div">
             <label htmlFor={item.name} className='input-label'>{item.label} {item.error}</label>                      
              <InputBase
              className={item.class} 
              type={item.type}
              name={item.name}             
              />
              {item.label2 ? <p className="para-tag">{item.label2}</p> : null}
            </div>
          )): null}
          <SubmitButtons />
        </form>
      </div>
    )
  }
}

export default CreateAccForm;