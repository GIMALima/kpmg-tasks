import { useContext } from "react";
import { UidContext } from "../../AppContext";
import Login from "../Login/Login";

const Home = () => {
  const uid = useContext(UidContext);

  return <>{uid ? <div>Hello from home</div> : <Login />}</>;
};

export default Home;
