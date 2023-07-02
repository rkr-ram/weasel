import React from "react";
import { useStateProvider } from "@/context/StateContext";

function ChatHeader() {
  const [{ userInfo }] = useStateProvider();
  return (
    <div></div>
  );
}

export default ChatHeader;
