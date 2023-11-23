import { useSelector } from "react-redux";
import Conversations from "./conversations";

export default function Conversation() {
  const { conversation, activeConversation } = useSelector(
    (state) => state.chat
  );
  return (
    <div className="convos scrollbar">
      <ul>
        {conversation &&
          conversation
            .filter((c) => c.latestMessage || c._id === activeConversation._id)
            .map((conversation) => (
              <Conversations
                conversation={conversation}
                key={conversation._id}
              />
            ))}
      </ul>
    </div>
  );
}
