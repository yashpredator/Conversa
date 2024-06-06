import React, { useEffect, useState } from "react";
import slim from "../assets/slim.jpg";
import { Navigate, useNavigate } from "react-router-dom";
const Contacts = ({contacts,changeChat}) => {
    const navigate=useNavigate();
    // console.log(contacts);
  const cont = [
    {
      src: slim,
      username: "Slim Shady",
    },
    {
      src: slim,
      username: "Slim Shady",
    },
    {
      src: slim,
      username: "Slim Shady",
    },
    {
      src: slim,
      username: "Slim Shady",
    },
    {
      src: slim,
      username: "Slim Shady",
    },
    {
      src: slim,
      username: "Slim Shady",
    },
    {
      src: slim,
      username: "Slim Shady",
    },
    {
      src: slim,
      username: "Slim Shady",
    },
    {
      src: slim,
      username: "Slim Shady",
    },
    {
      src: slim,
      username: "Slim Shady",
    },
    {
      src: slim,
      username: "Slim Shady",
    },
    {
      src: slim,
      username: "Slim Shady",
    },
    {
      src: slim,
      username: "Slim Shady",
    },
  ];

  const [currentUserName,setCurrentUserName]=useState(undefined);
  const [currentUserImage,setCurrentUserImage]=useState(undefined);
  const [currentSelected,setCurrentSelected]=useState(undefined);

  useEffect(()=>{
    const fetchfromls=async()=>{
        const data=await JSON.parse(localStorage.getItem("chat-app-user"));
        if(!data) navigate("/login");
        setCurrentUserName(data.username);
        setCurrentUserImage(data.avatarImage);
    }
    fetchfromls();
  },[]);

  const changeCurrentChat=(i,data)=>{
    setCurrentSelected(i);
    changeChat(data);
  }

  return (
    <>
        {currentUserName && (
            <div>
            <div className=" flex flex-col bg-violet-900 rounded-t-lg">
              <div className="w-full p-6 border-b-8 bg-violet-800 text-white font-extrabold flex justify-center border-orange-600">
                CONVERSA
              </div>
              <div className="flex flex-col overflow-auto h-[545px] custom-scrollbar">
                {contacts.map((data, i) => (
                  <div className="flex flex-row bg-black p-2 rounded-lg mb-3" key={i} onClick={()=>changeCurrentChat(i,data)}>
                    <div className="size-16 mr-4">
                      <img className="rounded-full" src={`data:image/svg+xml;base64,${data.avatarImage}`} alt="No slim" />
                    </div>
                    <div className="flex flex-col justify-center font-serif font-semibold text-orange-600">
                      {data.username}
                    </div>
                  </div>
                ))}
              </div>
              <div className="font-serif font-extrabold text-green-300 flex justify-center p-10">
                {currentUserName}
              </div>
            </div>
      
            {/* Custom CSS for scrollbar styling */}
            <style jsx>{`
              .custom-scrollbar::-webkit-scrollbar {
                width: 6px; /* Width of the scrollbar */
              }
      
              .custom-scrollbar::-webkit-scrollbar-track {
                background: transparent; /* Background color of the scrollbar track */
              }
      
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: purple; /* Color of the scrollbar handle */
                border-radius: 3px; /* Border radius of the scrollbar handle */
              }
            `}</style>
          </div>
        )}
    </>
  );
};

export default Contacts;
