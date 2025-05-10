import React, { useState, useRef, useEffect } from "react";
import { useStateProvider } from "@/context/StateContext";
import { calculateTime } from "@/utils/CalculateTime";
import MessageStatus from "../common/MessageStatus";
import ImageMessage from "./ImageMessage";
import dynamic from "next/dynamic";

const VoiceMessage = dynamic(import("./VoiceMessage"), { ssr: false });

function ChatContainer() {
  const [{ messages, currentChatUser, userInfo }, dispatch] = useStateProvider();
  const [message, setMessage] = useState(""); // User input message
  const [selectedMessage, setSelectedMessage] = useState(null); // To track the selected message
  const [showOptions, setShowOptions] = useState(false); // To toggle reply and delete options
  const containerRef = useRef(null); // Ref for scroll container
  const bottomRef = useRef(null); // Ref for scroll to bottom

  // Scroll to bottom when a new message arrives
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleDoubleClick = (message) => {
    setSelectedMessage(message); // Set the selected message
    setShowOptions(true); // Show reply and delete options
  };

  const handleDelete = async () => {
    try {
      // Call API to delete the message here
      await axios.delete(`/api/messages/${selectedMessage.id}`); // API call for delete
      dispatch({ type: "DELETE_MESSAGE", messageId: selectedMessage.id }); // Dispatch action to remove message from state
      setShowOptions(false); // Hide options after delete
    } catch (error) {
      console.error("Error deleting message", error);
    }
  };

  const handleReply = () => {
    setMessage(`Replying to: ${selectedMessage.message}`); // Set the reply message
    setShowOptions(false); // Hide options after reply
  };

  const sendMessage = async () => {
    try {
      const { data } = await axios.post(ADD_MESSAGE_ROUTE, {
        to: currentChatUser?.id,
        from: userInfo?.id,
        message,
      });

      socket.current.emit("send-msg", {
        to: currentChatUser?.id,
        from: userInfo?.id,
        message: data.message,
      });

      dispatch({
        type: reducerCases.ADD_MESSAGE,
        newMessage: {
          ...data.message,
        },
        fromSelf: true,
      });

      setMessage(""); // Reset input field
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-[80vh] w-full relative flex-grow overflow-auto custom-scrollbar" ref={containerRef}>
      <div className="bg-chat-background bg-fixed h-full w-full opacity-5 fixed"></div>
      <div className="mx-10 my-6 relative bottom-0 z-40 left-0">
        <div className="flex w-full">
          <div className="flex flex-col justify-end w-full gap-1 overflow-auto">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${
                  message.senderId === currentChatUser.id ? "justify-start" : "justify-end"
                }`}
                //onDoubleClick={() => handleDoubleClick(message)} // Double click to show options
              >
                {message.type === "text" && (
                  <div
                    className={`text-white chat-bubble px-2 py-[5px] text-sm rounded-md flex gap-2 items-end max-w-[45%] ${
                      message.senderId === currentChatUser.id ? "bg-incoming-background" : "bg-outgoing-background"
                    }`}
                  >
                    <span className="break-all">{message.message}</span>
                    <div className="flex gap-1 items-end">
                      <span className="text-bubble-meta text-[11px] pt-1 min-w-fit">
                        {calculateTime(message.createdAt)}
                      </span>
                      {message.senderId === userInfo.id && (
                        <MessageStatus messageStatus={message.messageStatus} />
                      )}
                    </div>
                  </div>
                )}
                {message.type === "audio" && <VoiceMessage message={message} />}
                {message.type === "image" && <ImageMessage message={message} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Options menu for reply and delete */}
      {showOptions && selectedMessage && (
        <div className="absolute bottom-16 left-10 bg-white p-4 rounded-md shadow-lg z-50">
          <button onClick={handleReply} className="block mb-2">
            Reply
          </button>
          <button onClick={handleDelete} className="block text-red-600">
            Delete
          </button>
        </div>
      )}

      {/* Scroll-to-bottom element */}
      <div ref={bottomRef} />
    </div>
  );
}

export default ChatContainer;
