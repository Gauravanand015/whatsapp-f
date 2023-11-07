import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../features/userSlice";

import Sidebar from "../components/sidebar/sidebar";
import { useEffect } from "react";
import { getConversation } from "../features/chatSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { conversation, status } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user?.token) {
      dispatch(getConversation(user.token));
    }
  }, [user, dispatch]);
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex item-center justify-center overflow-hidden">
      <h1 className="container flex h-screen">
        {/* sidebar */}
        <Sidebar />
      </h1>
    </div>
  );
};

export default Home;
