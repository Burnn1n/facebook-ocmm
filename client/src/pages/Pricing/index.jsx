import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Pricing = ({ history }) => {
  const logoReturn = (type) => {
    return type !== "check" ? (
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 24 24"
        focusable="false"
        class="chakra-icon css-1p2bo7r"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.48 2.54l2.6 1.53c.56-1.24.88-2.62.88-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.06.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z"></path>
      </svg>
    ) : (
      <svg
        stroke="rgb(34, 68, 236)"
        fill="rgb(34, 68, 236)"
        stroke-width="0"
        viewBox="0 0 512 512"
        focusable="false"
        class="chakra-icon css-19ycw37"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M256 48C141.6 48 48 141.6 48 256s93.6 208 208 208 208-93.6 208-208S370.4 48 256 48zm-42.7 318.9L106.7 260.3l29.9-29.9 76.8 76.8 162.1-162.1 29.9 29.9-192.1 191.9z"></path>
      </svg>
    );
  };
  const TITLE = "Sparta || Төлбөр";
  return (
    <React.Fragment>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <div className="mt-12 font-sans">
        <div className="my-20 text-center">
          <p className="font-bold text-4xl">
            Танд тохирох төлөвлөгөөг олоорой.
          </p>
          <p className="text-xl text-gray-500 mt-5">
            7 хоногийн үнэгүй туршилт, хүссэн үедээ цуцлаарай.
          </p>
        </div>
        <div className="flex flex-wrap justify-center mb-20">
          <div className="p-3 border border-gray-100 rounded-lg h-full sm:w-full">
            <p className="font-semibold text-xl">Үнэгүй</p>
            <div className="p-5 bg-gray-100 rounded-lg">
              <p>
                <span className="font-bold text-xl">₮0</span>
                <span className="text-gray-500">/Сард</span>
              </p>
              <div className="mt-3  pb-5 border-b border-dashed border-gray-500">
                <div className="flex items-center">
                  {logoReturn()}
                  <p className="ml-2">
                    <span className="font-semibold">1 </span> Facebook-н хаяг
                    холбох
                  </p>
                </div>
                <div className="flex items-center">
                  {logoReturn()}
                  <p className="ml-2">
                    <span className="font-semibold">1 </span> Хэрэглэгч урих
                  </p>
                </div>
                <div className="flex items-center">
                  {logoReturn()}
                  <p className="ml-2">
                    <span className="font-semibold">10 </span> ширхэг хариулт
                    хадгалах
                  </p>
                </div>
                <div className="flex items-center">
                  {logoReturn()}
                  <p className="ml-2">
                    <span className="font-semibold">50 </span> ширхэг хариулт
                    өгөх/Сар
                  </p>
                </div>
              </div>
              <div className="py-5">
                <div>
                  <div className="flex items-center">
                    {logoReturn("check")}
                    <p className="ml-2">Сэтгэгдлүүдийн feed</p>
                  </div>
                  <div className="flex items-center">
                    {logoReturn("check")}
                    <p className="ml-2">Шууд сэтгэгдлийн хяналт</p>
                  </div>
                  <div className="flex items-center">
                    {logoReturn("check")}
                    <p className="ml-2">Спамын шүүлтүүрүүд</p>
                  </div>
                  <div className="flex items-center">
                    {logoReturn("check")}
                    <p className="ml-2">Хадгалсан хариултууд</p>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <button className="w-full rounded-xl py-2 bg-blue-600 text-white font-semibold">
                  Шинэ хаяг нээх
                </button>
              </div>
            </div>
          </div>
          <div className="p-3 border border-gray-100 rounded-lg h-full mx-5 sm:w-full">
            <p className="font-semibold text-xl">Хувийн</p>
            <div className="p-5 bg-gray-100 rounded-lg">
              <p>
                <span className="font-bold text-xl">₮20'000</span>
                <span className="text-gray-500">/сард</span>
              </p>
              <div className="mt-3  pb-5 border-b border-dashed border-gray-500">
                <div className="flex items-center">
                  {logoReturn()}
                  <p className="ml-2">
                    <span className="font-semibold">1 </span> Facebook-н хаяг
                    холбох
                  </p>
                </div>
                <div className="flex items-center">
                  {logoReturn()}
                  <p className="ml-2">
                    <span className="font-semibold">1 </span> Хэрэглэгч урих
                  </p>
                </div>
                <div className="flex items-center">
                  {logoReturn()}
                  <p className="ml-2">
                    <span className="font-semibold">Хязгааргүй </span> ширхэг
                    хариулт хадгалах
                  </p>
                </div>
                <div className="flex items-center">
                  {logoReturn()}
                  <p className="ml-2">
                    <span className="font-semibold">Хязгааргүй </span> ширхэг
                    хариулт өгөх/Сар
                  </p>
                </div>
              </div>
              <div className="py-5">
                <div>
                  <div className="flex items-center">
                    {logoReturn("check")}
                    <p className="ml-2">Сэтгэгдлүүдийн feed</p>
                  </div>
                  <div className="flex items-center">
                    {logoReturn("check")}
                    <p className="ml-2">Шууд сэтгэгдлийн хяналт</p>
                  </div>
                  <div className="flex items-center">
                    {logoReturn("check")}
                    <p className="ml-2">Спамын шүүлтүүрүүд</p>
                  </div>
                  <div className="flex items-center">
                    {logoReturn("check")}
                    <p className="ml-2">Хадгалсан хариултууд</p>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <button className="w-full rounded-xl py-2 bg-blue-600 text-white font-semibold">
                  Үнэгүй эхлээрэй
                </button>
              </div>
            </div>
          </div>
          <div className="p-3 border border-gray-100 rounded-lg h-full sm:w-full">
            <p className="font-semibold text-xl">Багийн</p>
            <div className="p-5 bg-gray-100 rounded-lg">
              <p>
                <span className="font-bold text-xl">₮50'000</span>
                <span className="text-gray-500">/сард</span>
              </p>
              <div className="mt-3  pb-5 border-b border-dashed border-gray-500">
                <div className="flex items-center">
                  {logoReturn()}
                  <p className="ml-2">
                    <span className="font-semibold">Хязгааргүй </span>{" "}
                    Facebook-н хаяг холбох
                  </p>
                </div>
                <div className="flex items-center">
                  {logoReturn()}
                  <p className="ml-2">
                    <span className="font-semibold">3</span> Хэрэглэгч урих
                  </p>
                </div>
                <div className="flex items-center">
                  {logoReturn()}
                  <p className="ml-2">
                    <span className="font-semibold">Хязгааргүй </span> ширхэг
                    хариулт хадгалах
                  </p>
                </div>
                <div className="flex items-center">
                  {logoReturn()}
                  <p className="ml-2">
                    <span className="font-semibold">Хязгааргүй </span> ширхэг
                    хариулт өгөх/Сар
                  </p>
                </div>
              </div>
              <div className="py-5">
                <div>
                  <div className="flex items-center">
                    {logoReturn("check")}
                    <p className="ml-2">Сэтгэгдлүүдийн feed</p>
                  </div>
                  <div className="flex items-center">
                    {logoReturn("check")}
                    <p className="ml-2">Шууд сэтгэгдлийн хяналт</p>
                  </div>
                  <div className="flex items-center">
                    {logoReturn("check")}
                    <p className="ml-2">Спамын шүүлтүүрүүд</p>
                  </div>
                  <div className="flex items-center">
                    {logoReturn("check")}
                    <p className="ml-2">Хадгалсан хариултууд</p>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <button className="w-full rounded-xl py-2 bg-blue-600 text-white font-semibold">
                  Шинэ хаяг нээх
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Pricing;
