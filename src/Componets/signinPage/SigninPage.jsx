import React from "react";
import InputBase from "../InputBase/InputBase";
import {
  emailValidation,
  passwordValidation,
  onlyTextValidation,
  onlyNumberValidation,
} from "../validations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import "./SigninPage.css";

const INIT_FORM = {
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  surName: "",
  postal: "",
};

const SIGN_IN_FORM = {
  email: "",
  password: "",
};

class SingninPage extends React.Component {
  constructor() {
    super();
    this.state = {
      signIn: false,
      createAcc: true,
      formData: INIT_FORM,
      signInForm: SIGN_IN_FORM,
      error: {},
      accounts: {},
    };
  }

  confirmPasswordValidation = (value) => {
    const password = this.state.formData.password;
    if (value) {
      if (value === `${password}`) {
        return "";
      } else {
        return "passwords don't match";
      }
    } else {
      return undefined;
    }
  };

  handleValidations = (name, value) => {
    const validations = {
      email: (value) => emailValidation(value),
      password: (value) => passwordValidation(value),
      confirmPassword: (value) => this.confirmPasswordValidation(value),
      firstName: (value) => onlyTextValidation(value),
      surName: (value) => onlyTextValidation(value),
      postal: (value) => onlyNumberValidation(value),
    };

    let setValidations = validations[name](value);
    this.setState((prevState) => ({
      error: {
        ...prevState.error,
        [`${name}Error`]: setValidations,
      },
    }));
  };

  handleBlur = ({ target: { name, value } }) =>
    this.handleValidations(name, value);

  handleEye = () => {
    const input = document.getElementById("password-eye");
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  };

  switchForm = ({ target: { value } }) => {
    const signIn = value;
    if (signIn === "true") {
      this.setState({
        signIn: true,
        createAcc: false,
      });
    } else {
      this.setState({
        signIn: false,
        createAcc: true,
      });
    }
  };

  checkErrorBeforeSave = () => {
    const { formData, error, accounts } = this.state;
    let errorValue = {};
    let isError = false;
    let data = accounts;
    let keys = Object.keys(data);
    Object.keys(formData).forEach((val) => {
      if (!formData[val].length) {
        errorValue = { ...errorValue, [`${val}Error`]: "Required" };
        isError = true;
      }
    });
    Object.keys(error).forEach((val) => {
      if (error[val].length) {
        errorValue = { ...errorValue, [`${val}`]: "Required" };
        isError = true;
      }
    });
    keys.forEach((key) => {
      let values = accounts[key];
      console.log(values.email);
      if (formData.email === values.email) {
        errorValue = {
          ...errorValue,
          emailError: "There is already an account with this email",
        };
        isError = true;
      }
    });
    this.setState({ error: errorValue });
    return isError;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { formData } = this.state;
    const checkErrors = this.checkErrorBeforeSave();
    if (!checkErrors) {
      this.setState((prevState) => ({
        accounts: {
          ...prevState.accounts,
          [`${formData.firstName}account`]: formData,
        },
        formData: INIT_FORM,
      }));
    }
  };

  checkErrorsBeforeSignIn = () => {
    const { signInForm, accounts } = this.state;
    let errorValue = {};
    let isError = false;
    let data = accounts;
    let keys = Object.keys(data);
    if (keys.length) {
      keys.forEach((key) => {
        let values = accounts[key];
        if (
          signInForm.email === values.email &&
          signInForm.password === values.password
        ) {
        } else {
          errorValue = {
            ...errorValue,
            emailError: "No account with this email",
          };
          isError = true;
        }
      });
    } else {
      errorValue = { ...errorValue, emailError: "No account with this email" };
      isError = true;
    }
    this.setState({ error: errorValue });
    return isError;
  };

  handleSignIn = (e) => {
    e.preventDefault();
    const checkErrors = this.checkErrorsBeforeSignIn();
    if (!checkErrors) {
      this.props.next(1);
    }
  };

  handleInputChange = ({ target: { name, value } }) => {
    const { signIn } = this.state;
    signIn
      ? this.setState((prevState) => ({
          signInForm: {
            ...prevState.signInForm,
            [name]: value,
          },
        }))
      : this.setState((prevState) => ({
          formData: {
            ...prevState.formData,
            [name]: value,
          },
        }));
  };

  render() {
    const { signIn, createAcc, error, signInForm, formData } = this.state;
    const inputData = [
      {
        label: "Your Email Address *",
        class: "email-input inputs",
        type: "text",
        name: "email",
        error: "emailError",
        key: "1",
      },
      {
        label: "Create Password *",
        label2:
          "Password must be 8-20 characters, including at least one capital letter, at one small letter, one number and one special character -!@#$%^&*()_+",
        class: "password-input-1 inputs",
        type: "password",
        name: "password",
        id: "password-eye",
        error: "passwordError",
        key: "2",
      },
      {
        label: "Confirm Password *",
        class: "password-input-2 inputs",
        type: "password",
        name: "confirmPassword",
        error: "confirmPasswordError",
        key: "3",
      },
      {
        label: "First Name *",
        class: "first-name-input inputs",
        type: "text",
        name: "firstName",
        error: "firstNameError",
        key: "4",
      },
      {
        label: "Surname *",
        class: "surname-input inputs",
        type: "text",
        name: "surName",
        error: "surNameError",
        key: "5",
      },
      {
        label: "Postcode",
        class: "postcode-input inputs",
        type: "text",
        name: "postal",
        error: "postalError",
        key: "6",
      },
    ];

    const signIninputData = [
      {
        label: "Your Email Address *",
        name: "email",
        type: "text",
        class: "inputs",
        error: "emailError",
        key: "7",
      },
      {
        label: "Enter Your Password *",
        name: "password",
        type: "password",
        class: "inputs",
        id: "password-eye",
        error: "passwordError",
        key: "8",
      },
    ];

    const createAccFormButtons = [
      { type: "submit", value: "SAVE", class: "btn-inputs save-btn", key: "9" },
      {
        type: "button",
        value: "SIGN UP WITH FACEBOOK",
        class: "btn-inputs facebook-btn",
        key: "10",
      },
    ];

    const signInFormsButtons = [
      {
        type: "submit",
        value: "SIGN IN",
        class: "btn-inputs save-btn",
        key: "11",
      },
      {
        type: "button",
        value: "SIGN IN WITH FACEBOOK",
        class: "btn-inputs facebook-btn",
        key: "12",
      },
    ];

    return (
      <div className="page-header">
        <div className="radio-buttons-div">
          <label
            htmlFor="signin"
            className={signIn === true ? "active" : "inactive"}
          >
            <input
              onChange={this.switchForm}
              value="true"
              checked={signIn === true && createAcc === false}
              type="radio"
              name="formChoice"
              id="signIn"
            />
            SIGN IN
          </label>
          <label
            htmlFor="create-account"
            className={createAcc === true ? "active" : "inactive"}
          >
            <input
              onChange={this.switchForm}
              value="false"
              checked={createAcc === true && signIn === false}
              type="radio"
              name="formChoice"
              id="createAccount"
            />
            CREATE ACCOUNT
          </label>
        </div>
        <div id="signinForm" className="signin-form-div">
          <form onSubmit={signIn ? this.handleSignIn : this.handleSubmit}>
            {signIn
              ? signIninputData.map((item) => (
                  <label
                    className="form-label"
                    htmlFor={item.name}
                    key={item.key}
                  >
                    <div className="grid-div">
                      {item.label}
                      {error &&
                      error[item.error] &&
                      error[item.error].length > 1 ? (
                        <div className="error">{error[item.error]}</div>
                      ) : null}
                    </div>
                    <InputBase
                      type={item.type}
                      name={item.name}
                      value={signInForm && signInForm[item.name]}
                      onBlur={this.handleBlur}
                      onChange={this.handleInputChange}
                      className={item.class}
                      id={item.id}
                      autoComplete="off"
                    />
                    {item.name === "password" ? (
                      <FontAwesomeIcon
                        icon={faEye}
                        className="eye-icon"
                        onClick={this.handleEye}
                      />
                    ) : null}
                  </label>
                ))
              : inputData.map((item) => (
                  <label
                    htmlFor={item.name}
                    className="form-label"
                    key={item.key}
                  >
                    <div className="grid-div">
                      {item.label}
                      {error &&
                      error[item.error] &&
                      error[item.error].length > 1 ? (
                        <div className="error">{error[item.error]}</div>
                      ) : null}
                    </div>
                    <InputBase
                      className={item.class}
                      type={item.type}
                      name={item.name}
                      value={formData && formData[item.name]}
                      onBlur={this.handleBlur}
                      onChange={this.handleInputChange}
                      id={item.id}
                      autoComplete="off"
                    />
                    {item.name === "password" ? (
                      <FontAwesomeIcon
                        icon={faEye}
                        className="eye-icon"
                        onClick={this.handleEye}
                      />
                    ) : null}
                    {item.label2 ? (
                      <p className="para-tag">{item.label2}</p>
                    ) : null}
                  </label>
                ))}
            {this.state.signIn
              ? signInFormsButtons.map((item) => (
                  <div className="submit-div" key={item.key}>
                    <InputBase
                      type={item.type}
                      value={item.value}
                      className={item.class}
                    />
                    {item.class === "btn-inputs save-btn" ? (
                      <div className="strikeDiv">
                        <span>or</span>
                      </div>
                    ) : null}
                  </div>
                ))
              : createAccFormButtons.map((item) => (
                  <div className="submit-div" key={item.key}>
                    <InputBase
                      type={item.type}
                      value={item.value}
                      className={item.class}
                    />
                    {item.class === "btn-inputs save-btn" ? (
                      <div className="strikeDiv">
                        <span>or</span>
                      </div>
                    ) : null}
                  </div>
                ))}
            <div className="terms-div">
              <div className="cancel-div">
                <a href="/">Cancel</a>
              </div>
              <div className="terms-privacy-div">
                <a href="/">Privacy Policy and Cookies</a>
                <span className="span-pipe">|</span>
                <a href="/">Terms of Sales and Use</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SingninPage;
