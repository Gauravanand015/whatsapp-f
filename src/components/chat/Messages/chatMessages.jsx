import { useSelector } from "react-redux";
import Message from "./Message";
import { useEffect, useRef } from "react";

function ChatMessages() {
  const { user } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.chat);
  const endRef = useRef();

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="mb-[60px] bg-[url('https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358270/Untitled-1_copy_rpx8yb.jpg')] bg-cover bg-no-repeat">
      {/* container */}
      <div className="scrollbar overflow_scrollbar overflow-auto py-2 px-[6%]">
        {/* messages */}
        {console.log("Messages here:", messages)}
        {messages &&
          messages.map((message) => (
            <Message
              message={message}
              key={message._id}
              me={user._id === message.sender._id}
            />
          ))}
        <div ref={endRef}></div>
      </div>
    </div>
  );
}

export default ChatMessages;
