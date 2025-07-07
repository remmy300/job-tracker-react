import type { FC } from "react";
import { Briefcase } from "lucide-react";
import { Button } from "../ui/button";

const NavBar: FC = () => {
  return (
    <div className="flex justify-between items-center bg-white-90 shadow p-3">
      <h1 className="text-2xl font-bold ">
        Job
        <span className="text-2xl text-teal-600 font-bold">
          Tracker
          <Briefcase />
        </span>
      </h1>
      <div className="px-3 gap-3">
        <Button className="bg-teal-400 rounded-2xl p-3 m-4">Sign up</Button>
        <Button className="bg-teal-400 rounded-2xl p-3">Log Out</Button>
      </div>
    </div>
  );
};

export default NavBar;
