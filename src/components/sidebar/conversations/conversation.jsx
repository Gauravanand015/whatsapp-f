import { useSelector } from "react-redux";
import Conversations from "./conversations";
import { getConversationId } from "../../../utils/chat";

export default function Conversation({ onlineUser }) {
  const { conversations, activeConversation } = useSelector(
    (state) => state.chat
  );

  const { user } = useSelector((state) => state.user);

  return (
    <div className="convos scrollbar">
      <ul>
        {conversations &&
          conversations
            .filter((c) => c.latestMessage || c._id === activeConversation._id)
            .map((conversation) => {
              let check = onlineUser.find(
                (u) => u.userId === getConversationId(user, conversation.users)
              );
              return (
                <Conversations
                  conversation={conversation}
                  key={conversation._id}
                  check={check ? true : false}
                />
              );
            })}
      </ul>
    </div>
  );
}
