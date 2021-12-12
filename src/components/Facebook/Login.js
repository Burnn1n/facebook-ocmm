import React, { useEffect, useState } from "react";
import FacebookLogin from "react-facebook-login";

const Login = ({ history }) => {
  const [isLogged, setIsLogged] = useState(true);
  const fbUser = JSON.parse(localStorage.getItem("fbUser"));
  useEffect(() => {
    setIsLogged(fbUser === null ? false : true);
    console.log(isLogged);
  }, []);

  const responseFacebook = (response) => {
    console.log(response);
    localStorage.setItem("fbUser", JSON.stringify(response));
    setIsLogged(true);
  };

  return (
    <React.Fragment>
      <div className={isLogged ? "hidden" : ""}>
        <FacebookLogin
          appId="625291618609742"
          autoLoad={true}
          fields="name,email,picture"
          callback={responseFacebook}
          cssClass="text-xl rounded-lg bg-blue-400 py-2 px-4 text-white"
          icon="fa-facebook"
        />
      </div>
      <div className={!isLogged ? "hidden" : ""}>
        <div className="flex items-center h-full">
          <img
            src={fbUser?.picture.data.url}
            className="w-10 h-10 rounded-full"
          />
          <p>{fbUser?.name}</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
