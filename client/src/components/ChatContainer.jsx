import React, { useState, useEffect, useRef } from 'react';
import Logout from './Logout';
import ChatInput from './ChatInput';
import { v4 as uuid4 } from 'uuid';
import axios from 'axios';
import { receiveMessageRoute, sendMessageRoute } from '../utils/ApiRoutes';

function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = JSON.parse(localStorage.getItem('chat-app-user'));
        const response = await axios.post(receiveMessageRoute, {
          from: data._id,
          to: currentChat._id,
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchData();
  }, [currentChat]);

  useEffect(() => {
    const getCurrentUserId = async () => {
      if (currentChat) {
        await JSON.parse(localStorage.getItem('chat-app-user'))._id;
      }
    };
    getCurrentUserId();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    try {
      const userData = JSON.parse(localStorage.getItem('chat-app-user'));
      socket.current.emit('send-msg', {
        from: userData._id,
        to: currentChat._id,
        msg,
      });
      await axios.post(sendMessageRoute, {
        from: userData._id,
        to: currentChat._id,
        message: msg,
      });
      setMessages([...messages, { fromSelf: true, message: msg }]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-receiver', (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="bg-black h-screen flex flex-col">
      <div className="flex flex-row justify-between p-2 bg-slate-400">
        <div className="flex">
          <img
            className="size-12 sm:size-16 rounded-full"
            src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
            alt="No profile avatar"
          />
          <div className="flex flex-col justify-center ml-3 font-serif font-bold text-white">
            {currentChat.username}
          </div>
        </div>
        <div className="flex flex-col justify-center mr-5 sm:mr-10">
          <Logout />
        </div>
      </div>
      <div className="flex-grow bg-black mt-2 overflow-auto sm:mt-0 h-[calc(100vh - 16rem)] sm:h-[calc(100vh - 18rem)] lg:h-[calc(100vh - 20rem)] custom-scrollbar p-5">
        {messages.map((message, index) => (
          <div key={uuid4()} className="text-white mb-8 ">
            {message.fromSelf ? (
              <div className="text-right text-white">
                <span className="bg-blue-500 px-2 py-1 rounded-md">{message.message}</span>
              </div>
            ) : (
              <div className="text-left text-white">
                <span className="bg-gray-600 px-2 py-1 rounded-md">{message.message}</span>
              </div>
            )}
          </div>
        ))}
        <div ref={scrollRef}></div>
      </div>
      <div className="p-2">
        <ChatInput handleSendMsg={handleSendMsg} />
      </div>
    </div>
  );
}

export default ChatContainer;
