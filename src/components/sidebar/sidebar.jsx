import { useState } from "react";
import SidebarHeader from "./header/header";
import Notification from "./notification/notification";
import Search from "./search/search";
import Conversation from "./conversations/conversation";
import SearchResults from "./search/SearchResults";

const Sidebar = ({ onlineUser }) => {
  const [searchResults, setSearchResults] = useState([]);
  return (
    <div className="flex0030 max-w-[30%] h-full select-none">
      <SidebarHeader />
      <Notification />
      <Search
        searchResults={searchResults}
        setSearchResults={setSearchResults}
      />
      {searchResults.length > 0 ? (
        <>
          <SearchResults
            searchResults={searchResults}
            setSearchResults={setSearchResults}
          />
        </>
      ) : (
        <Conversation onlineUser={onlineUser} />
      )}
    </div>
  );
};

export default Sidebar;
