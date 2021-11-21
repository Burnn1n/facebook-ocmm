import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
const svgReturner = (type) => {
  return type !== "check" ? (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      focusable="false"
      className="chakra-icon css-1usqyu9"
      aria-hidden="true"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"></path>
    </svg>
  ) : (
    <svg
      stroke="rgb(169 169 169)"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      className="chakra-icon css-50jb0o"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
};
function Home({ history }) {
  const TITLE = "Sparta || Нүүр хуудас";
  return (
    <React.Fragment>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <div className=" mt-12 font-sans">
        <div className="w-3/4 my-20">
          <div className="text-4xl font-bold text-gray-900">
            Таны Facebook-ын бүх сэтгэгдлүүд, удирдахад хялбар мэдээллийн нэг
            дор.
          </div>
          <div className="text-2xl text-gray-400 my-5">
            Сэтгэгдэлд хурдан хариулж, спамыг устгаж, үзэгчидтэйгээ
            холбогдоорой.
          </div>
          <Link to="/register">
            <button className="bg-blue-600 rounded-xl py-2 px-7 text-white font-bold text-lg">
              Үнэгүй хаяг нээх
            </button>
          </Link>

          <div className="flex mt-5 text-gray-400">
            <div className=" mx-3 flex items-center">
              {svgReturner("check")}
              <span className="ml-1">Тохируулахад амархан</span>
            </div>
            <div className=" mx-3 flex items-center">
              {svgReturner("check")}
              <span className="ml-1">Кардны мэдээлэл хэрэггүй</span>
            </div>
            <div className=" mx-3 flex items-center">
              {svgReturner("check")}
              <span className="ml-1">Ашиглахад аюулгүй</span>
            </div>
          </div>
        </div>
        <div className="w-full my-20">
          <div className="flex justify-center">
            <video loop={true} autoPlay={true}>
              <source
                src="https://combox.app/_next/static/videos/demo-c9406191aa1a4780f0fbf7641d4acfa6.mp4"
                type="video/mp4"
              />
              Your browser does not support video.
            </video>
          </div>
          <div className="mt-12 w-1/2 mx-auto text-center">
            <p className="text-2xl text-gray-500">
              Бодлоготой хариултуудыг боловсруулахад илүү их цаг зарцуулж,
              Facebook дээрх мэдэгдлийн сувгийг эрэмбэлэхэд бага цаг
              зарцуулаарай.
            </p>
            <Link to="/register">
              <button className="py-2 px-4 rounded-lg hover:bg-blue-100 mt-7 font-bold text-blue-600 text-xl">
                <div className="flex items-center text-center">
                  <span className="mr-2">Үнэгүй эхлээрэй</span>
                  <span className="pt-1">{svgReturner()}</span>
                </div>
              </button>
            </Link>
          </div>
        </div>
        <div className="my-32">
          <div className="flex flex-wrap">
            <div className="w-1/2 sm:w-full flex items-center px-5">
              <div>
                <p className="font-bold text-3xl text-gray-900">
                  Хийсэн нийтлэл болгондоо ирсэн сэтгэгдлүүдийг хараарай.
                </p>
                <p className="text-2xl text-gray-400 my-5">
                  Таны үзэгчид дахин хэзээ ч хариултгүй үлдэхгүй. Шинэ болон
                  хуучин нийтлэлүүд дээр ирсэн сэтгэгдлүүдийн талаар үргэлж
                  мэдэгдээрэй.
                </p>
                <Link to="register">
                  <button className=" rounded-lg hover:underline mt-2 font-bold text-blue-600 text-xl">
                    <div className="flex items-center text-center">
                      <span className="mr-2">Үнэгүй эхлээрэй</span>
                      <span className="pt-1">{svgReturner()}</span>
                    </div>
                  </button>{" "}
                </Link>
              </div>
            </div>
            <div className="w-1/2 sm:w-full">
              <img
                src="https://combox.app/_next/static/images/all-comments-8d246ce6ee40a3285cb6e28b5922f361.jpg"
                alt=""
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
        <div className="my-32">
          <div className="flex flex-wrap">
            <div className="w-1/2 sm:w-full">
              <img
                src="https://combox.app/_next/static/images/feeds-0d76572644c3dd79b82a3e26e1a74e79.jpg"
                alt=""
                className="object-cover w-full h-full"
              />
            </div>
            <div className="w-1/2 sm:w-full flex items-center px-5">
              <div>
                <p className="font-bold text-3xl text-gray-900">
                  Спамыг устгаж, хамгийн чухал сэтгэгдэлд анхаарлаа
                  хандуулаарай.
                </p>
                <p className="text-2xl text-gray-400 my-5">
                  Түлхүүр үг, чанар, сүүлийн үеийн байдал болон бусад зүйлд
                  тулгуурлан өөр өөр төрлийн сэтгэгдлийг тус тусад нь
                  дамжуулаарай.
                </p>
                <Link to="register">
                  <button className=" rounded-lg hover:underline mt-2 font-bold text-blue-600 text-xl">
                    <div className="flex items-center text-center">
                      <span className="mr-2">Үнэгүй эхлээрэй</span>
                      <span className="pt-1">{svgReturner()}</span>
                    </div>
                  </button>{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="my-32">
          <div className="flex flex-wrap">
            <div className="w-1/2 sm:w-full flex items-center px-5">
              <div>
                <p className="font-bold text-3xl text-gray-900">
                  Түгээмэл асуултуудын хариултыг хэзээ ч дахин бүү бич.
                </p>
                <p className="text-2xl text-gray-400 my-5">
                  Байнга асуудаг асуултуудын хариултыг дахин бичих гэж цаг бүү
                  үр. Хадгалсан хариултуудыг нэг товшилтоор илгээх боломжтой.
                </p>
                <Link to="register">
                  <button className=" rounded-lg hover:underline mt-2 font-bold text-blue-600 text-xl">
                    <div className="flex items-center text-center">
                      <span className="mr-2">Үнэгүй эхлээрэй</span>
                      <span className="pt-1">{svgReturner()}</span>
                    </div>
                  </button>{" "}
                </Link>
              </div>
            </div>
            <div className="w-1/2 sm:w-full">
              <img
                src="https://combox.app/_next/static/images/saved-replies-7daa0935c441e499c9e86669d90f6c18.jpg"
                alt=""
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
        <div
          className="my-32 py-20 flex justify-center"
          style={{ backgroundColor: "#f4f6fe" }}
        >
          <div className="text-center w-3/5">
            <p className="text-4xl font-bold">
              Үр дүнтэй, бодолтой: Facebook дээрх сэтгэгдэлд хариу өгөх илүү
              сайн арга.
            </p>
            <Link to="register">
              <button className="bg-blue-600 rounded-xl py-2 px-7 text-white font-bold text-lg mt-10">
                Үнэгүй хаяг нээх
              </button>{" "}
            </Link>

            <div className="w-full flex justify-center">
              <div className="flex mt-5 text-gray-400">
                <div className=" mx-3 flex items-center">
                  {svgReturner("check")}
                  <span className="ml-1">Тохируулахад амархан</span>
                </div>
                <div className=" mx-3 flex items-center">
                  {svgReturner("check")}
                  <span className="ml-1">Кардны мэдээлэл хэрэггүй</span>
                </div>
                <div className=" mx-3 flex items-center">
                  {svgReturner("check")}
                  <span className="ml-1">Ашиглахад аюулгүй</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
