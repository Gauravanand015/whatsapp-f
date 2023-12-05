import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/sidebar/sidebar";
import { useEffect } from "react";
import { getConversation, updateMessage } from "../features/chatSlice";
import WhatsappHome from "../components/chat/Welcome/WhatsappHome";
import MessageHistoryContainer from "../components/chat/messageHistoryContainer";
import SocketContext from "../context/Socket.context";
import { useState } from "react";
import Call from "../components/chat/call/Call";

const callData = {
  receivingCall: true,
  callEnded: false,
};

const Home = ({ socket }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  const [onlineUser, setOnlineUser] = useState([]);
  const [typing, setTyping] = useState(false);
  const [call, setCall] = useState(callData);
  const { receivingCall, callEnded } = call;
  const [callAccepted, setCallAccepted] = useState(false);

  useEffect(() => {
    //!join user into the socket.io
    socket.emit("join", user._id);
  }, [user]);

  useEffect(() => {
    //!get conversation
    if (user?.token) {
      dispatch(getConversation(user.token));
    }
  }, [user, dispatch]);

  useEffect(() => {
    //! online users
    socket.on("get-online-user", (onlineUsers) => {
      setOnlineUser(onlineUsers);
    });
  }, [user]);

  useEffect(() => {
    //!listening to receive messages
    const receiveMessageHandler = (message) => {
      dispatch(updateMessage(message));
    };
    socket.on("receive message", receiveMessageHandler);

    socket.on("typing", (conversation) => {
      setTyping(conversation);
    });

    socket.on("stop typing", () => {
      setTyping(false);
    });

    return () => {
      // Cleanup: Remove the event listener when the component unmounts
      socket.off("receive message", receiveMessageHandler);
    };
  }, [dispatch]);

  return (
    <>
      <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
        <div className="container flex h-screen py-[19px]">
          {/* sidebar */}
          <Sidebar onlineUser={onlineUser} typing={typing} />
          {activeConversation._id ? (
            <MessageHistoryContainer onlineUser={onlineUser} typing={typing} />
          ) : (
            <WhatsappHome />
          )}
        </div>
      </div>
      {/* // call */}
      <Call call={call} setCall={setCall} callAccepted={callAccepted} />
    </>
  );
};

const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default HomeWithSocket;
