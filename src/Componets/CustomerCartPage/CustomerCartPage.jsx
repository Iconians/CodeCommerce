import React from "react";
import "./CustomerCartPage.css";
import MousePic from "../assets/mouse-pic.png";
import KeyBoard from "../assets/keyboard-pic.png";
import Headphones from "../assets/headphones-pic.png";
import MassageBox from "../MessageBox/MessageBox";
import SummaryComponent from "../SummaryComponent/SummaryComponent";
import Cart from "../Cart/cart";
import ShippingComponent from "../ShippingComponent/ShippingComponent";
import {
  onlyNumberValidation,
  onlyTextValidation,
  cardNumberValidation,
  securityCodeValidation,
} from "../validations";
import { AMERICANEXPRESS, OTHERCARDS } from "../constants";
import PaymentComponent from "../PaymentComponent/PaymentComponent";
import ConfirmationComponent from "../ConfirmationComponent/ConfirmationComponent";

const INIT_CARTDATA = [
  {
    name: "mouse",
    value: 1,
    img: MousePic,
    id: 1,
    price: 59.99,
    totalPrice: 0.0,
  },
  {
    name: "keyboard",
    value: 1,
    img: KeyBoard,
    id: 2,
    price: 26.99,
    totalPrice: 0.0,
  },
  {
    name: "headphones",
    value: 1,
    img: Headphones,
    id: 3,
    price: 36.99,
    totalPrice: 0.0,
  },
];

class CustomerCartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartData: [
        {
          name: "mouse",
          value: 1,
          img: MousePic,
          id: 1,
          price: 59.99,
          totalPrice: 0.0,
        },
        {
          name: "keyboard",
          value: 1,
          img: KeyBoard,
          id: 2,
          price: 26.99,
          totalPrice: 0.0,
        },
        {
          name: "headphones",
          value: 1,
          img: Headphones,
          id: 3,
          price: 36.99,
          totalPrice: 0.0,
        },
      ],
      shippingData: {
        addressTitle: "",
        name: "",
        address: "",
        zip: "",
        country: "",
        city: "",
        state: "",
        cellAreaCode: "",
        cellNum: "",
        phoneAreaCode: "",
        phoneNum: "",
      },
      paymentData: {
        cardName: "",
        cardNumber: "",
        cardMonth: "",
        cardYear: "",
        cardCvv: "",
      },
      subTotal: 0,
      total: 0,
      discounts: 0,
      shipping: {
        shippingCost: 0,
        shippingTitle: "",
        ShippingDescription: "",
      },
      cartPageError: false,
      shippingPageError: {},
      paymentPageError: {},
      disableBtn: false,
      cartIndex: 3,
      standardShipping: 0,
      cardType: "",
      maxLength: OTHERCARDS.length,
    };
  }

  disableBtn = (array) => {
    if (array.length === 0) {
      this.setState({ disableBtn: true });
    }
  };

  updateQuantity = ({ target: { name, value } }) => {
    const { cartData } = this.state;
    let setValue = cartData.map((item) => {
      if (name === item.name) {
        return {
          ...item,
          value: parseInt(value),
          totalPrice: (+value * item.price).toFixed(2),
        };
      }
      return item;
    });
    this.calculateTotal(setValue);
    this.setState({
      cartData: setValue,
    });
    this.removeItem(setValue);
  };

  removeItem = (array) => {
    let newCartList = array.filter((item) => {
      return item.value !== 0;
    });
    this.setState({
      cartData: newCartList,
    });
    this.disableBtn(newCartList);
  };

  calculateTotal = (itemPrice) => {
    let array = [];
    itemPrice.map((item) => array.push(item.totalPrice));
    const sum = array.reduce((accumulator, value) => {
      return accumulator + Number(value);
    }, 0);
    this.setState({
      subTotal: sum.toFixed(2),
      total: sum.toFixed(2),
    });
  };

  updateTotal = (subtotal, price) => {
    const { discounts } = this.state;
    let interger1 = Math.max(subtotal - discounts);
    let sum = Math.max(interger1 + price);

    this.setState({
      total: sum.toFixed(2),
    });
  };

  expressShipping = () => {
    const { subTotal } = this.state;
    this.setState({
      shipping: {
        shippingCost: 5,
        shippingTitle: "Express",
        shippingDescription: "Delivery in 1-3 Business Days",
      },
    });
    this.updateTotal(subTotal, 5);
  };

  standardShipping = () => {
    const { subTotal } = this.state;
    if (subTotal >= 40) {
      this.setState({
        shipping: {
          shippingCost: 0,
          shippingTitle: "Standard",
          shippingDescription: "Delivery in 4-6 Business Days",
        },
      });
      this.updateTotal(subTotal, 0);
    } else if (subTotal < 40) {
      this.setState({
        shipping: {
          shippingCost: 10,
          shippingTitle: "Standard",
          shippingDescription: "Delivery in 4-6 Business Days",
        },
      });
      this.updateTotal(subTotal, 10);
    }
  };

  checkErrors = () => {
    const {
      cartIndex,
      shippingData,
      shippingPageError,
      paymentPageError,
      paymentData,
    } = this.state;
    let errorValue = {};
    let isError = false;
    if (cartIndex === 1) {
      Object.keys(shippingData).forEach((val) => {
        if (!shippingData[val].length) {
          errorValue = { ...errorValue, [`${val}Error`]: "Required" };
          isError = true;
        }
      });
      Object.keys(shippingPageError).forEach((val) => {
        if (shippingPageError[val].length) {
          errorValue = { ...errorValue, [`${val}`]: "Required" };
          isError = true;
        }
      });
      this.setState({ shippingPageError: errorValue });
    } else {
      Object.keys(paymentData).forEach((val) => {
        if (!paymentData[val].length) {
          errorValue = { ...errorValue, [`${val}Error`]: "Required" };
          isError = true;
        }
      });
      Object.keys(paymentPageError).forEach((val) => {
        if (paymentPageError[val].length) {
          errorValue = { ...errorValue, [`${val}`]: "Required" };
          isError = true;
        }
      });
      this.setState({ paymentPageError: errorValue });
    }

    return isError;
  };

  findDebitCardType = (cardNumber) => {
    const regexPattern = {
      MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
      VISA: /^4[0-9]{2,}$/,
      AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
      DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
    };
    for (const card in regexPattern) {
      if (cardNumber.replace(/[^\d]/g, "").match(regexPattern[card]))
        return card;
    }
    return "";
  };

  cardLength = (cardType) => {
    if (cardType === "AMERICAN_EXPRESS") {
      return AMERICANEXPRESS.length;
    } else {
      return OTHERCARDS.length;
    }
  };

  handleValidations = (name, value) => {
    let errortext;
    switch (name) {
      case "addressTitle":
        errortext = "";
        this.setState((prevState) => ({
          shippingPageError: {
            ...prevState.shippingPageError,
            addressTitleError: errortext,
          },
        }));
        break;
      case "name":
        errortext = "";
        this.setState((prevState) => ({
          shippingPageError: {
            ...prevState.shippingPageError,
            nameError: errortext,
          },
        }));
        break;
      case "address":
        errortext = "";
        this.setState((prevState) => ({
          shippingPageError: {
            ...prevState.shippingPageError,
            addressError: errortext,
          },
        }));
        break;
      case "zip":
        errortext = onlyNumberValidation(value);
        this.setState((prevState) => ({
          shippingPageError: {
            ...prevState.shippingPageError,
            zipError: errortext,
          },
        }));
        break;
      case "country":
        errortext = "";
        this.setState((prevState) => ({
          shippingPageError: {
            ...prevState.shippingPageError,
            countryError: errortext,
          },
        }));
        break;
      case "city":
        errortext = "";
        this.setState((prevState) => ({
          shippingPageError: {
            ...prevState.shippingPageError,
            cityError: errortext,
          },
        }));
        break;
      case "state":
        errortext = "";
        this.setState((prevState) => ({
          shippingPageError: {
            ...prevState.shippingPageError,
            stateError: errortext,
          },
        }));
        break;
      case "cellAreaCode":
        errortext = onlyNumberValidation(value);
        this.setState((prevState) => ({
          shippingPageError: {
            ...prevState.shippingPageError,
            cellAreaCodeError: errortext,
          },
        }));
        break;
      case "cellNum":
        errortext = onlyNumberValidation(value);
        this.setState((prevState) => ({
          shippingPageError: {
            ...prevState.shippingPageError,
            cellNumError: errortext,
          },
        }));
        break;
      case "phoneAreaCode":
        errortext = onlyNumberValidation(value);
        this.setState((prevState) => ({
          shippingPageError: {
            ...prevState.shippingPageError,
            phoneAreaCodeError: errortext,
          },
        }));
        break;
      case "phoneNum":
        errortext = onlyNumberValidation(value);
        this.setState((prevState) => ({
          shippingPageError: {
            ...prevState.shippingPageError,
            phoneNumError: errortext,
          },
        }));
        break;
      case "cardName":
        errortext = onlyTextValidation(value);
        this.setState((prevState) => ({
          paymentPageError: {
            ...prevState.paymentPageError,
            cardNameError: errortext,
          },
        }));
        break;
      case "cardNumber":
        errortext = cardNumberValidation(value);
        const card = this.findDebitCardType(value);
        const length = this.cardLength(card);
        this.setState((prevState) => ({
          cardType: card,
          maxLength: length,
          paymentPageError: {
            ...prevState.paymentPageError,
            cardNumberError: errortext,
          },
        }));
        break;
      case "cardMonth":
        errortext = "";
        this.setState((prevState) => ({
          paymentPageError: {
            ...prevState.paymentPageError,
            cardMonthError: errortext,
          },
        }));
        break;
      case "cardYear":
        errortext = "";
        this.setState((prevState) => ({
          paymentPageError: {
            ...prevState.paymentPageError,
            cardYearError: errortext,
          },
        }));
        break;
      case "cardCvv":
        errortext = securityCodeValidation(3, value);
        this.setState((prevState) => ({
          paymentPageError: {
            ...prevState.paymentPageError,
            cardCvvError: errortext,
          },
        }));
        break;
      default:
        break;
    }
  };

  handleInputChange = ({ target: { name, value } }) => {
    const { cartIndex } = this.state;
    this.handleValidations(name, value);
    if (cartIndex === 1) {
      this.setState((prevState) => ({
        shippingData: {
          ...prevState.shippingData,
          [name]: value,
        },
      }));
    } else if (name === "cardNumber") {
      let mask = value.split(" ").join("");
      if (mask.length) {
        mask = mask.match(new RegExp(".{1,4}", "g")).join(" ");
        this.setState((prevState) => ({
          paymentData: {
            ...prevState.paymentData,
            [name]: mask,
          },
        }));
      } else {
        this.setState((prevState) => ({
          paymentData: {
            ...prevState.paymentData,
            [name]: "",
          },
        }));
      }
    } else {
      this.setState((prevState) => ({
        paymentData: {
          ...prevState.paymentData,
          [name]: value,
        },
      }));
    }
  };

  nextPage = () => {
    const { cartIndex, total } = this.state;
    const checkErrors = this.checkErrors();
    console.log("hi");
    if (cartIndex === 0) {
      if (total === 0) {
        this.setState({ cartPageError: true });
      } else {
        this.setState({ cartIndex: +1 });
      }
    } else if (cartIndex === 1) {
      if (!checkErrors) {
        this.setState({ cartIndex: 2 });
      }
    } else if (cartIndex === 2) {
      if (!checkErrors) {
        this.setState({ cartIndex: 3 });
      }
    }
  };

  resetcomponet = () => {
    this.setState({
      cartData: INIT_CARTDATA,
      subTotal: 0,
      total: 0,
    });
  };

  backPage = () => {
    const { cartIndex } = this.state;
    if (cartIndex === 1) {
      this.setState({ cartIndex: 0 });
    }
  };

  render() {
    const {
      cartData,
      error,
      cartIndex,
      total,
      discounts,
      shipping,
      subTotal,
      disableBtn,
      shippingPageError,
      shippingData,
      paymentPageError,
      cardType,
      maxLength,
      paymentData,
    } = this.state;

    return (
      <div
        className={cartIndex === 3 ? "confirmation-parent-div" : "parent-div"}
      >
        <MassageBox reset={this.resetcomponet} index={cartIndex} />
        {cartIndex === 0 ? (
          <Cart
            index={cartIndex}
            cartDataArr={cartData}
            updateQuantity={this.updateQuantity}
          />
        ) : null}
        {cartIndex === 1 ? (
          <ShippingComponent
            index={this.backPage}
            handleInputChange={this.handleInputChange}
            standardShipping={this.standardShipping}
            expressShipping={this.expressShipping}
            errorMsg={shippingPageError}
          />
        ) : null}
        {cartIndex === 2 ? (
          <PaymentComponent
            total={total}
            errorMsg={paymentPageError}
            handleInputChange={this.handleInputChange}
            index={this.backPage}
            cardType={cardType}
            maxLength={maxLength}
            paymentData={paymentData}
            nextPage={this.nextPage}
          />
        ) : null}
        {cartIndex === 3 ? <ConfirmationComponent /> : null}
        <SummaryComponent
          index={cartIndex}
          error={error}
          total={total}
          next={this.nextPage}
          discounts={discounts}
          shipping={shipping}
          subTotal={subTotal}
          disableBtn={disableBtn}
          cartData={cartData}
          shippingData={shippingData}
          cardType={cardType}
          cardNumber={paymentData}
        />
      </div>
    );
  }
}

export default CustomerCartPage;
