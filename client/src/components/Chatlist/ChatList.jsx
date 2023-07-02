import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import List from "./List";
import ChatListHeader from "./ChatListHeader";
import { useStateProvider } from "@/context/StateContext";
import ContactsList from "./ContactsList";

function ChatList() {
  const [{ contactpage }] = useStateProvider();
  const [pageType, setPageType] = useState("default");

  useEffect(() => {
    contactpage ? setPageType("contact-page") : setPageType("default");
  }, [contactpage]);
  return (
    <div className="flex flex-col bg-panel-header-background max-h-screen z-20">
      {pageType === "default" && (
        <>
          <ChatListHeader />
          <SearchBar />
          <List />
        </>
      )}
      {pageType === "contact-page" && <ContactsList/>}
    </div>
  );
}

export default ChatList;
