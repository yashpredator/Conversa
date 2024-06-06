import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Contacts from "../components/Contacts";
import ChatContainer from "../components/ChatContainer";
import Logout from "../components/Logout";
import Welcome from "../components/Welcome";
import {allUsersRoute,host} from "../utils/ApiRoutes"
import axios from "axios";
import {io} from "socket.io-client"

export default function Chat() {
  const navigate = useNavigate();
  const [contacts,setContacts]=useState([]);
  const [currentChat,setCurrentChat]=useState(undefined);
  const [currentUser,setCurrentUser]=useState(undefined);
  const socket= useRef();
  useEffect(() => {
    const settingUser=async()=>{
      if (!localStorage.getItem("chat-app-user")) navigate("/login");
      else{
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        // console.log(5)   
      }
    }
    settingUser();
  }, []);

  useEffect(()=>{
    if(currentUser){
      socket.current =io(host);
      socket.current.emit("add-user",currentUser._id);
    }
  },[currentUser])

    useEffect(()=>{
      const checkavatar=async()=>{
        // if(currentUser.username===undefined) 
        // console.log(5);
        if(currentUser){
          if (currentUser.isAvatarImageSet) {
            const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
            // console.log(data);
            setContacts(data.data);
          } else {
            navigate("/setAvatar");
          }
        }
      }
      checkavatar();
    },[currentUser]);

    const handleChatChange = (chat) => {
      setCurrentChat(chat);
    };
    // console.log(currentChat);
  return (
    <>
      <div className="flex flex-row bg-black">
        <div className="w-1/4">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
        </div>
        
        <div className="w-3/4">
        {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </div>
      
    </>
  );
}
