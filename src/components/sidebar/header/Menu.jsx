import { useDispatch } from "react-redux";
import { logout } from "../../../features/userSlice";

function Menu() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className="absolute right-1 z-50 dark:bg-dark_bg_2 dark:text-dark_text_1 shadow-md w-52">
      <ul>
        <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
          <span>New group</span>
        </li>
        <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
          <span>Community</span>
        </li>
        <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
          <span>Starred message</span>
        </li>
        <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
          <span>Setting</span>
        </li>
        <li
          className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3"
          onClick={logoutHandler}
        >
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
