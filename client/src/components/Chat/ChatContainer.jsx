import React from "react";

function ChatContainer() {
  return <div className="h-[80vh] w-full relative flex-grow overflow-auto custom-scrollBar">
    <div className="bg-chat-background h-full w-full bg-fixed opacity-5 fixed top-0 left-0"></div>
    <div className="flex w-full">
      <div className="flex flex-col justify-end gap-1 w-full"></div>
    </div>
  </div>;
}

export default ChatContainer;
