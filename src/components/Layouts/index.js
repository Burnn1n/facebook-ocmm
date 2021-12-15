import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// Layout Related Components
import Header from "./Header";
import Footer from "./Footer";
class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <div id="layout-wrapper">
          {/*
          dynamic header
          */}
          <div className="z-20">
            <Header />
          </div>

          <div
            className={`pt-12 mx-auto px-5 ${
              window.location.pathname === "/admin" ? "pb-16" : ""
            }`}
            style={{ maxWidth: "1336px" }}
          >
            {this.props.children}
          </div>
          <div
            className={`z-50 ${
              window.location.pathname === "/admin" ? "hidden" : ""
            }`}
          >
            <Footer />
          </div>
        </div>
        {/* <Rightbar /> */}
      </React.Fragment>
    );
  }
}

export default withRouter(Layout);
