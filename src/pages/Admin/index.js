//1.Хийх зүйлс хариулсан хариултыг болон commentId-г болон хэрэглэгчийн id г агуулсан
// table шинээр нэмэх өгөгдлийн санд
// 2.Автомат хариулагч нэмэх энд өгөгдлийн санд оролт болон гаралт болон хэрэглэгчийн id-тай table нэмнэ.
// сэтгэгдэл устгах DONE
// 3.дараа хариулах руу оруулах өгөгдлийн санд commend id болон хэрэглэгчийн id агуулсан 2 мөртэй table үүсгэх
//Дээрх 3 table-г үүсгэх
//№1. create table replied(id,userId,commentId,repliedText)
//№2. create table autoReply(id,userId,inputValue,outputValue)
//№3. create table stepAside(id,userId,commenId)

import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Axios from "axios";
import { Link } from "react-router-dom";
import SavedReply from "./SavedReply";

const Admin = ({ history }) => {
  const [panelOpened, setPanelOpened] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
  const [posts, setPosts] = useState();
  const [savedData, setSavedData] = useState();
  const [repliedData, setRepliedData] = useState();

  //initial render
  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      console.log(localStorage.getItem("user") === null);
      history.push("/login");
    } else {
      Axios.post("http://localhost:3001/getUser", {
        id: JSON.parse(localStorage.getItem("user")).id,
      }).then((response) => {
        //console.log(response.data[0]);
        localStorage.setItem("user", JSON.stringify(response.data[0]));
      });
    }
    //fetch бүх автомат хариултыг
    Axios.post("http://localhost:3001/getSavedReply", {
      userId: JSON.parse(localStorage.getItem("user")).id,
    }).then((response) => {
      //console.log("autoReply data - ", response.data);
      setSavedData(response.data);
      //localStorage.setItem("user", JSON.stringify(response.data[0]));
    });

    //Хариулсан comm-уудын id
    Axios.post("http://localhost:3001/getDidAutoReply", {
      id: 0,
    }).then((response) => {
      //console.log(" did autoReply data- ",response.data);
      setRepliedData(response.data);
      //localStorage.setItem("user", JSON.stringify(response.data[0]));
    });

    //fetch buh postnuudiig

    const getPostsIdUrl = `https://graph.facebook.com/v5.0/${
      user?.instagram_id
    }?fields=business_discovery.username%28${
      JSON.parse(localStorage.getItem("user"))?.instagram_name
    }%29%7Busername%2Cwebsite%2Cname%2Cig_id%2Cid%2Cprofile_picture_url%2Cbiography%2Cfollows_count%2Cfollowers_count%2Cmedia_count%2Cmedia%7Bcaption%2Clike_count%2Ccomments_count%2Cmedia_url%2Cpermalink%2Cmedia_type%7D%7D&access_token=${
      user?.access_token
    }`;

    Axios.get(getPostsIdUrl).then((response) => {
      setPosts(response.data.business_discovery.media.data);
    });
  }, []);
  useEffect(() => {
    var url = window.location.href; // or window.location.href for current url
    var menuNumber = /menu=([^&]+)/.exec(url);
    if (menuNumber) {
      var num = parseInt(menuNumber[1]); // Value is in [1] ('384' in our case)
      setPanelOpened(num);
      setTitle(num === 0 ? `Шинэ - Админ` : num === 1 ? `Бүгд - Админ` : "");
    }
  }, [window.location.href]);
  const [title, setTitle] = useState();
  const [reply, setReply] = useState([]);
  const [show, setShow] = useState(true);
  const [commentsData, setCommentsData] = useState([]);
  const [newCommentsData, setNewCommentsData] = useState([]);
  const [repliedIds, setRepliedIds] = useState([]);
  //buh commentuudiin medeelliig awah цаг, нэр текст
  useEffect(() => {
    if (posts) {
      //console.log("postsId ni bol - ", posts);

      posts.map((post, index) => {
        const getCommentUrl = `https://graph.facebook.com/v5.0/${post.id}/comments?fields=like_count%2Creplies%2Cusername%2Ctext%2Ctimestamp&access_token=${user?.access_token}`;
        Axios.get(getCommentUrl).then((response) => {
          response.data.data.map((item1, index1) => {
            var arr = commentsData;
            arr.push({ ...item1, post });
            setCommentsData([...arr]);
          });
        });
      });
    }
  }, [posts]);
  //com
  useEffect(() => {
    if (commentsData) {
      //console.log("comments-data", commentsData);
      commentsData.map((item, index) => {
        //reply
        var dada = reply;
        dada.push("");
        setReply([...dada]);
        //
        const userAccountDate = new Date(user.reg_date);
        const deadline = userAccountDate.getTime();
        console.log("deadline - ", deadline);
        //const deadline = 1639324209019;
        const commentTime = +new Date(item.timestamp);
        if (deadline < commentTime) {
          var dd = newCommentsData;
          if (!dd.includes(item)) {
            dd.push(item);
            setNewCommentsData([...dd]);
          }
        }
        //Автоматаар хариулах
        var didReply = false; //Өмнө нь хариулж байсан эсэх
        repliedData &&
          repliedData.map((item2) => {
            //Өмнө нь хариулж байсан
            if (item2.commendId === item.id) {
              didReply = true;
            }
          });
        !didReply &&
          savedData.map((item1) => {
            //Ирсэн comment-н текст нь автомат хариулагчийн тексттэй таарч байх үед
            if (item1.inputText === item.text) {
              //Автоматаар хариулсан comment-н id-нуудыг агуулсан массив
              var ddd = repliedIds;
              //Хэрэв commend-н id нь байвал юу ч хийхгүй байхгүй бол хариулна
              if (!ddd.includes(item.id)) {
                //Энэ comment-д хариулсан гэдгийг бүртгэж байна
                ddd.push(item.id);
                setRepliedIds([...ddd]);
                //Хариулах
                Axios.post(
                  `https://graph.facebook.com/v5.0/${item.id}/replies`,
                  {
                    message: item1.replyText,
                    access_token: user?.access_token,
                  }
                ).then((response) => {
                  //Сэтгэгдэлд автоматаар хариулсны дараа хариулсан гэх бүртгэл рүү insert хийх үгүй бол ажиллах
                  // бүрд хариулсаар байх болно
                  Axios.post("http://localhost:3001/setDidAutoReply", {
                    commendId: item.id,
                    autoId: item1.id,
                  }).then((response) => {
                    //console.log("response - ", response);
                  });
                });
              }
            }
          });
      });
    }
  }, [commentsData]);
  const handleReply = (commentId, index) => {
    Axios.post(`https://graph.facebook.com/v5.0/${commentId}/replies`, {
      message: reply[index],
      access_token: user?.access_token,
    }).then((response) => {
      //console.log(response);
    });
    var dada = reply;
    dada[index] = "Амжилттай";
    setReply([...dada]);
  };
  //Menu
  const sideBarMenu = () => {
    return (
      <div className="flex flex-no-wrap h-full w-full mb-10">
        <div className="h-full bg-gray-900 p-4">
          <div className="flex w-full h-full">
            <div className=" flex flex-col h-full justify-between">
              <div className>
                <Link to="/admin?menu=0">
                  <div className="flex items-center">
                    <img
                      src="https://www.nicepng.com/png/full/177-1772556_logo-no-background-grey-large-cool-logos-with.png"
                      alt=""
                      width={34}
                      height={34}
                    />
                    {show && (
                      <div className="pl-1" id="closed">
                        <p className="text-white font-bold text-3xl">Sparta</p>
                      </div>
                    )}
                  </div>
                </Link>

                <div className="mt-10 flex items-center relative">
                  <div className="-mt-5" onClick={() => setShow(!show)}>
                    {show ? (
                      <button
                        aria-label="minimize sidebar"
                        id="close"
                        className="w-6 h-6 right-0 -mr-7 bg-indigo-500 absolute shadow rounded-full flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                      >
                        <svg
                          width={16}
                          height={16}
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10 4L6 8L10 12"
                            stroke="white"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    ) : (
                      <button
                        id="open"
                        className=" w-6 h-6 right-0 -mr-7 bg-indigo-500 absolute shadow rounded-full flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                      >
                        <svg
                          aria-label="expand sidebar"
                          width={16}
                          height={16}
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 12L10 8L6 4"
                            stroke="white"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex">
                  <ul aria-orientation="vertical" className="mt-10">
                    <Link to="/admin?menu=0">
                      <li
                        tabIndex={0}
                        role="button"
                        aria-label="Overview"
                        className="cursor-pointer pb-3"
                      >
                        <svg
                          width={16}
                          height={16}
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.5 2.5H9.16667V9.16667H2.5V2.5ZM2.5 10.8333H9.16667V17.5H2.5V10.8333ZM10.8333 2.5H17.5V9.16667H10.8333V2.5ZM10.8333 10.8333H17.5V17.5H10.8333V10.8333ZM12.5 4.16667V7.5H15.8333V4.16667H12.5ZM12.5 12.5V15.8333H15.8333V12.5H12.5ZM4.16667 4.16667V7.5H7.5V4.16667H4.16667ZM4.16667 12.5V15.8333H7.5V12.5H4.16667Z"
                            fill={`${panelOpened === 0 ? "#fff" : "#9CA3AF"} `}
                          />
                        </svg>
                      </li>
                    </Link>

                    <Link to="/admin?menu=1">
                      <li
                        tabIndex={0}
                        role="button"
                        aria-label="People"
                        className="cursor-pointer py-3"
                      >
                        <svg
                          width={16}
                          height={16}
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.6665 18.3333C1.6665 16.5652 2.36888 14.8695 3.61913 13.6193C4.86937 12.369 6.56506 11.6667 8.33317 11.6667C10.1013 11.6667 11.797 12.369 13.0472 13.6193C14.2975 14.8695 14.9998 16.5652 14.9998 18.3333H13.3332C13.3332 17.0073 12.8064 15.7355 11.8687 14.7978C10.931 13.8601 9.65925 13.3333 8.33317 13.3333C7.00709 13.3333 5.73532 13.8601 4.79764 14.7978C3.85995 15.7355 3.33317 17.0073 3.33317 18.3333H1.6665ZM8.33317 10.8333C5.57067 10.8333 3.33317 8.59584 3.33317 5.83334C3.33317 3.07084 5.57067 0.833336 8.33317 0.833336C11.0957 0.833336 13.3332 3.07084 13.3332 5.83334C13.3332 8.59584 11.0957 10.8333 8.33317 10.8333ZM8.33317 9.16667C10.1748 9.16667 11.6665 7.675 11.6665 5.83334C11.6665 3.99167 10.1748 2.5 8.33317 2.5C6.4915 2.5 4.99984 3.99167 4.99984 5.83334C4.99984 7.675 6.4915 9.16667 8.33317 9.16667ZM15.2365 12.2525C16.4076 12.7799 17.4015 13.6344 18.0987 14.7131C18.7958 15.7918 19.1666 17.0489 19.1665 18.3333H17.4998C17.5 17.37 17.222 16.4271 16.6991 15.618C16.1762 14.8089 15.4307 14.1681 14.5523 13.7725L15.2357 12.2525H15.2365ZM14.6632 2.84417C15.5028 3.19025 16.2206 3.77795 16.7257 4.53269C17.2307 5.28744 17.5002 6.1752 17.4998 7.08334C17.5002 8.22695 17.0729 9.32936 16.302 10.174C15.531 11.0187 14.4721 11.5446 13.3332 11.6483V9.97084C13.9506 9.8824 14.5235 9.59835 14.9676 9.16038C15.4117 8.72242 15.7037 8.1536 15.8008 7.53745C15.8979 6.92129 15.7948 6.29025 15.5068 5.73696C15.2188 5.18368 14.761 4.73729 14.2007 4.46334L14.6632 2.84417Z"
                            fill={`${panelOpened === 1 ? "#fff" : "#9CA3AF"} `}
                          />
                        </svg>
                      </li>
                    </Link>

                    <Link to="/admin?menu=2">
                      <li
                        tabIndex={0}
                        role="button"
                        aria-label="Workflow"
                        className="cursor-pointer py-3"
                      >
                        <svg
                          width={16}
                          height={16}
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.50016 6.2825L12.5002 17.9492L15.5493 10.8333H19.1668V9.16667H14.451L12.5002 13.7175L7.50016 2.05083L4.451 9.16667H0.833496V10.8333H5.54933L7.50016 6.2825Z"
                            fill={`${panelOpened === 2 ? "#fff" : "#9CA3AF"} `}
                          />
                        </svg>
                      </li>
                    </Link>

                    {/* <Link to="/admin?menu=3">
                      <li
                        tabIndex={0}
                        role="button"
                        aria-label="Campaignns"
                        className="cursor-pointer py-3"
                      >
                        <svg
                          width={16}
                          height={16}
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.1665 1.70834V3.385C5.87817 3.795 3.33317 6.6 3.33317 10C3.33317 13.6817 6.31817 16.6667 9.99984 16.6667C11.5407 16.6667 12.9582 16.1442 14.0882 15.2667L15.274 16.4525C13.8373 17.6275 11.9998 18.3333 9.99984 18.3333C5.39734 18.3333 1.6665 14.6025 1.6665 10C1.6665 5.67917 4.95567 2.12584 9.1665 1.70834ZM18.2915 10.8333C18.1248 12.5092 17.4632 14.0392 16.4523 15.2733L15.2665 14.0883C15.9832 13.1658 16.4632 12.0508 16.6148 10.8333H18.2923H18.2915ZM10.8348 1.70834C14.7715 2.09917 17.9015 5.23 18.2932 9.16667H16.6157C16.2398 6.15167 13.8498 3.76167 10.8348 3.385V1.7075V1.70834Z"
                            fill={`${panelOpened === 3 ? "#fff" : "#9CA3AF"} `}
                          />
                        </svg>
                      </li>
                    </Link>

                    <Link to="/admin?menu=4">
                      <li
                        tabIndex={0}
                        role="button"
                        aria-label="Messages"
                        className="cursor-pointer py-3"
                      >
                        <svg
                          width={16}
                          height={16}
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.07568 17.3533L1.66651 18.3333L2.64651 13.9242C2.00112 12.717 1.66445 11.3689 1.66651 10C1.66651 5.39751 5.39735 1.66667 9.99985 1.66667C14.6023 1.66667 18.3332 5.39751 18.3332 10C18.3332 14.6025 14.6023 18.3333 9.99985 18.3333C8.63098 18.3354 7.28286 17.9987 6.07568 17.3533ZM6.31735 15.5925L6.86151 15.8842C7.82697 16.4001 8.90517 16.669 9.99985 16.6667C11.3184 16.6667 12.6073 16.2757 13.7036 15.5431C14.8 14.8106 15.6545 13.7694 16.159 12.5512C16.6636 11.3331 16.7957 9.99261 16.5384 8.6994C16.2812 7.4062 15.6462 6.21831 14.7139 5.28596C13.7815 4.35361 12.5937 3.71867 11.3004 3.46144C10.0072 3.2042 8.6668 3.33622 7.44862 3.84081C6.23045 4.34539 5.18926 5.19988 4.45672 6.2962C3.72417 7.39253 3.33318 8.68146 3.33318 10C3.33318 11.1117 3.60401 12.1817 4.11651 13.1383L4.40735 13.6825L3.86151 16.1383L6.31735 15.5925Z"
                            fill={`${panelOpened === 4 ? "#fff" : "#9CA3AF"} `}
                          />
                        </svg>
                      </li>
                    </Link>

                    <Link to="/admin?menu=5">
                      <li
                        tabIndex={0}
                        role="button"
                        aria-label="stack"
                        className="cursor-pointer py-3"
                      >
                        <svg
                          width={16}
                          height={16}
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16.736 12.6667L17.7377 13.2675C17.7995 13.3045 17.8506 13.3569 17.8862 13.4195C17.9217 13.4822 17.9404 13.553 17.9404 13.625C17.9404 13.697 17.9217 13.7678 17.8862 13.8305C17.8506 13.8931 17.7995 13.9455 17.7377 13.9825L10.4294 18.3675C10.2998 18.4454 10.1514 18.4865 10.0002 18.4865C9.849 18.4865 9.70065 18.4454 9.57104 18.3675L2.2627 13.9825C2.20091 13.9455 2.14976 13.8931 2.11424 13.8305C2.07873 13.7678 2.06006 13.697 2.06006 13.625C2.06006 13.553 2.07873 13.4822 2.11424 13.4195C2.14976 13.3569 2.20091 13.3045 2.2627 13.2675L3.26437 12.6667L10.0002 16.7083L16.736 12.6667ZM16.736 8.75001L17.7377 9.35084C17.7995 9.38783 17.8506 9.44022 17.8862 9.50287C17.9217 9.56553 17.9404 9.63632 17.9404 9.70834C17.9404 9.78036 17.9217 9.85115 17.8862 9.91381C17.8506 9.97647 17.7995 10.0288 17.7377 10.0658L10.0002 14.7083L2.2627 10.0658C2.20091 10.0288 2.14976 9.97647 2.11424 9.91381C2.07873 9.85115 2.06006 9.78036 2.06006 9.70834C2.06006 9.63632 2.07873 9.56553 2.11424 9.50287C2.14976 9.44022 2.20091 9.38783 2.2627 9.35084L3.26437 8.75001L10.0002 12.7917L16.736 8.75001ZM10.4285 1.09084L17.7377 5.47584C17.7995 5.51284 17.8506 5.56521 17.8862 5.62787C17.9217 5.69053 17.9404 5.76132 17.9404 5.83334C17.9404 5.90536 17.9217 5.97615 17.8862 6.03881C17.8506 6.10147 17.7995 6.15385 17.7377 6.19084L10.0002 10.8333L2.2627 6.19084C2.20091 6.15385 2.14976 6.10147 2.11424 6.03881C2.07873 5.97615 2.06006 5.90536 2.06006 5.83334C2.06006 5.76132 2.07873 5.69053 2.11424 5.62787C2.14976 5.56521 2.20091 5.51284 2.2627 5.47584L9.57104 1.09084C9.70065 1.01297 9.849 0.971832 10.0002 0.971832C10.1514 0.971832 10.2998 1.01297 10.4294 1.09084H10.4285ZM10.0002 2.77667L4.90604 5.83334L10.0002 8.89001L15.0944 5.83334L10.0002 2.77667Z"
                            fill={`${panelOpened === 5 ? "#fff" : "#9CA3AF"} `}
                          />
                        </svg>
                      </li>
                    </Link> */}
                  </ul>
                  {show && (
                    <div className="w-full mt-10">
                      <Link to="/admin?menu=0">
                        <p
                          className={`text-base leading-4 pl-3 cursor-pointer pb-3 text-${
                            panelOpened === 0 ? "white" : "gray-400"
                          } hover:text-white whitespace-nowrap`}
                        >
                          Шинэ сэтгэгдлүүд
                        </p>
                      </Link>
                      <Link to="/admin?menu=1">
                        <p
                          className={`text-base leading-4 pl-3 cursor-pointer py-3 text-${
                            panelOpened === 1 ? "white" : "gray-400"
                          } hover:text-white whitespace-nowrap`}
                        >
                          Бүх сэтгэгдлүүд
                        </p>
                      </Link>

                      <Link to="/admin?menu=2">
                        <p
                          className={`text-base leading-4 pl-3 cursor-pointer py-3 text-${
                            panelOpened === 2 ? "white" : "gray-400"
                          } hover:text-white whitespace-nowrap`}
                        >
                          Хадгалсан
                        </p>
                      </Link>

                      {/* <Link to="/admin?menu=3">
                        <p
                          className={`text-base leading-4 pl-3 cursor-pointer py-3 text-${
                            panelOpened === 3 ? "white" : "gray-400"
                          } hover:text-white whitespace-nowrap`}
                        >
                          Хариулсан
                        </p>
                      </Link>

                      <Link to="/admin?menu=4">
                        <p
                          className={`text-base leading-4 pl-3 cursor-pointer py-3 text-${
                            panelOpened === 4 ? "white" : "gray-400"
                          } hover:text-white whitespace-nowrap`}
                        >
                          Messages
                        </p>
                      </Link>

                      <Link to="/admin?menu=5">
                        <p
                          className={`text-base leading-4 pl-3 cursor-pointer py-3 text-${
                            panelOpened === 5 ? "white" : "gray-400"
                          } hover:text-white whitespace-nowrap`}
                        >
                          Stack
                        </p>
                      </Link> */}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  //Бүх сэтгэгдлүүд

  const comments = (commentsData, type) => {
    return (
      <div className="w-full">
        <div className="font-bold py-20 text-3xl border-b pl-5">
          {type} ирсэн сэтгэгдлүүд ({commentsData.length})
        </div>
        <div
          className={`${
            !commentsData ? "" : "hidden"
          }  p-20 font-bold text-3xl`}
        >
          Түр хүлээнэ үү
        </div>
        <div className="w-full">
          {commentsData &&
            commentsData.map((item, index) => {
              //console.log(Date.now());
              const now = Date.now();
              var commentTime = +new Date(item.timestamp);
              const secondsElapsed = (now - commentTime) / 1000;
              const minutesElapsed = secondsElapsed / 60;
              const hoursElapsed = minutesElapsed / 60;
              const daysElapsed = hoursElapsed / 24;
              const weeksElapsed = daysElapsed / 7;
              var date = 0;
              if (weeksElapsed < 1) {
                if (daysElapsed < 1) {
                  if (hoursElapsed < 1) {
                    if (minutesElapsed < 1) {
                      date = `${secondsElapsed ^ 0} сек`;
                    } else date = `${minutesElapsed ^ 0} мин`;
                  } else date = `${hoursElapsed ^ 0} цаг`;
                } else date = `${daysElapsed ^ 0} өдөр`;
              } else date = `${weeksElapsed ^ 0} 7 хоног`;

              return (
                <div key={index} className="flex p-10">
                  <img
                    src={item.post.media_url}
                    className="w-20 h-20 rounded-xl mr-5"
                  />
                  <div className="font-bold mr-10">
                    <p>
                      <span>@{item.username}: </span>
                      <span className="font-normal">{item.text} </span>
                      <span className="font-normal text-gray-400">{date}</span>
                    </p>
                    <input
                      type="text"
                      className="mr-5 mt-5 border-2 focus:outline-none focus:border-blue-600"
                      onChange={(event) => {
                        var dada = reply;
                        dada[index] = event.target.value;
                        setReply([...dada]);
                      }}
                      value={reply[index]}
                    />
                    <a href={item.post.permalink}>Пост руу очих</a>
                  </div>
                  <div className="flex">
                    <button
                      className="bg-blue-600 py-2 px-4 rounded-lg text-white text-lg"
                      onClick={() => handleReply(item.id, index)}
                    >
                      reply
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  };
  // 3. Хадгалсан хариулт
  // const savedReply = () => {
  //   return (
  //     <div className="w-full">
  //       <div className="font-bold py-20 text-3xl border-b pl-5">
  //         <p>Хадгалсан хариултууд</p>
  //       </div>
  //       <div className="w-full"></div>
  //     </div>
  //   );
  // };

  return (
    <React.Fragment>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className=" -ml-8">
        <div className="h-full z-20 -mt-14 fixed">{sideBarMenu()}</div>
        <div className=" pl-44 sm:ml-14 h-full ">
          {panelOpened === 0 ? (
            comments(newCommentsData, "Шинээр")
          ) : panelOpened === 1 ? (
            comments(commentsData, "Бүх")
          ) : panelOpened === 2 ? (
            <SavedReply savedData={savedData} />
          ) : (
            ""
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Admin;
