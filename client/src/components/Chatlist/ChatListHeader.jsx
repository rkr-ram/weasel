import React from "react";
import Avatar from "../common/Avatar";
import { useStateProvider } from "@/context/StateContext";
import { BsFillChatLeftTextFill, BsThreeDotsVertical } from "react-icons/bs";

function ChatListHeader() {
  const [{ userInfo }] = useStateProvider();
  return (
    <div className="flex items-center justify-between px-4 py-3 h-16">
      <div className="cursor-pointer">
        <Avatar size="sm" image={userInfo?.profileImage} />
      </div>
      <div className="flex gap-6">
        <BsFillChatLeftTextFill className="text-panel-header-icon cursor-pointer text-xl" title="New Chat"/>
        <BsThreeDotsVertical className="text-panel-header-icon cursor-pointer text-xl" title="Menu"/>
      </div>
    </div>
  );
}

export default ChatListHeader;
