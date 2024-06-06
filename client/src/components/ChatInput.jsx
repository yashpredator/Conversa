import React, { useState } from "react";
import { BsSendArrowUpFill } from "react-icons/bs";
import Picker from "emoji-picker-react";
import { MdEmojiEmotions } from "react-icons/md";

function ChatInput({handleSendMsg}) {
  const [msg, setMsg] = useState("");
  const [emojiselected, setEmojiselected] = useState(false);


  const handleEmojiClick = ( emojiObject,event) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };


  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <>
      <div>
        <div className="relative flex flex-col justify-end">
          <form onSubmit={(event) => sendChat(event)}>
            <div className="flex items-center relative">
              <MdEmojiEmotions
                className="h-full text-yellow-200 mr-1 w-8 cursor-pointer"
                onClick={() => setEmojiselected(!emojiselected)}
              />
              <input
                className="h-10 w-full rounded-lg p-2 bg-violet-900 text-white "
                type="text"
                placeholder="type your message here"
                onChange={(e) => setMsg(e.target.value)}
                value={msg}
              />
            </div>
            <button
              type="submit"
              className="absolute right-0 top-0 bottom-0 bg-transparent flex items-center justify-center"
            >
              <BsSendArrowUpFill className="h-full md:w-20 w-10 bg-violet-900 rounded-lg p-1 text-white" />
            </button>
          </form>
          {emojiselected && (
            <div className="absolute bottom-16 ">
              <Picker
                onEmojiClick={handleEmojiClick}
                // Example of disabling search bar
                // CSS not working on emoji picker
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ChatInput;
