import React from "react";
import Avatar from "../common/Avatar";
import { useStateProvider } from "@/context/StateContext";
import { BsFillChatLeftTextFill, BsThreeDotsVertical } from "react-icons/bs";
import { reducerCases } from "@/context/constants";

function ChatListHeader() {
  const [{ userInfo }, dispatch] = useStateProvider();

  const handleNewChatClick = () => {
    dispatch({ type: reducerCases.SET_CONTACT_PAGE });
  };
  return (
    <div className="flex items-center justify-between px-4 py-3 h-16">
      <div className="cursor-pointer">
        <Avatar
          size="sm"
          image={userInfo?.profileImage || "/default_avatar.png"}
        />
      </div>
      <div className="flex gap-6">
        <BsFillChatLeftTextFill
          className="text-panel-header-icon cursor-pointer text-xl"
          title="New Chat"
          onClick={handleNewChatClick}
        />
        <BsThreeDotsVertical
          className="text-panel-header-icon cursor-pointer text-xl"
          title="Menu"
        />
      </div>
    </div>
  );
}

export default ChatListHeader;
