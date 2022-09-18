import React from "react";
import InputBase from "../InputBase/InputBsae";
import SubmitButtons from "../SubmitButtons/SubmitButtons";
import './CreateAccForm.css'

const INIT_FORM = {
  email: '',
  password: '',
  firstName: '',
  surName: '',
  postal: ''
} 

class CreateAccForm extends React.Component {

  constructor() {
    super()
    this.state = {
     formData: INIT_FORM
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this) 
  }

  handleSubmit(e) {
    e.preventDefault()
  };

  handleInputChange({target: {name, value}}) {
    this.setState((prevState) => ({
      FormData: {
        ...prevState.FormData,
        [name]: value
      }
    }
  ))}
  
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
        <form onSubmit={this.handleSubmit}>
          {inputData.length ? inputData.map((item) => (
           <label htmlFor={item.name} className='form-label'>{item.label} {item.error}                     
              <InputBase
              className={item.class} 
              type={item.type}
              name={item.name}
              onChange={this.handleInputChange}
              value={this.state[`${item.name}`]}             
              />
              {item.label2 ? <p className="para-tag">{item.label2}</p> : null}
            </label>
          )): null}
          <SubmitButtons />
        </form>
      </div>
    )
  }
}

export default CreateAccForm;