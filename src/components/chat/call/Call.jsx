// import { useState } from "react";
// import CallActions from "./CallActions";
// import CallArea from "./CallArea";
// import Header from "./Header";
// import Ringing from "./Ringing";

// const Call = ({
//   call,
//   setCall,
//   callAccepted,
//   userVideo,
//   otherUserVideo,
//   stream,
// }) => {
//   const { receivingCall, callEnded, name, picture } = call;
//   const [showActions, setShowActions] = useState(false);
//   return (
//     <>
//       <div
//         className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[550px] z-10 rounded-2xl overflow-hidden call_bg ${
//           receivingCall && !callAccepted ? "hidden" : ""
//         }`}
//         onMouseOver={() => setShowActions(true)}
//         onMouseOut={() => setShowActions(false)}
//       >
//         {/* container */}
//         <div>
//           <div>
//             {/* header */}
//             <Header />
//             {/* call area */}
//             <CallArea name={name} picture={picture} />
//             {/* call actions */}
//             {showActions ? <CallActions /> : null}
//           </div>
//           <div>
//             {/* Video Streams */}
//             <div>
//               {/* other user video */}
//               <video
//                 ref={otherUserVideo}
//                 playsInline
//                 muted
//                 autoPlay
//                 className="largeVideoCall"
//               ></video>
//             </div>
//             <div>
//               {/* user video */}
//               <video
//                 ref={userVideo}
//                 playsInline
//                 muted
//                 autoPlay
//                 className={`smallVideoCall ${
//                   showActions ? "moveVideoCall" : ""
//                 }`}
//               ></video>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* ringing */}
//       {receivingCall && !callAccepted && (
//         <Ringing call={call} setCall={setCall} />
//       )}
//     </>
//   );
// };

// export default Call;

import { useState } from "react";
import CallActions from "./CallActions";
import CallArea from "./CallArea";
import Header from "./Header";
import Ringing from "./Ringing";

const Call = ({
  call,
  setCall,
  callAccepted,
  userVideo,
  otherUserVideo,
  stream,
  answerUser,
}) => {
  const { receivingCall, callEnded, name, picture } = call;
  const [showActions, setShowActions] = useState(false);

  return (
    <>
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[550px] z-10 rounded-2xl overflow-hidden call_bg ${
          receivingCall && !callAccepted ? "hidden" : ""
        }`}
        onMouseOver={() => setShowActions(true)}
        onMouseOut={() => setShowActions(false)}
      >
        {/* container */}
        <div>
          <div>
            {/* header */}
            <Header />
            {/* call area */}
            <CallArea name={name} picture={picture} />
            {/* call actions */}
            {showActions ? <CallActions /> : null}
          </div>
          <div>
            {/* Video Streams */}
            {callAccepted && !callEnded ? (
              <div>
                {/* other user video */}
                {}
                <video
                  ref={otherUserVideo}
                  playsInline
                  muted
                  autoPlay
                  className="largeVideoCall"
                ></video>
              </div>
            ) : null}
            {stream ? (
              <div>
                {/* user video */}
                <video
                  ref={userVideo}
                  playsInline
                  muted
                  autoPlay
                  className={`smallVideoCall ${
                    showActions ? "moveVideoCall" : ""
                  }`}
                ></video>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {/* ringing */}
      {receivingCall && !callAccepted && (
        <Ringing call={call} setCall={setCall} answerUser={answerUser} />
      )}
    </>
  );
};

export default Call;
