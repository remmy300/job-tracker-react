import { Outlet, Link } from "react-router-dom";
import NavBar from "./components/layout/NavBar";

const App = () => {
  return (
    <div>
      <NavBar />

      <Outlet />
    </div>
  );
};

export default App;
