import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
const Header = ({ history }) => {
  return (
    <React.Fragment>
      <header className="fixed h-20 w-full border-b">
        <div
          className="flex justify-between mx-auto items-center h-full px-5"
          style={{ maxWidth: "1336px" }}
        >
          <div className="logo">
            <Link to="/">logo</Link>
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
