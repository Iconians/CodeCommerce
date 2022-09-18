import React from 'react';
import SigninForm from '../SigninForm/SigninForm';
import CreateAccForm from '../CreateAccForm/CreateAccForm';
import './SigninPage.css'

class SingninPage extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = { 
     signIn: false,
     createAcc: true,
     active: 'active',
     inactive: 'inactive',
  
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
  }
    
  render() {
     
    return(
      <div className="page-header">
        <div className="radio-buttons-div">         
          <label htmlFor="signin" className={this.state.active}>
          <input onChange={this.switchForm} value="true" checked={this.state.signIn === true && this.state.createAcc === false} type="radio" name="formChoice" id="signIn" /> 
            SIGN IN</label>          
          <label htmlFor="create-account" className={this.state.inactive}>
          <input onChange={this.switchForm} value="false" checked={this.state.createAcc === true && this.state.signIn === false} type="radio" name="formChoice" id="createAccount" /> 
            CREATE ACCOUNT</label> 
        </div>
        <div id="signinForm" className="signin-form-div">
          {this.state.signIn ? <SigninForm /> : <CreateAccForm />}        
        </div>
      </div>  
    )     
  }
}

export default SingninPage;
