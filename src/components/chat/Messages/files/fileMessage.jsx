import moment from "moment/moment";
import { TriangleIcon } from "../../../../svg";
import FileImageAndVideo from "./fileImageAndVideo";
import OtherFiles from "./otherFiles";

function FileMessage({ fileMessage, message, me }) {
  const { file, type } = fileMessage;

  return (
    <div
      className={`w-full flex mt-2 space-x-3 max-w-xs ${
        me ? "ml-auto justify-end " : ""
      }`}
    >
      {/*Message Container*/}
      <div className="relative">
        {/* sender user message */}
        {!me && message.conversation.isGroup && (
          <div className="absolute top-0.5 left-[-37px]">
            <img
              src={message.sender.picture}
              alt=""
              className="w-8 h-8 rounded-full"
            />
          </div>
        )}
        <div
          className={`relative h-full dark:text-dark_text_1 rounded-lg pr-2 pl-2 pt-1
        ${me ? "bg-green_3" : "dark:bg-dark_bg_2"}
        `}
        >
          {/*Message*/}
          <p className="float-left h-full text-sm pb-1">
            {fileMessage.type === "image" || fileMessage.type === "video" ? (
              <FileImageAndVideo url={file.secure_url} type={type} />
            ) : (
              <OtherFiles file={file} type={type} />
            )}
          </p>
          {/*Message Date*/}
          <span className="absolute right-1.5 bottom-1.5 text-xs text-dark_text_5 leading-none">
            {moment(message.createdAt).format("HH:mm")}
          </span>
          {/*Triangle*/}
          {!me ? (
            <span>
              <TriangleIcon className="dark:fill-dark_bg_2 rotate-[60deg] absolute top-[-5px] -left-1.5" />
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default FileMessage;
