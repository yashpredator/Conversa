import React, { useState,useEffect } from "react";
import avt from "../assets/slim.jpg";
import loader from "../assets/loading.webp";
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Buffer} from "buffer"
import {setAvatarRoute} from "../utils/ApiRoutes";

const SetAvatar = () => {
  const api=`https://api.multiavatar.com/4645646`;

  const navigate= useNavigate();

  const avatpic = [
    { src: avt },
    { src: avt },
    { src: avt },
    { src: avt },
    { src: avt },
  ];

  const [avatar,setAvatar]=useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [selectedavatar, setSelectedavatar] = useState(null);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

// Use effect to check if user is active login agar vo 
// bahot der baad chat app khole to
  useEffect(()=>{
    if(!localStorage.getItem("chat-app-user"))
      navigate("/login");
  },[]);

  // To fetch data everytime when page is reload
  useEffect(() => {
    const fetchData = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatar(data);
      setisLoading(false);
    };

    fetchData();
  }, [api]);

  const setProfilePicture = async() => {
    if(selectedavatar==null) toast.error("Please select an avatar",toastOptions);
    else{
      const user= await JSON.parse(localStorage.getItem("chat-app-user"));
      const {data}= await axios.post(`${setAvatarRoute}/${user._id}`,{
        image:avatar[selectedavatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user",JSON.stringify(user));
        navigate("/chat");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };
  // setTimeout(()=>{
  //   setisLoading(false);

  // },2000)
  return (
    <>
      {isLoading ? (
        <img className="h-screen" src={loader} alt="loading" />
      ) : (
        <>
        <div className="flex items-center justify-center bg-slate-500 h-screen">
          <div className="flex flex-col p-16">
            <div className="mx-auto text-2xl text-black font-extrabold font-serif mb-16">
              Choose the avatar
            </div>
            <div className="mb-12">
              <div className="flex justify-evenly flex-wrap gap-4">
                {" "}
                {/* Added gap-4 to add space between images */}
                {avatar.slice(0, 4).map((avatar, i) => (
                  <img
                    key={i}
                    onClick={() => setSelectedavatar(i)}
                    className={`h-28 rounded-full cursor-pointer ${
                      selectedavatar === i ? "border-4 border-red-500" : ""
                    }`}
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="No avatar"
                  /> 
                ))}
              </div>
            </div>
            <div className="mx-auto">
              <button 
                type="submit"
                onClick={setProfilePicture}
                className="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
              >
                Set the avatar
              </button>
            </div>
          </div>
        </div>
        <ToastContainer/>
        </>
      )}
    </>
  );
};

export default SetAvatar;
