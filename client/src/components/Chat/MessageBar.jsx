import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { ADD_MESSAGE_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import React, { useEffect, useRef, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";

function MessageBar() {
  const [{ userInfo, currentChatUser, socket }, dispatch] = useStateProvider();
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setshowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.id !== "Emoji-open") {
        if (
          emojiPickerRef.current &&
          !emojiPickerRef.current.contains(event.target)
        ) {
          setshowEmojiPicker(false);
        }
      }
    };
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleEmojiModel = () => {
    setshowEmojiPicker((prev) => !prev);
  };

  const handleEmojieClick = ({ emoji }) => {
    setMessage((prevMsg) => (prevMsg += emoji));
  };

  const sendMessage = async () => {
    try {
      const { data } = await axios.post(ADD_MESSAGE_ROUTE, {
        message,
        from: userInfo?.id,
        to: currentChatUser?.id,
      });
      setMessage("");

      socket.current.emit("send-msg", {
        message: data.message,
        from: userInfo?.id,
        to: currentChatUser?.id,
      });
      dispatch({
        type: reducerCases.UPDATE_NEW_MESSAGES,
        message: data.message,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-panel-header-background h-20 px-4 flex items-center gap-6 relative">
      <div className="flex gap-6">
        <BsEmojiSmile
          className="text-panel-header-icon cursor-pointer text-xl"
          title="Emoji"
          id="Emoji-open"
          onClick={handleEmojiModel}
        />
        {showEmojiPicker && (
          <div className="absolute bottom-24 left-16 z-40" ref={emojiPickerRef}>
            <EmojiPicker onEmojiClick={handleEmojieClick} theme="dark" />
          </div>
        )}
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
          className="bg-input-background text-sm h-10 w-full py-4 text-white caret-white rounded-lg px-5 focus:outline-none"
        />
      </div>
      <div className="flex w-20 items-center justify-center gap-3">
        <div className="bg-teal-light w-10 h-10 rounded-md flex items-center justify-center text-center">
          <MdSend
            className="text-white cursor-pointer text-xl hover:scale-110"
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
