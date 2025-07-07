import { Button } from "../ui/button";
import type { JobStatus } from "../../types/jobs";

const statuses: JobStatus[] = [
  "Bookmarked",
  "Applying",
  "Applied",
  "Interviewing",
  "Negotiating",
  "Accepted",
];

const StatusSteps = () => {
  return (
    <div className="shadow rounded p-4 flex gap-2 justify-between overflow-x-auto">
      {statuses.map((status, index) => (
        <Button
          key={status}
          className={`py-2 px-5 rounded-sm text-center transition-all
            font-semibold uppercase text-sm
            border border-gray-200 hover:border-blue-400
            bg-white hover:bg-blue-50
            text-gray-700 hover:text-blue-600
            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
            active:bg-blue-100 active:scale-95
            flex flex-col items-center
            ${index === 0 ? "rounded-l-xl" : ""} 
            ${index === statuses.length - 1 ? "rounded-r-xl" : ""}
          `}
        >
          {status}
        </Button>
      ))}
    </div>
  );
};

export default StatusSteps;
