"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { logout } from "../../lib/auth";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui/button";
import { Briefcase, LayoutDashboard } from "lucide-react";

const NavBar = () => {
  const router = useRouter();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
      router.refresh();
    } catch (err) {
      toast.error(
        `Logout failed: ${err instanceof Error ? err.message : "Unknown error"}`,
      );
    }
  };

  const handleSignUp = () => {
    router.push("/login");
  };

  return (
    <div className="flex justify-between items-center bg-white-90 shadow p-3">
      <Link href="/" className="text-2xl font-bold flex items-center gap-2">
        Job
        <span className="text-2xl text-teal-600 font-bold flex items-center gap-1">
          Tracker <Briefcase size={25} />
        </span>
      </Link>
      <div className="px-3 gap-4 flex  items-center">
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
