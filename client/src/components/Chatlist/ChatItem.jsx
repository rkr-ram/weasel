import React from "react";
import Avatar from "../common/Avatar";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";

function ChatListItem({ data, isContactPage }) {
  const [{ userInfo,currentChatUser },dispatch] = useStateProvider();

  const handleOnClick=()=>{
    dispatch({type:reducerCases.SET_CURRENT_CHAT_USER,user:data});
    dispatch({type:reducerCases.SET_CONTACT_PAGE});
  }

  return (
    <div className="flex items-center cursor-pointer hover:bg-background-default-hover"
    onClick={handleOnClick}>
      <div className="min-w-fit px-5 pt-3 pb-3">
        <Avatar
          size="sm"
          image={data?.profilePicture || "/default_avatar.png"}
        />
      </div>
      <div className="min-h-full flex flex-col justify-center mt-3 pr-2 w-full">
        <div className="flex justify-between">
          <div>
            <span className="text-white">
              {userInfo?.name === data?.name ? "YOU" : data?.name}
            </span>
          </div>
        </div>
        <div className="flex border-b border-conversation-border pb-2 pt-2 pr-2">
          <div className="flex justify-between w-full">
            <span className="text-secondary line-clamp-1 text-sm">{data?.about || "\u00A0"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatListItem;
