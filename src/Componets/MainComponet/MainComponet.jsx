import React from "react";
import SigninPage from "../signinPage/SigninPage";
import CustomerCartPage from "../CustomerCartPage/CustomerCartPage";

class MainComponet extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 1,
    };
  }

  handleRoutes = (data) => {
    this.setState({
      index: data,
    });
  };

  render() {
    const { index } = this.state;
    return (
      <div>
        {index === 0 && <SigninPage next={this.handleRoutes} />}
        {index === 1 && <CustomerCartPage next={this.handleRoutes} />}
      </div>
    );
  }
}

export default MainComponet;
