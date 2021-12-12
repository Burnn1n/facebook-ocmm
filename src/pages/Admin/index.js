import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Axios from "axios";

const Admin = ({ history }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [posts, setPosts] = useState();
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
  const [title, setTitle] = useState();
  const [reply, setReply] = useState([]);
  const [commentsData, setCommentsData] = useState([]);
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
      setTitle(`Admin(${commentsData.length})`);
      commentsData.map((item, index) => {
        var dada = reply;
        dada.push("");
        setReply([...dada]);
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

  return (
    <React.Fragment>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="mt-10">
        <div className="font-bold p-20">Шинээр ирсэн сэтгэгдлүүд</div>
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
              // item.map((item1, index1) => {
              //   // console.log("map item " + item1.text);
              //   return (
              //     <div key={index1} className="flex p-10">
              //       <div className="font-bold mr-10">
              //         {item.username}:{item1.text}
              //       </div>
              //       <div className="flex">
              //         <input
              //           type="text"
              //           className="mr-5"
              //           onChange={(event) => setReply(event.target.value)}
              //         />
              //         <button
              //           className="bg-blue-600 py-2 px-4 rounded-lg text-white text-lg"
              //           onClick={() => handleReply(item1.id)}
              //         >
              //           reply
              //         </button>
              //       </div>
              //     </div>
              //   );
              // });
            })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Admin;
