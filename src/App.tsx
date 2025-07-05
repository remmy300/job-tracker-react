import { Outlet, Link } from "react-router-dom";

const App = () => {
  return (
    <div>
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
