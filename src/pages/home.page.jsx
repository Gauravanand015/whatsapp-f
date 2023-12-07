import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/sidebar/sidebar";
import { useEffect, useRef } from "react";
import { getConversation, updateMessage } from "../features/chatSlice";
import WhatsappHome from "../components/chat/Welcome/WhatsappHome";
import MessageHistoryContainer from "../components/chat/messageHistoryContainer";
import SocketContext from "../context/Socket.context";
import { useState } from "react";
import Call from "../components/chat/call/Call";
import {
  getConversationId,
  getConversationName,
  getConversationPicture,
} from "../utils/chat";
import Peer from "simple-peer";

const callData = {
  socketId: "",
  receivingCall: false,
  callEnded: false,
  name: "",
  picture: "",
};

const Home = ({ socket }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  const [onlineUser, setOnlineUser] = useState([]);
  const [typing, setTyping] = useState(false);
  const [call, setCall] = useState(callData);
  const [stream, setStream] = useState();
  const { receivingCall, callEnded, socketId } = call;
  const [callAccepted, setCallAccepted] = useState(false);
  const [show, setShow] = useState(false);
  const userVideo = useRef();
  const otherUserVideo = useRef();
  const connectionRef = useRef();

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

  // video Stream
  useEffect(() => {
    setUpMedia();
    socket.on("setup socket", (id) => {
      setCall({ ...call, socketId: id });
    });
    socket.on("call user", (data) => {
      setCall({
        ...call,
        socketId: data.from,
        name: data.name,
        picture: data.picture,
        signal: data.signal,
        receivingCall: true,
      });
    });
  }, []);

  // * #################################################################

  // call user function
  const callUser = () => {
    // enableMedia();
    // setCall({
    //   ...call,
    //   name: getConversationName(user, activeConversation.users),
    //   picture: getConversationPicture(user, activeConversation.users),
    // });

    // //! open channel between two window
    // const peer = new Peer({
    //   initiator: true,
    //   trickle: false,
    //   stream: stream,
    // });

    // //! letting other users know that someone is calling and send some information of the calling user to other user
    // peer.on("signal", (data) => {
    //   socket.emit("call user", {
    //     userToCall: getConversationId(user, activeConversation.users),
    //     signal: data,
    //     from: socketId,
    //     name: user.name,
    //     picture: user.picture,
    //   });
    // });

    // peer.on("stream", (stream) => {
    //   otherUserVideo.current.srcObject = stream;
    // });

    // socket.on("call accepted", (signal) => {
    //   setCallAccepted(true);
    //   peer.signal(signal);
    // });

    // connectionRef.current = peer;

    enableMedia();
    setCall({
      ...call,
      name: getConversationName(user, activeConversation.users),
      picture: getConversationPicture(user, activeConversation.users),
    });
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("call user", {
        userToCall: getConversationId(user, activeConversation.users),
        signal: data,
        from: socketId,
        name: user.name,
        picture: user.picture,
      });
    });
    peer.on("stream", (stream) => {
      otherUserVideo.current.srcObject = stream;
    });
    socket.on("call accepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
    connectionRef.current = peer;
  };

  // answer user function
  const answerUser = () => {
    enableMedia();
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answer call", { signal: data, to: call.socketId });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const setUpMedia = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
      })
      .catch((error) => {
        console.error("Error getting media:", error);
      });
  };

  const enableMedia = () => {
    if (userVideo.current) {
      console.log("User video enabled");
      userVideo.current.srcObject = stream;
    } else if (otherUserVideo.current) {
      console.log("OTHER VIDEO CURRENt");
      otherUserVideo.current.srcObject = stream;
    } else {
      throw new Error("Error in enabling media");
    }
  };

  return (
    <>
      <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
        <div className="container flex h-screen py-[19px]">
          {/* sidebar */}
          <Sidebar onlineUser={onlineUser} typing={typing} />
          {activeConversation._id ? (
            <MessageHistoryContainer
              onlineUser={onlineUser}
              typing={typing}
              callUser={callUser}
            />
          ) : (
            <WhatsappHome />
          )}
        </div>
      </div>
      {/* // call */}
      <Call
        call={call}
        setCall={setCall}
        callAccepted={callAccepted}
        userVideo={userVideo}
        otherUserVideo={otherUserVideo}
        stream={stream}
        answerUser={answerUser}
      />
    </>
  );
};

const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default HomeWithSocket;
