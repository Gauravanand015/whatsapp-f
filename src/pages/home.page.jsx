import { useDispatch } from "react-redux";
import { logout } from "../features/userSlice";

const Home = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <button onClick={handleLogout}>HOME</button>
      <h1>I AM HOME PAGE</h1>
    </div>
  );
};

export default Home;
