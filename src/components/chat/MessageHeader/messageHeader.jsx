import { useSelector } from "react-redux";
import { DotsIcon, SearchLargeIcon } from "../../../svg";
import { Capitalize } from "../../../utils/string";
import { checkOnlineUsers } from "../../../utils/chat";

function MessageHeader({ onlineUser }) {
  const { activeConversation } = useSelector((state) => state.chat);
  const { name, picture } = activeConversation;
  const { user } = useSelector((state) => state.user);
  return (
    <div className="h-[59px] dark:bg-dark_bg_2 flex items-center p16 select-none">
      {/* container */}
      <div className="w-full flex items-center justify-between">
        {/* Left side in header */}
        <div className="flex item-center gap-x-4">
          {/* container image */}
          <button className="btn">
            <img
              src={picture}
              alt={`${name}`}
              className="w-full h-full rounded-full object-cover"
            />
          </button>
          {/* conversation name and online status */}
          <div className="flex flex-col">
            <h1 className="dark:text-white text-md font-bold">
              {Capitalize(name.split(" ")[0])}
            </h1>
            <span className="text-xs dark:text-dark_svg_2">
              {checkOnlineUsers(onlineUser, user, activeConversation.users)
                ? "online"
                : ""}
            </span>
          </div>
        </div>

        {/* Right side in header */}
        <div className="flex items-center gap-x-4">
          <ul className="flex item-center gap-x-2.5">
            <li>
              <button className="btn">
                <SearchLargeIcon className="dark:fill-dark_svg_1" />
              </button>
            </li>

            <li>
              <button className="btn">
                <DotsIcon className="dark:fill-dark_svg_1" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MessageHeader;
