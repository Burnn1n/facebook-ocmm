import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

const Header = ({ history }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      Axios.post("http://localhost:3001/getUser", {
        id: JSON.parse(localStorage.getItem("user")).id,
      }).then((response) => {
        //console.log(response.data[0]);
        localStorage.setItem("user", JSON.stringify(response.data[0]));
      });
    }
  }, []);

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
              <div className="hover:bg-blue-100 py-3 px-5 rounded-lg h-full">
                Төлбөрийн нөхцөл
              </div>
            </Link>
            <div className={localStorage.getItem("user") ? "hidden" : ""}>
              <Link to="/login">
                <div className="hover:bg-blue-100 py-3 px-5 rounded-lg text-blue-600">
                  Нэвтрэх
                </div>
              </Link>
            </div>
            <div
              className={localStorage.getItem("user") ? "flex" : "flex hidden"}
            >
              <Link to="/profile">
                <div className="hover:bg-blue-100 py-3 px-5 rounded-lg text-blue-600 h-full">
                  {user?.firstName}
                </div>
              </Link>
              {!user?.access_token ? (
                <a
                  href={`https://localhost/projects/fbToken/obtainingAccessToken.php?userid=${user?.id}`}
                >
                  <div className="hover:bg-blue-100 py-3 px-5 rounded-lg text-blue-600 h-full">
                    Instagram холбох
                  </div>
                </a>
              ) : (
                <div className="hover:bg-blue-100 py-3 px-5 rounded-lg text-blue-600 h-full">
                  Instagram холбогдсон:{user?.instagram_name}
                </div>
              )}

              <div
                className="hover:bg-blue-100 py-3 px-5 rounded-lg text-blue-600 cursor-pointer"
                onClick={() => {
                  localStorage.removeItem("user");
                  //history?.push("/");
                  window.location.href = "/";
                }}
              >
                Гарах
              </div>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
