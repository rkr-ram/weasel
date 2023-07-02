import React from "react";
import SearchBar from "./SearchBar";
import List from "./List";
import ChatListHeader from "./ChatListHeader";

function ChatList() {
  return (
    <div className="flex flex-col bg-panel-header-background max-h-screen z-20">
      <ChatListHeader/>
      <SearchBar/>
      <List/>
    </div>
  );
}

export default ChatList;
