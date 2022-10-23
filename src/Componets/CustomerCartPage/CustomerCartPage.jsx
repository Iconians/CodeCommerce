import React from "react";
import "./CustomerCartPage.css";
import MousePic from "../assets/mouse-pic.png";
import KeyBoard from "../assets/keyboard-pic.png";
import Headphones from "../assets/headphones-pic.png";
import MassageBox from "../MessageBox/MessageBox";
import SummaryComponent from "../SummaryComponent/SummaryComponent";
import Cart from "../Cart/cart";
import ShippingComponent from "../ShippingComponent/ShippingComponent";
import { onlyNumberValidation } from "../validations";

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
      subTotal: 0,
      total: 0,
      discounts: 0,
      shipping: 0,
      cartPageError: false,
      shippingPageError: {},
      disableBtn: false,
      cartIndex: 1,
      standardShipping: 0,
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
    this.setState({ shipping: 5 });
    this.updateTotal(subTotal, 5);
  };

  standardShipping = () => {
    const { subTotal } = this.state;
    if (subTotal >= 40) {
      this.setState({ shipping: 0 });
      this.updateTotal(subTotal, 0);
    } else if (subTotal < 40) {
      this.setState({ shipping: 10 });
      this.updateTotal(subTotal, 10);
    }
  };

  checkErrors = () => {
    const { shippingData, shippingPageError } = this.state;
    let errorValue = {};
    let isError = false;
    Object.keys(shippingData).forEach((val) => {
      if (!shippingData[val].length) {
        errorValue = { ...errorValue, [`${val}Error`]: "Required" };
        isError = true;
      }
    });
    Object.keys(shippingPageError).forEach((val) => {
      if (shippingPageError[val].length) {
        errorValue = { ...errorValue, [`${val}Error`]: "Required" };
        isError = true;
      }
    });
    this.setState({ shippingPageError: errorValue });
    console.log(isError);

    return isError;
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
      default:
        break;
    }
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.handleValidations(name, value);
    this.setState((prevState) => ({
      shippingData: {
        ...prevState.shippingData,
        [name]: value,
      },
    }));
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
    } = this.state;

    return (
      <div className="parent-div">
        <MassageBox reset={this.resetcomponet} index={cartIndex} />
        {cartIndex === 0 ? (
          <Cart
            index={cartIndex}
            cartDataArr={cartData}
            updateQuantity={this.updateQuantity}
          />
        ) : (
          <ShippingComponent
            index={this.backPage}
            handleInputChange={this.handleInputChange}
            standardShipping={this.standardShipping}
            expressShipping={this.expressShipping}
            errorMsg={shippingPageError}
          />
        )}
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
        />
      </div>
    );
  }
}

export default CustomerCartPage;
