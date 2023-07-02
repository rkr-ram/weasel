import { useStateProvider } from "@/context/StateContext";
import { ADD_MESSAGE_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import React, { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";

function MessageBar() {
  const [{ userInfo, currentChatUser }] = useStateProvider();
  const [message, setMessage] = useState("");

  const sendMessage = async()=>{
    try {
      const {data} =await axios.post(ADD_MESSAGE_ROUTE,{
        message,
        from:userInfo?.id,
        to:currentChatUser?.id
      }) 
      setMessage("")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="bg-panel-header-background h-20 px-4 flex items-center gap-6 relative">
      <div className="flex gap-6">
        <BsEmojiSmile
          className="text-panel-header-icon cursor-pointer text-xl"
          title="Emoji"
        />
        <ImAttachment
          className="text-panel-header-icon cursor-pointer text-xl"
          title="Attach File"
        />
      </div>
      <div className="w-full rounded-lg h-10 items-center">
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={({ target: { value } }) => setMessage(value)}
          className="bg-input-background text-sm h-10 w-full py-4 caret-white rounded-lg px-5 focus:outline-none"
        />
      </div>
      <div className="flex w-20 items-center justify-center gap-3">
        <div className="bg-teal-light w-10 h-10 rounded-md flex items-center justify-center text-center">
          <MdSend
            className="text-white cursor-pointer text-xl"
            title="Send Messsage"
            onClick={sendMessage}
          />
        </div>
        <FaMicrophone
          className="text-panel-header-icon cursor-pointer text-xl"
          title="Record"
        />
      </div>
    </div>
  );
}

export default MessageBar;
