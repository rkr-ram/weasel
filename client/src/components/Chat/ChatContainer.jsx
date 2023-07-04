import { useStateProvider } from "@/context/StateContext";
import { calculateTime } from "@/utils/CalculateTime";
import React, { useEffect, useRef, useState } from "react";
import MessageStatus from "../common/MessageStatus";
import Image from "next/image";
import { BsArrowDownCircleFill } from "react-icons/bs";

function ChatContainer() {
  const [{ messages, userInfo, currentChatUser }] = useStateProvider();
  const [showArrowDown, setArrowDown] = useState(true);
  const scrollRef = useRef(null);

  const handleScrollDown = () => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };

  useEffect(() => {
    scrollRef.current.addEventListener("scroll", () => {
      scrollRef.current.scrollHeight ===
      scrollRef.current.scrollTop + scrollRef.current.clientHeight
        ? setArrowDown(false)
        : setArrowDown(true);
    });
   
  }, []);

  return (
    <div
      className="h-[80vh] w-full relative flex-grow overflow-auto custom-scrollBar"
      ref={scrollRef}
    >
      <Image
        src="/itachis-bg.webp"
        width={955}
        height={500}
        className="bg-fixed fixed bg-no-repeat"
      />
      <div className="mx-10 my-6 relative bottom-0 z-40 left-0 ">
        <div className="flex w-full">
          <div className="flex flex-col justify-end gap-1 w-full">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.senderId === currentChatUser.id
                    ? "justify-start"
                    : "justify-end"
                }`}
              >
                {message.type === "text" && (
                  <div
                    className={`text-white px-2 py-[5px] text-sm rounded-md flex gap-2 items-end max-w-[45%] min-w-[10%] ${
                      message.senderId === currentChatUser.id
                        ? "bg-incoming-background"
                        : "bg-outgoing-background"
                    }`}
                  >
                    <span className="break-all">{message.message}</span>
                    <div className="flex gap-1 items-end">
                      <span className="text-bubble-meta text-[11px] pt-1 min-w-fit">
                        {calculateTime(message.createdAt)}
                      </span>
                      <span>
                        {message.senderId === userInfo.id && (
                          <MessageStatus
                            messageStatus={message.messageStatus}
                          />
                        )}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {showArrowDown && (
        <div
          className="z-50 fixed bottom-[15%] right-5 cursor-pointers "
          onClick={handleScrollDown}
        >
          <BsArrowDownCircleFill className="text-panel-header-icon cursor-pointer text-2xl hover:text-teal-50" />
        </div>
      )}
    </div>
  );
}

export default ChatContainer;
