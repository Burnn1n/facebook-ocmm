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
              <div className="flex text-center items-center">
                <img
                  src="https://www.nicepng.com/png/full/177-1772556_logo-no-background-grey-large-cool-logos-with.png"
                  alt=""
                  className="w-7 h-7 object-cover"
                />
                <span className="font-bold text-2xl text-blue-600">Sparta</span>
              </div>
            </Link>
          </div>
          <div className="flex">
            <Link to="/tulbur">
              <div className="hover:bg-blue-100 py-2 px-5 rounded-lg">
                Төлбөрийн нөхцөл
              </div>
            </Link>
            <Link to="/login">
              <div className="hover:bg-blue-100 py-2 px-5 rounded-lg text-blue-600">
                Нэвтрэх
              </div>
            </Link>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
