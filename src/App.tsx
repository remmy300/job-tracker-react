import { Outlet, Link } from "react-router-dom";
import NavBar from "./components/layout/NavBar";

const App = () => {
  return (
    <div>
      <NavBar />
      <nav style={{ marginBottom: "1rem" }}>
        <Link to="/login" style={{ marginRight: 10 }}>
          Login
        </Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      <Outlet />
    </div>
  );
};

export default App;
