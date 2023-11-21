import React from "react";
import MessageHeader from "./MessageHeader/messageHeader";

function MessageHistoryContainer() {
  return (
    <div className="relative h-full w-full border-l dark:border-l-dark_border_2 select-none overflow-hidden">
      {/* container */}
      <div>
        <MessageHeader />
      </div>
    </div>
  );
}

export default MessageHistoryContainer;
