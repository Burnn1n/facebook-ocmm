import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Axios from "axios";

const Login = ({ history }) => {
  useEffect(() => {
    if (localStorage.getItem("user")) {
      history.push("/");
    }
  }, []);

  const TITLE = "Sparta || Нэвтрэх";
  const [emailInput, setEmailInput] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorEmailText, setErrorEmailText] = useState("Алдаа");

  const [passwordInput, setPasswordInput] = useState("");
  const [errorPasswordText, setErrorPasswordText] = useState("Алдаа");
  const [errorPassword, setErrorPassword] = useState(false);

  const handleSubmit = (event) => {
    var success = 0;
    if (emailInput.length < 1) {
      setErrorEmail(true);
      setErrorEmailText("Бөглөх ёстой");
    } else {
      setErrorEmail(false);
      success++;
    }

    if (passwordInput.length < 4) {
      setErrorPassword(true);
      setErrorPasswordText("4-с бага байж болохгүй");
    } else {
      setErrorPassword(false);
      success++;
    }
    if (success === 2) {
      Axios.post("http://localhost:3001/login", {
        email: emailInput,
        password: passwordInput,
      }).then((response) => {
        if (response.data.message) {
          setErrorEmail(true);
          setErrorEmailText("Имэйл хаяг эсвэл нууц үг буруу");
          setErrorPassword(true);
          setErrorPasswordText("Имэйл хаяг эсвэл нууц үг буруу");
        } else {
          setErrorEmail(false);
          setErrorPassword(false);

          localStorage.setItem("user", JSON.stringify(response.data[0]));
          console.log(response.data[0]);

          history.push("/");
        }
      });
    }

    event.preventDefault();
  };
  return (
    <React.Fragment>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <div className="mt-12 font-sans">
        <div className="my-20 text-center">
          <p className="font-bold text-4xl">Эргэн тавтай морилно уу.</p>
          <div className="flex mt-5 justify-center">
            <p className="text-xl text-gray-400">
              Та аль хэдийн хаяггүй байна уу?
            </p>
            <div className=""></div>
            <Link to="/register">
              <p className="text-xl underline text-gray-600 ml-1 ">
                Sparta-г үнэгүй туршаад үзээрэй
              </p>
            </Link>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <div
            className="border border-gray-100 p-3"
            style={{ width: "500px" }}
          >
            <form onSubmit={handleSubmit}>
              <label>
                <p className="mb-2">Нэвтрэх имэйл</p>
                <input
                  type="email"
                  className={`bg-gray-100 p-2 rounded-lg focus:outline-none border border-gray-100 focus:border-blue-600
									w-full ${errorEmail ? "border-red-600" : ""}`}
                  placeholder="Имэйл"
                  onChange={(event) => setEmailInput(event.target.value)}
                />
                <div
                  className={`flex items-center mt-2 ${
                    !errorEmail ? "hidden" : ""
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    focusable="false"
                    className="w-4 h-4"
                    aria-hidden="true"
                  >
                    <path
                      fill="rgb(229, 62, 62)"
                      d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
                    ></path>
                  </svg>
                  <p className="ml-1 text-red-600 text-xs">{errorEmailText}</p>
                </div>
              </label>
              <label>
                <p className="mb-2 mt-5">Нууц үг</p>
                <input
                  type="password"
                  className={`bg-gray-100 p-2 rounded-lg focus:outline-none border border-gray-100 focus:border-blue-600
									w-full ${errorPassword ? "borer-red-600" : ""}`}
                  placeholder="Нууц үг"
                  onChange={(event) => setPasswordInput(event.target.value)}
                />
                <div
                  className={`flex items-center mt-2 ${
                    !errorPassword ? "hidden" : ""
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    focusable="false"
                    className="w-4 h-4"
                    aria-hidden="true"
                  >
                    <path
                      fill="rgb(229, 62, 62)"
                      d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
                    ></path>
                  </svg>
                  <p className="ml-1 text-red-600 text-xs">
                    {errorPasswordText}
                  </p>
                </div>
              </label>
              <input
                type="submit"
                className="bg-blue-600 text-white rounded-lg py-2 w-full mt-10 cursor-pointer"
                value="Нэвтрэх"
              />
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
