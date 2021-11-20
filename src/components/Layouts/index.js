import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// Layout Related Components
import Header from "./Header";
import Footer from "./Footer";
class Layout extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <div id="layout-wrapper">
          {/*
          dynamic header
          */}
          <Header />
          <div className="pt-20 mx-auto px-5" style={{ maxWidth: "1336px" }}>
            {this.props.children}
          </div>
          {/* <Footer /> */}
        </div>
        {/* <Rightbar /> */}
      </React.Fragment>
    );
  }
}

export default withRouter(Layout);
