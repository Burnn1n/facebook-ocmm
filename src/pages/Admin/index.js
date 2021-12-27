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
import Replied from "./Replied";
import dateConverter from "../../Util/DateConverter";
import SideBarMenu from "../../components/Layouts/SideBar";

const Admin = ({ history }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [posts, setPosts] = useState();
  const [savedData, setSavedData] = useState();
  const [repliedData, setRepliedData] = useState();
  const [panelOpened, setPanelOpened] = useState(0);
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
  // url - r дамжуулан admin дотор хуудас дамжина
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
  const [commentsData, setCommentsData] = useState([]);
  const [newCommentsData, setNewCommentsData] = useState([]);
  const [repliedIds, setRepliedIds] = useState([]);

  // Sparta-г ашиглан хариулсан хариултуудыг агуулсан бүртгэлийн array
  const [didReplyData, setDidReplyData] = useState();
  useEffect(() => {
    Axios.post("http://localhost:3001/getDidReply", {
      id: 0,
    }).then((response) => {
      setDidReplyData(response.data);
    });
  }, []);

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
  // Хаяг-д ирсэн бүх сэтгэгдлүүдийг авсны дараа
  useEffect(() => {
    if (commentsData) {
      //console.log("comments-data", commentsData);
      commentsData.map((item, index) => {
        // нийт reply-н тоо нь сэтгэгдлүүдийн тоотой адил байна
        var dada = reply;
        dada.push("");
        setReply([...dada]);

        // Хэрэглэгчийн бүртгүүлсэн огноог аван түүнээс хойш ирсэн сэтгэгдлүүдийг шинэ сэтгэгдэл рүү оруулах
        const userAccountDate = new Date(user.reg_date);
        const deadline = userAccountDate.getTime();
        //console.log("deadline - ", deadline);
        //const deadline = 1639324209019;
        const commentTime = +new Date(item.timestamp);

        //Шинээр ирсэн сэтгэгдлүүдэд хариулсан эсэхийг шалгах
        var doesExist = false;
        didReplyData.map((item1, index1) => {
          if (item.id == item1.commentId) {
            doesExist = true;
          }
        });
        //Хэрэв хариулсан бол Шинээр ирсэн сэтгэгдлүүд рүү оруулахгүй
        if (deadline < commentTime && doesExist == false) {
          var dd = newCommentsData;
          if (!dd.includes(item)) {
            dd.push(item);
            setNewCommentsData([...dd]);
          }
        }

        //Автоматаар хариулах
        var didReply = false; //Өмнө нь хариулж байсан эсэх
        // Өгөгдлийн сангаас хариулсан эсэхийг лавлах
        repliedData &&
          repliedData.map((item2) => {
            //Өмнө нь хариулж байсан
            if (item2.commendId === item.id) {
              didReply = true;
            }
          });
        // Өмнө нь автоматаар хариулж байгаагүй тул хариулах гэж байна
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
                  //Хариулсны дараа бүртгэн авах
                  Axios.post("http://localhost:3001/setDidReply", {
                    commentId: item.id,
                    repliedText: item1.replyText,
                  }).then((response) => {
                    console.log("response - ", response);
                  });
                });
              }
            }
          });
      });
    }
  }, [commentsData]);
  const handleReply = (commentId, index) => {
    const replyText = reply[index];
    Axios.post(`https://graph.facebook.com/v5.0/${commentId}/replies`, {
      message: reply[index],
      access_token: user?.access_token,
    }).then((response) => {
      //console.log(response);
      //СэтгэгдэлД хариулсны дараа бүртгэж авах
      Axios.post("http://localhost:3001/setDidReply", {
        commentId: commentId,
        repliedText: replyText,
      }).then((response) => {
        console.log("response - ", response);
      });
    });

    var dada = reply;
    dada[index] = "Амжилттай";
    setReply([...dada]);
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
              var date = dateConverter(now, item.timestamp);

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
        <div className="h-full z-20 -mt-14 fixed">
          <SideBarMenu />
        </div>
        <div className=" pl-44 sm:ml-14 h-full ">
          {panelOpened === 0 ? (
            comments(newCommentsData, "Шинээр")
          ) : panelOpened === 1 ? (
            comments(commentsData, "Бүх")
          ) : panelOpened === 2 ? (
            <SavedReply savedData={savedData} />
          ) : panelOpened === 3 ? (
            <Replied commentsData={commentsData} repliedData={didReplyData} />
          ) : (
            ""
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Admin;
