import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/sidebar/sidebar";
import { useEffect } from "react";
import { getConversation, updateMessage } from "../features/chatSlice";
import WhatsappHome from "../components/chat/Welcome/WhatsappHome";
import MessageHistoryContainer from "../components/chat/messageHistoryContainer";
import SocketContext from "../context/Socket.context";
import { useState } from "react";

const Home = ({ socket }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  const [onlineUser, setOnlineUser] = useState([]);

  //!join user into the socket.io
  useEffect(() => {
    socket.emit("join", user._id);
  }, [user]);

  //!get conversation
  useEffect(() => {
    if (user?.token) {
      dispatch(getConversation(user.token));
    }
  }, [user, dispatch]);

  //! online users
  useEffect(() => {
    socket.on("get-online-user", (onlineUsers) => {
      setOnlineUser(onlineUsers);
    });
  }, [user]);

  //!listening to receive messages
  useEffect(() => {
    const receiveMessageHandler = (message) => {
      console.log("Received message in component:", message);
      dispatch(updateMessage(message));
    };

    socket.on("receive message", receiveMessageHandler);

    return () => {
      // Cleanup: Remove the event listener when the component unmounts
      socket.off("receive message", receiveMessageHandler);
    };
  }, [dispatch]);

  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
      <div className="container flex h-screen py-[19px]">
        {/* sidebar */}
        <Sidebar onlineUser={onlineUser} />
        {activeConversation._id ? (
          <MessageHistoryContainer onlineUser={onlineUser} />
        ) : (
          <WhatsappHome />
        )}
      </div>
    </div>
  );
};

const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default HomeWithSocket;
