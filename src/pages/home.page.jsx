import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/sidebar/sidebar";
import { useEffect } from "react";
import { getConversation } from "../features/chatSlice";
import WhatsappHome from "../components/chat/Welcome/WhatsappHome";
import MessageHistoryContainer from "../components/chat/messageHistoryContainer";
import SocketContext from "../context/Socket.context";

const Home = ({ socket }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);

  //join user into the socket.io
  useEffect(() => {
    socket.emit("join", user._id);
  }, [user]);

  //get conversation
  useEffect(() => {
    if (user?.token) {
      dispatch(getConversation(user.token));
    }
  }, [user, dispatch]);
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
      <div className="container flex h-screen py-[19px]">
        {/* sidebar */}
        <Sidebar />
        {activeConversation._id ? (
          <MessageHistoryContainer />
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
