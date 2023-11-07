import { useState } from "react";
import { FilterIcon, ReturnIcon, SearchIcon } from "../../../svg";
import axios from "axios";
import { useSelector } from "react-redux";

const Search = ({ searchResults, setSearchResults }) => {
  const { user } = useSelector((state) => state.user);
  const { token } = user;

  const [show, setShow] = useState(false);

  const handleSearch = async (event) => {
    if (event.target.value && event.key === "Enter") {
      try {
        let { data } = await axios.get(
          `${process.env.REACT_APP_AUTH_LINK}/user?search=${event.target.value}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSearchResults(data);
      } catch (error) {
        console.error(error.response.data.error.message);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="h-[49px py-1.5">
      <div className="px-[10px]">
        <div className="flex items-center gap-x-2">
          <div className="w-full flex dark:bg-dark_bg_2 rounded-lg pl-2">
            {show || searchResults.length > 0 ? (
              <span
                className="w-8 flex items-center justify-center rotateAnimation cursor-pointer"
                onClick={() => setSearchResults([])}
              >
                <ReturnIcon className="fill-green_1 w-5" />
              </span>
            ) : (
              <span className="w-8 flex items-center justify-center">
                <SearchIcon className="dark:fill-dark_svg_2 w-5" />
              </span>
            )}
            <input
              type="text"
              className="input"
              placeholder="Search or start new chat"
              onKeyDown={(e) => handleSearch(e)}
              onFocus={() => setShow(true)}
              onBlur={() => searchResults.length === 0 && setShow(false)}
            />
          </div>
          <button className="btn">
            <FilterIcon className="dark:fill-dark_svg_2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
