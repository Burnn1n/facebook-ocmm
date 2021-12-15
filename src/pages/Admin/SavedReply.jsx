import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Axios from "axios";
import { Link } from "react-router-dom";
const SavedReply = ({ savedData }) => {
  // const [savedData, setSavedData] = useState();
  const [input1, setInput1] = useState();
  const [input2, setInput2] = useState();

  // useEffect(() => {
  //   Axios.post("http://localhost:3001/getSavedReply", {
  //     userId: JSON.parse(localStorage.getItem("user")).id,
  //   }).then((response) => {
  //     console.log(response.data);
  //     setSavedData(response.data);
  //     //localStorage.setItem("user", JSON.stringify(response.data[0]));
  //   });
  // }, []);

  const handleSubmit = (event) => {
    if (input1 && input2) {
      Axios.post("http://localhost:3001/setSavedReply", {
        userId: JSON.parse(localStorage.getItem("user")).id,
        inputText: input1,
        replyText: input2,
      }).then((response) => {
        console.log(response.data);
        setInput1("Амжилттай");
        setInput2("Амжилттай");
        //localStorage.setItem("user", JSON.stringify(response.data[0]));
      });
    } else {
      event.preventDefault();
    }
  };
  const helper = (type, item) => {
    const dada = type === "create";
    return (
      <div className="grid grid-cols-12 gap-5 my-5">
        <label className="col-span-3">
          <p>Оролт</p>
          {dada ? (
            <input
              value={input1}
              type="text"
              className={`bg-gray-100 p-2 rounded-lg focus:outline-none border border-gray-100 focus:border-blue-600
				w-full disabled`}
              onChange={(event) => {
                setInput1(event.target.value);
              }}
            />
          ) : (
            <input
              disabled
              value={item?.inputText}
              type="text"
              className={`bg-gray-100 p-2 rounded-lg focus:outline-none border border-gray-100 focus:border-blue-600
			w-full disabled`}
            />
          )}
        </label>
        <label className="col-span-3">
          <p>Гаралт</p>
          {dada ? (
            <input
              value={input2}
              type="text"
              className={`bg-gray-100 p-2 rounded-lg focus:outline-none border border-gray-100 focus:border-blue-600
				w-full disabled`}
              onChange={(event) => {
                setInput2(event.target.value);
              }}
            />
          ) : (
            <input
              disabled
              value={item?.replyText}
              type="text"
              className={`bg-gray-100 p-2 rounded-lg focus:outline-none border border-gray-100 focus:border-blue-600
			w-full disabled`}
            />
          )}
        </label>
        {dada && (
          <input
            type="submit"
            className="bg-blue-600 text-white rounded-lg py-2 col-span-4 cursor-pointer"
            value="Хадгалах"
          />
        )}
        {!dada && (
          <button
            className="bg-red-600 text-white rounded-lg py-2 col-span-4 cursor-pointer hover:bg-white border border-red-600
					hover:text-red-600"
            onClick={() => {
              Axios.post("http://localhost:3001/deleteSavedReply", {
                id: item.id,
              }).then((response) => {
                window.location.reload(false);
              });
            }}
          >
            Устгах
          </button>
        )}
      </div>
    );
  };
  //Автомат хариултыг устгах
  return (
    <div className="w-full pl-5">
      <div className="font-bold pt-20 pb-10 text-3xl border-b">
        <p>Хадгалсан хариултууд</p>
      </div>
      <div className="w-full ml-5">
        <div>
          <p className="font-semibold text-2xl my-5">Хариулт нэмэх</p>
          <form onSubmit={handleSubmit}>{helper("create")}</form>
        </div>
        <div className="mt-5">
          <p className="font-semibold text-2xl">Хадгалсан хариултууд</p>
          <div>
            {savedData &&
              savedData.map((item, index) => {
                return helper("show", item);
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SavedReply;
