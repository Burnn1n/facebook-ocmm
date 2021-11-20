import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
const Header = ({ history }) => {
  return (
    <React.Fragment>
      <header className="fixed h-12 w-full border-b z-50 bg-white">
        <div
          className="flex justify-between mx-auto items-center h-full px-5"
          style={{ maxWidth: "1336px" }}
        >
          <div className="logo">
            <Link to="/">
              <img
                src="https://www.nicepng.com/png/full/177-1772556_logo-no-background-grey-large-cool-logos-with.png"
                alt=""
                className="w-7 h-7"
              />
            </Link>
          </div>
          <div className="login">
            <Link to="/admin">admin</Link>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
