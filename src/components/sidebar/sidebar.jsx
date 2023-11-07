import { useState } from "react";
import SidebarHeader from "./header/header";
import Notification from "./notification/notification";
import Search from "./search/search";
import Conversation from "./conversations/conversation";

const Sidebar = () => {
  const [searchResults, setSearchResults] = useState([]);
  return (
    <div className="w-[40%] h-full select-none">
      <SidebarHeader />
      <Notification />
      <Search searchResults={searchResults} />
      <Conversation />
    </div>
  );
};

export default Sidebar;
