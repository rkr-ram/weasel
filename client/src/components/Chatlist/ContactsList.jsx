import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { GET_ALL_CONTACTS_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiArrowBack, BiSearchAlt2 } from "react-icons/bi";
import ChatListItem from "./ChatListItem.jsx";

function ContactsList() {
  const [allContacts, setAllContacts] = useState([]);
  const [{}, dispatch] = useStateProvider();

  useEffect(() => {
    const getAllContacts = async () => {
      try {
        const {
          data: { users },
        } = await axios.get(GET_ALL_CONTACTS_ROUTE);
        setAllContacts(users);
      } catch (error) {
        console.log(error);
      }
    };
    getAllContacts();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="h-20 flex  items-end px-3 py-4">
        <div className="flex items-center gap-12 text-white">
          <BiArrowBack
            className="cursor-pointer text-xl"
            onClick={() => dispatch({ type: reducerCases.SET_CONTACT_PAGE })}
          />
          <span>New Chat</span>
        </div>
        
      </div>
      <div className="bg-search-input-container-background  py-3 px-5 items-center gap-3 h-full overflow-auto custom-scrollBar">
          <div className="bg-panel-header-background flex items-center gap-5 px-3 py-1 rounded-lg flex-grow">
            <div>
              <BiSearchAlt2 className="text-panel-header-icon cursor-pointer text-xl" />
            </div>
            <div>
              <input
                type="text"
                placeholder="Search or start new chat"
                className="text-sm bg-transparent focus:outline-none text-white w-full"
              />
            </div>
          </div>
          {Object.entries(allContacts).map(([initialLetter,userList])=>{
            return (
              <div key={initialLetter}>
                <div className="text-teal-light  pl-8 py-5">{initialLetter}</div>
                {userList.map((contact)=>{
                  return <ChatListItem
                  data={contact}
                  isContactPage={true}
                  key={contact.id}
                  />
                })}
              </div>
            )
          })}
        </div>
    </div>
  );
}

export default ContactsList;
