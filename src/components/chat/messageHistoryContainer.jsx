import React, { Fragment, useEffect } from "react";
import MessageHeader from "./MessageHeader/messageHeader";
import ChatMessages from "./Messages/chatMessages";
import { useDispatch, useSelector } from "react-redux";
import { getConversationMessages } from "../../features/chatSlice";
import ChatActions from "./Actions/ChatActions";
import FilePreview from "./Preview/Files/FilePreview";

function MessageHistoryContainer({ onlineUser, typing, callUser }) {
  const disPatch = useDispatch();
  const { activeConversation, files } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const { token } = user;
  const values = {
    token,
    convo_id: activeConversation?._id,
  };
  useEffect(() => {
    if (activeConversation?._id) {
      disPatch(getConversationMessages(values));
    }
  }, [activeConversation, disPatch]);

  return (
    <div className="relative h-full w-full border-l dark:border-l-dark_border_2 select-none overflow-hidden">
      {/* container */}
      <div>
        {/* chatHeader */}
        <MessageHeader onlineUser={onlineUser} callUser={callUser} />

        {files.length > 0 ? (
          <FilePreview />
        ) : (
          <>
            <ChatMessages typing={typing} />
            <ChatActions />
          </>
        )}
      </div>
    </div>
  );
}

export default MessageHistoryContainer;
