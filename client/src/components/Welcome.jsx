import React from 'react'
import { useState,useEffect } from 'react';
import robot from "../assets/robot.gif"
function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect( () => {
    const user=async()=>{
    setUserName(
      await JSON.parse(
        localStorage.getItem("chat-app-user")
      ).username
    )};
    user();
  }, []);
  return (
    <div className="bg-black h-screen flex flex-col">
      <div className="flex justify-center">
        <img src={robot} alt="No robot"/>
      </div>
      <div className="text-white flex justify-center text-3xl font-serif"><p>Hello {userName}! I'm ROBOT 3.0</p> <br/> Please choose a pal to chat </div>
    </div>
  )
}

export default Welcome
