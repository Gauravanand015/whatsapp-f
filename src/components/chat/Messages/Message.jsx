import moment from "moment/moment";
import React from "react";
import { TriangleIcon } from "../../../svg";

function Message({ message, me }) {
  return (
    <div
      className={`w-full flex mt-2 space-x-3 max-w-xs z-10 ${
        me ? "ml-auto justify-end " : ""
      }`}
    >
      {/* container */}
      <div>
        <div
          className={`relative h-full dark:text-dark_text_1 p-2 rounded-lg ${
            me ? "bg-green_3" : "dark:bg-dark_bg_2"
          }`}
        >
          {/* message */}
          <p className="float-left h-full pb-4 pr-8">{message.message}</p>
          {/* message date */}
          <span className="absolute right-1.5 bottom-1.5 text-xs text-dark_text_5 leading-none">
            {moment(message.createdAt).format("HH:MM")}
          </span>
          {!me ? (
            <span>
              <TriangleIcon className="dark:fill-dark_bg_2 rotate-[60deg] absolute top-[-5px] -left-1.5px" />
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Message;
