import React, { useEffect, useState } from "react";
import { useStateProvider } from "@/context/StateContext";
import Avatar from "../common/Avatar";
import { MdCall } from "react-icons/md";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";

function ChatHeader() {
  const [{ userInfo, currentChatUser,socket }] = useStateProvider();
  const checkLogginUserChat = userInfo?.name === currentChatUser?.name;
  const [onlineStatus, setOnlineStatus] = useState("")

  useEffect(() => {
  console.log(socket)

    socket.current.emit("send-user", {
      to: currentChatUser?.id,
    });
    socket.current.on("getOnlineStatus",(data)=>{
      console.log(data,"data")
      setOnlineStatus(data.status)

    })
  }, [currentChatUser]);

  return (
    <div className="h-16 px-4 py-3 flex justify-between items-center bg-panel-header-background z-10">
      <div className="flex items-center justify-center gap-6">
        <Avatar
          size="sm"
          image={currentChatUser?.profilePicture || "/default_avatar.png"}
        />
        <div className="flex flex-col">
          <span className="text-primary-strong">
            {checkLogginUserChat ? "YOU" : currentChatUser?.name}
          </span>
          <span className="text-secondary text-sm">
            {onlineStatus}
          </span>
        </div>
      </div>
      <div className="flex gap-6">
        <MdCall className="text-panel-header-icon cursor-pointer text-xl" />
        <BiSearchAlt2 className="text-panel-header-icon cursor-pointer text-xl" />
        <BsThreeDotsVertical className="text-panel-header-icon cursor-pointer text-xl" />
      </div>
    </div>
  );
}

export default ChatHeader;
