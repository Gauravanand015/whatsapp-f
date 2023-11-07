import { useSelector } from "react-redux";
import Conversations from "./conversations";

export default function Conversation() {
  const { conversation } = useSelector((state) => state.chat);
  return (
    <div className="convos scrollbar">
      <ul>
        {conversation &&
          conversation.map((conversation, index) => (
            <Conversations conversation={conversation} key={conversation._id} />
          ))}
      </ul>
    </div>
  );
}
