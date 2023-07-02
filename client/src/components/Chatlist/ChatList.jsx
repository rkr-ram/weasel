import React from "react";
import ChatHeader from "../Chat/ChatHeader";
import SearchBar from "./SearchBar";
import List from "./List";

function ChatList() {
  return (
    <div className="flex flex-col bg-panel-header-background max-h-screen z-20">
      <ChatHeader/>
      <SearchBar/>
      <List/>
    </div>
  );
}

export default ChatList;
