import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Axios from "axios";

const Profile = ({ history }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      history.push("/login");
    } else {
      Axios.post("http://localhost:3001/getUser", {
        id: JSON.parse(localStorage.getItem("user")).id,
      }).then((response) => {
        //console.log(response.data[0]);
        localStorage.setItem("user", JSON.stringify(response.data[0]));
      });
    }
  }, []);
  const [isChange, setIsChange] = useState(false);

  const TITLE = `Sparta || ${user.firstName}`;
  const [igName, setIgName] = useState(user.instagram_name);
  const [passwordInput, setPasswordInput] = useState(user.pass);
  const [nameInput, setNameInput] = useState(user.firstName);
  const handleSubmit = (event) => {
    Axios.post("http://localhost:3001/setUser", {
      id: user.id,
      name: nameInput,
      password: passwordInput,
      igName: igName,
    }).then((response) => {
      if (response.data.message) {
        console.log(response.data.message);
      } else {
      }
    });
    //event.preventDefault();
  };
  return (
    <React.Fragment>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <div className="mt-12 font-sans">
        <div className="my-20 text-center">
          <p className="font-bold text-4xl">Эргэн тавтай морилно уу.</p>
        </div>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="w-full">
            <div className="flex justify-center space-x-5 w-full mx-auto max-w-2xl">
              <div className="w-full font-bold text-xl space-y-5">
                <p>Нэр:</p>
                <p>Email:</p>
                <p>Instagram нэр:</p>
                <p>Нууц үг:</p>
                <p>Instagram хаяг холбосон эсэх:</p>
                <p>Төлбөрийн төлөвлөгөө:</p>
              </div>
              <div className="w-full text-xl">
                <p className={`${isChange ? "hidden" : ""}`}>
                  {user.firstName}
                </p>
                <input
                  className={`${
                    isChange ? "" : "hidden"
                  } border-2 focus:border-blue-600 rounded-lg focus:outline-none `}
                  type="text"
                  value={nameInput}
                  onChange={(event) => setNameInput(event.target.value)}
                />
                <p className="mt-5">{user.email}</p>
                <p className={`${isChange ? "hidden" : ""} mt-5 `}>
                  {user.instagram_name}
                </p>
                <input
                  className={`${
                    isChange ? "" : "hidden"
                  } border-2 focus:border-blue-600 rounded-lg focus:outline-none mt-5`}
                  type="text"
                  value={igName}
                  onChange={(event) => setIgName(event.target.value)}
                />
                <p className={`${isChange ? "hidden" : ""} mt-5 `}>
                  {user.pass}
                </p>
                <input
                  className={`${
                    isChange ? "" : "hidden"
                  } border-2 focus:border-blue-600 rounded-lg focus:outline-none mt-5`}
                  type="text"
                  value={passwordInput}
                  onChange={(event) => setPasswordInput(event.target.value)}
                />
                <p className="mt-5">{user.access_token ? "Тийм" : "Үгүй"}</p>
                <p className="mt-5">Үнэгүй</p>
              </div>
            </div>
            <div className="w-40 mx-auto w-full max-w-2xl mt-5 flex justify-end">
              <div className={`${isChange ? "hidden" : ""}`}>
                <div
                  className="bg-blue-600 py-3 px-5 rounded-xl text-white font-bold cursor-pointer"
                  onClick={() => setIsChange(true)}
                >
                  Өөрчлөх
                </div>
              </div>
              <div className={`${isChange ? "" : "hidden"} flex space-x-5`}>
                <div
                  className=" py-3 px-5 rounded-xl text-blue-600 font-bold border-2 border-blue-600 cursor-pointer "
                  onClick={() => setIsChange(false)}
                >
                  Болих
                </div>
                <input
                  type="submit"
                  className="bg-blue-600 py-3 px-5 rounded-xl text-white font-bold cursor-pointer"
                  onClick={() => setIsChange(true)}
                  value="Хадгалах"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Profile;
