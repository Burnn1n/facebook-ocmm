import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Axios from "axios";
import { Link } from "react-router-dom";
import dateConverter from "../../Util/DateConverter";

const Replied = ({ commentsData, repliedData }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="w-full">
      <div className="font-bold py-20 text-3xl border-b pl-5">
        Хариулсан сэтгэгдлүүд
      </div>
      <div
        className={`${!commentsData ? "" : "hidden"}  p-20 font-bold text-3xl`}
      >
        Түр хүлээнэ үү
      </div>
      <div className="w-full">
        {commentsData &&
          commentsData.map((item, index) => {
            return (
              repliedData &&
              repliedData.map((item1, index1) => {
                if (item.id == item1.commentId) {
                  const now = Date.now();
                  var date = dateConverter(now, item.timestamp);
                  const date1 = dateConverter(now, item1.repliedDate);
                  return (
                    <div key={index} className="flex p-10">
                      <img
                        src={item.post.media_url}
                        className="w-28 h-28 rounded-xl mr-5"
                      />
                      <div className="font-bold mr-10">
                        <div>
                          <p className="text-xl">Сэтгэгдэл</p>
                          <div className="flex justify-between space-x-2">
                            <a
                              href={`https://www.instagram.com/${item.username}/`}
                            >
                              @{item.username}:{" "}
                            </a>
                            <span className="font-normal">{item.text} </span>
                            <span className="font-normal text-gray-400">
                              {date}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4">
                          <p className="text-xl">Хариулт:</p>
                          <div className="flex justify-between space-x-2">
                            <a
                              href={`https://www.instagram.com/${user.instagram_name}/`}
                            >{`@${user.instagram_name}: `}</a>
                            <p className="font-normal">{item1.repliedText}</p>
                            <p className="font-normal text-gray-400">{date1}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <a href={item.post.permalink}>Пост руу очих</a>
                      </div>
                    </div>
                  );
                }
              })
            );
          })}
      </div>
    </div>
  );
};
export default Replied;
