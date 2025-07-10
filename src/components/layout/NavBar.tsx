import { useNavigate, Link } from "react-router-dom";
import { logout } from "../../auth/Auth";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { Button } from "../ui/button";
import { Briefcase, LayoutDashboard } from "lucide-react";

const NavBar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<null | object>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub(); // cleanup listener
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth");
    } catch (err) {
      alert("Logout failed");
    }
  };

  const handleSignUp = () => {
    navigate("/auth");
  };

  return (
    <div className="flex justify-between items-center bg-white-90 shadow p-3">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        Job
        <span className="text-2xl text-teal-600 font-bold flex items-center gap-1">
          Tracker <Briefcase size={25} />
        </span>
      </h1>
      <div className="px-3 gap-4 flex  items-center">
        {user && (
          <Link to="/dashboard" className="text-teal-400 hover:underline">
            <LayoutDashboard size={25} />
          </Link>
        )}
        {!user ? (
          <Button
            onClick={handleSignUp}
            className="bg-teal-400 rounded-2xl p-3"
          >
            Sign up
          </Button>
        ) : (
          <Button
            onClick={handleLogout}
            className="bg-teal-400 rounded-2xl p-3 hover:bg-teal-200 hover:text-gray-500"
          >
            Log Out
          </Button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
