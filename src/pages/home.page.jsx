import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../features/userSlice";

import Sidebar from "../components/sidebar/sidebar";
import { useEffect } from "react";
import { getConversation } from "../features/chatSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (user?.token) {
      dispatch(getConversation(user.token));
    }
  }, [user]);
  return (
    <div className="min-h-screen dark:bg-dark_bg_1 flex item-center justify-center overflow-hidden">
      <h1 className="container flex">
        {/* sidebar */}
        <Sidebar />
      </h1>
    </div>
  );
};

export default Home;
