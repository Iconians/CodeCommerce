import React from 'react';
import InputBase from '../InputBase/InputBsae';
import { emailValidation, 
  passwordValidation, 
  onlyTextValidation, 
  onlyNumberValidation 
} from '../validations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import './SigninPage.css'

const INIT_FORM = {
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  surName: '',
  postal: '',
};

class SingninPage extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = { 
     signIn: false,
     createAcc: true,
     active: 'active',
     inactive: 'inactive',
     formData: INIT_FORM,
     error: {},
     accounts: {}
    } 
  };

 

  confirmPasswordValidation = (value) => {
    const password = this.state.formData.password
    if (value) {
      if (value === `${password}`) {
        return '';
      }else {
         return 'passwords don\'t match'
      }
    } else {
      return undefined
    } 
  } 

  handleValidations = (name , value) => {
    let errortext;
    switch(name) {
      case 'email':
        errortext = emailValidation(value);
        this.setState((prevState) => ({error: { ...prevState.error, emailError: errortext}}));
        break;
      case 'password':
        errortext = passwordValidation(value);
        this.setState((prevState) => ({ error: {...prevState.error, passwordError: errortext}}));
        break;
      case 'confirmPassword':
        errortext = this.confirmPasswordValidation(value);
        this.setState((prevState) => ({error: {...prevState.error, confirmPasswordError: errortext}}));
        break
      case 'firstName':
        errortext = onlyTextValidation(value);
        this.setState((prevState) => ({error: {...prevState.error, firstNameError: errortext}}));
        break
      case 'surName':
        errortext = onlyTextValidation(value);
        this.setState((prevState) => ({error: {...prevState.error, surNameError: errortext}}));
        break
      case 'postal':
        errortext = onlyNumberValidation(value)
        this.setState((prevState) => ({error: {...prevState.error, postalError: errortext}}));
        break  
      default:
      break 
    }
  }

  handleBlur = ({ target: { name, value }}) => this.handleValidations(name, value);

  handleEye = () => {
    const input = document.getElementById('password-eye')
    if (input.type === 'password') {
      input.type = 'text'
    }
    else {
      input.type = 'password'
    }
  }
  
  switchForm = (e) => {
    const signIn = e.target.value
    if (signIn === 'true') {
     this.setState({
      signIn: true,
      createAcc: false,
      active: 'active',
      inactive: 'inactive'
     })
    }
    else {
      this.setState({
        signIn: false,
        createAcc: true,
        active: 'inactive',
        inactive: 'active'
       })
    } 
  };

  checkErrorBeforeSave = () => {
    console.log('hello');
    const { formData, error } = this.state
    let errorValue = {};
    let isError = false;
   Object.keys(formData).forEach((val) => {
    console.log(error)
    if (!formData[val].length){
      errorValue = { ...errorValue, [`${val}Error`]: 'Required'};
      isError = true;
    }
    else {
      isError = false
    }
   });
   Object.keys(error).forEach((val) => {
    if (error[val].length) {
      errorValue = { ...errorValue, [`${val}Error`]: 'Required'};
      isError = true;
    }
   })
   this.setState({ error: errorValue });
   console.log(isError)
   return isError
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const checkErrors = this.checkErrorBeforeSave();
    if (!checkErrors) {
      this.setState({
        formData: INIT_FORM,
      })    
    }
  }

  handleInputChange = ({target: {name, value}}) => {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value
      }
    }));
  };
    
  render() {

    const inputData = [
      {label: 'Your Email Address *', class: 'email-input inputs', type: 'text', name: 'email', error: 'emailError' },
      {label: 'Create Password *', 
       label2: 'Password must be 8-20 characters, including at least one capital letter, at one small letter, one number and one special character -!@#$%^&*()_+',
       class: 'password-input-1 inputs', 
       type: 'password', 
       name: 'password',
       id: 'password-eye',
       error: 'passwordError',
      },
      {label: 'Confirm Password *', class: 'password-input-2 inputs', type: 'password', name: 'confirmPassword', error: 'confirmPasswordError' },
      {label: 'First Name *', class: 'first-name-input inputs', type: 'text', name: 'firstName', error: 'firstNameError' },
      {label: 'Surname *', class: 'surname-input inputs', type: 'text', name: 'surName', error: 'surNameError' },
      {label: 'Postcode', class: 'postcode-input inputs', type: 'text', name: 'postal', error: 'postalError'},
    ]; 

    const signIninputData = [
      {label: 'Your Email Address *', name: 'email', type: 'text', class: 'inputs', error: 'emailError'},
      {label: 'Enter Your Password *', name: 'password', type: 'password', class: 'inputs', id: 'password-eye', error: 'passwordError'},
    ];

    const createAccFormButtons = [
      {type: 'submit', value: 'SAVE', class: 'btn-inputs save-btn'},
      {type: 'button', value: 'SIGN UP WITH FACEBOOK', class: 'btn-inputs facebook-btn'}
    ];

    const signInFormsButtons = [
      {type: 'submit', value: 'SIGN IN', class: 'btn-inputs save-btn'},
      {type: 'button', value: 'SIGN IN WITH FACEBOOK', class: 'btn-inputs facebook-btn'}
    ];
     
    return (

      <div className="page-header">
        <div className="radio-buttons-div">         
          <label htmlFor="signin" className={this.state.inactive}>
          <input onChange={this.switchForm} value="true" checked={this.state.signIn === true && this.state.createAcc === false} type="radio" name="formChoice" id="signIn" /> 
            SIGN IN
          </label>          
          <label htmlFor="create-account" className={this.state.active}>
          <input onChange={this.switchForm} value="false" checked={this.state.createAcc === true && this.state.signIn === false} type="radio" name="formChoice" id="createAccount" /> 
            CREATE ACCOUNT
          </label> 
        </div>
        <div id="signinForm" className="signin-form-div">
          <form onSubmit={this.handleSubmit}>
            {this.state.signIn ? 
              signIninputData.map((item) => (
                <label className="form-label" htmlFor={item.name}>
                <div className='grid-div'>
                  {item.label}
                  {
                    (this.state.error
                      && this.state.error[item.error]
                      && this.state.error[item.error].length > 1)
                    ? <div className='error'>{this.state.error[item.error]}</div> 
                    : null 
                  } 
                </div>   
                <InputBase 
                type={item.type}
                name={item.name}
                onBlur={this.handleBlur}
                onChange={this.handleInputChange}
                className={item.class}
                id={item.id}
                autoComplete='off'
                />
                {item.name === 'password' ? <FontAwesomeIcon icon={faEye} className="eye-icon" onClick={this.handleEye} /> : null}              
                </label>
              )) 
              : 
              inputData.map((item) => (
                <label htmlFor={item.name} className='form-label'> 
                <div className='grid-div'>
                  {item.label}
                  {
                    (this.state.error
                      && this.state.error[item.error]
                      && this.state.error[item.error].length > 1)
                    ? <div className='error'>{this.state.error[item.error]}</div> 
                    : null 
                  } 
                </div>         
                  <InputBase
                  className={item.class} 
                  type={item.type}
                  name={item.name}
                  onBlur={this.handleBlur}
                  onChange={this.handleInputChange}
                  id={item.id}
                  autoComplete='off'
                  />
                  {item.name === 'password' ? <FontAwesomeIcon icon={faEye} className="eye-icon" onClick={this.handleEye} /> : null}     
                  {item.label2 ? <p className="para-tag">{item.label2}</p> : null}
                </label>          
            ))} 
            {this.state.signIn ? signInFormsButtons.map((item) => (
              <div className='submit-div'>
                <InputBase 
                  type={item.type}
                  value={item.value}
                  className={item.class}
                />
                { item.class === 'btn-inputs save-btn' ?
                  <div className="strikeDiv">
                    <span>or</span>
                  </div>
                  : null
                } 
              </div>
              ))
              : 
              createAccFormButtons.map((item) => (
                <div className='submit-div'>
                  <InputBase 
                  type={item.type}
                  value={item.value}
                  className={item.class}
                  />
                  { item.class === 'btn-inputs save-btn' ?
                    <div className="strikeDiv">
                      <span>or</span>
                    </div>
                    : null
                  } 
                </div>
            ))}
            <div className="terms-div">
              <div className="cancel-div"><a href="/">Cancel</a></div>
              <div className="terms-privacy-div">
                <a href="/">Privacy Policy and Cookies</a>
                <span className="span-pipe">|</span>
                <a href="/">Terms of Sales and Use</a>
              </div>
            </div>
          </form>
        </div>
      </div>  
    )     
  }
}

export default SingninPage;
