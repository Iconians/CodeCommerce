import React from "react";
import "./CustomerCartPage.css";
import "./CustomerCartPageResponsive.css";
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
    key: "6",
  },
  {
    name: "keyboard",
    value: 1,
    img: KeyBoard,
    id: 2,
    price: 26.99,
    totalPrice: 0.0,
    key: "5",
  },
  {
    name: "headphones",
    value: 1,
    img: Headphones,
    id: 3,
    price: 36.99,
    totalPrice: 0.0,
    key: "4",
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
          key: "4",
        },
        {
          name: "keyboard",
          value: 1,
          img: KeyBoard,
          id: 2,
          price: 26.99,
          totalPrice: 0.0,
          key: "5",
        },
        {
          name: "headphones",
          value: 1,
          img: Headphones,
          id: 3,
          price: 36.99,
          totalPrice: 0.0,
          key: "6",
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
      discountCodes: {
        fiveoff: 5,
        twentyoff: 20,
        fiftyoff: 50,
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
      cartIndex: 0,
      standardShipping: 0,
      cardType: "",
      maxLength: OTHERCARDS.length,
    };
  }

  disableBtn = (array) => {
    const { cartIndex } = this.state;
    console.log(array);
    if (array.length === 0) {
      this.setState({ disableBtn: true });
    } else if (cartIndex === 2 && array.length === 5) {
      this.setState({ disableBtn: false });
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

  paymentFieldsFilledOut = () => {
    const { paymentData } = this.state;
    let array = [];
    Object.values(paymentData).forEach((val) => {
      if (val === "") {
        return false;
      } else {
        array.push(1);
      }
    });
    if (array.length === 0 || array.length === 5) {
      this.disableBtn(array);
    }
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
    this.updateTotal(sum, 0, 0);
  };

  applydiscount = (code) => {
    let codeValue = 0;
    const { discountCodes, subTotal } = this.state;
    Object.keys(discountCodes).forEach((val) => {
      if (val === code) {
        this.setState({ discounts: discountCodes[val] });
        codeValue = discountCodes[val];
      }
      console.log(codeValue);
    });
    this.updateTotal(subTotal, 0, codeValue);
  };

  updateTotal = (subtotal, price, codeValue) => {
    const { discounts } = this.state;
    let sum = 0;
    if (codeValue === 0) {
      let interger1 = Math.max(subtotal - discounts);
      let total = Math.max(interger1 + price);
      sum = total;
    } else {
      let interger1 = Math.max(subtotal - codeValue);
      let total = Math.max(interger1 + price);
      sum = total;
    }
    this.setState({
      total: sum.toFixed(2),
    });
  };

  checkErrors = () => {
    const {
      cartIndex,
      shippingData,
      shippingPageError,
      paymentPageError,
      paymentData,
      shipping,
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
      if (!shipping.shippingTitle.length) {
        errorValue = { ...errorValue, shippingOptionError: "Required" };
        isError = true;
      }
      this.setState({ shippingPageError: errorValue });
    } else if (cartIndex === 2) {
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
    const { cartIndex } = this.state;
    if (cartIndex === 1) {
      const shippingValidations = {
        addressTitle: (value) => onlyTextValidation(value),
        name: (value) => onlyTextValidation(value),
        address: () => "",
        zip: (value) => onlyNumberValidation(value),
        country: () => "",
        city: () => "",
        state: () => "",
        cellAreaCode: (value) => onlyNumberValidation(value),
        cellNum: (value) => onlyNumberValidation(value),
        phoneAreaCode: (value) => onlyNumberValidation(value),
        phoneNum: (value) => onlyNumberValidation(value),
        shippingOption: () => "",
      };

      let shippingErrortext = shippingValidations[name](value);
      this.setState((prevState) => ({
        shippingPageError: {
          ...prevState.shippingPageError,
          [`${name}Error`]: shippingErrortext,
        },
      }));
    } else {
      const paymentValidations = {
        cardName: (value) => onlyTextValidation(value),
        cardNumber: (value) => cardNumberValidation(value),
        cardMonth: () => "",
        cardYear: () => "",
        cardCvv: (value) =>
          securityCodeValidation(3, value) || onlyNumberValidation(value),
      };

      if (name === "cardNumber") {
        const card = this.findDebitCardType(value);
        const length = this.cardLength(card);
        this.setState({
          cardType: card,
          maxLength: length,
        });
      }
      let paymentErrortext = paymentValidations[name](value);
      this.paymentFieldsFilledOut();
      this.setState((prevState) => ({
        paymentPageError: {
          ...prevState.paymentPageError,
          [`${name}Error`]: paymentErrortext,
        },
      }));
    }
  };

  expressShipping = ({ target: { name } }) => {
    const { subTotal } = this.state;
    this.handleValidations(name);
    this.setState({
      shipping: {
        shippingCost: 5,
        shippingTitle: "Express",
        shippingDescription: "Delivery in 1-3 Business Days",
      },
    });
    this.updateTotal(subTotal, 5, 0);
  };

  standardShipping = ({ target: { name } }) => {
    const { subTotal } = this.state;
    this.handleValidations(name);
    if (subTotal >= 40) {
      this.setState({
        shipping: {
          shippingCost: 0,
          shippingTitle: "Standard",
          shippingDescription: "Delivery in 4-6 Business Days",
        },
      });
      this.updateTotal(subTotal, 0, 0);
    } else if (subTotal < 40) {
      this.setState({
        shipping: {
          shippingCost: 10,
          shippingTitle: "Standard",
          shippingDescription: "Delivery in 4-6 Business Days",
        },
      });
      this.updateTotal(subTotal, 10, 0);
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
    if (cartIndex === 0) {
      if (total === 0) {
        this.setState({ cartPageError: true });
      } else {
        this.setState({ cartIndex: +1 });
      }
    } else if (cartIndex === 1) {
      if (!checkErrors) {
        this.setState({ cartIndex: 2 });
        this.paymentFieldsFilledOut();
      }
    } else if (cartIndex === 2) {
      if (!checkErrors) {
        this.setState({
          cartIndex: 3,
        });
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
    } else if (cartIndex === 2) {
      this.setState({
        cartIndex: 1,
        disableBtn: false,
      });
    } else {
      this.setState({
        cartIndex: 0,
        cartData: INIT_CARTDATA,
        subTotal: 0,
        total: 0,
        discounts: 0,
        cardType: "",
        shipping: {
          shippingCost: 0,
          shippingTitle: "",
          ShippingDescription: "",
        },
        paymentData: {
          cardName: "",
          cardNumber: "",
          cardMonth: "",
          cardYear: "",
          cardCvv: "",
        },
      });
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
            disableBtn={disableBtn}
            filledOut={this.paymentFieldsFilledOut}
          />
        ) : null}
        {cartIndex === 3 ? (
          <ConfirmationComponent index={this.backPage} />
        ) : null}
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
          discountCode={this.applydiscount}
        />
      </div>
    );
  }
}

export default CustomerCartPage;
