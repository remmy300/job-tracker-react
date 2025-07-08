import type { JobStatus } from "../../types/jobs";

const statuses: JobStatus[] = [
  "Bookmarked",
  "Applying",
  "Applied",
  "Interviewing",
  "Negotiating",
  "Accepted",
];

interface Job {
  status: JobStatus;
}

interface Props {
  jobs: Job[];
  onStatusClick?: (status: JobStatus) => void;
}

const StatusSteps = ({ jobs = [], onStatusClick }: Props) => {
  const statusCounts = jobs.reduce((acc: Record<JobStatus, number>, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {} as Record<JobStatus, number>);

  return (
    <div className="flex justify-between overflow-x-auto bg-white/75 rounded shadow border border-gray-300">
      {statuses.map((status, index) => {
        const isFirst = index === 0;
        const isLast = index === statuses.length - 1;

        return (
          <div
            key={status}
            onClick={() => onStatusClick?.(status)}
            className={`relative group cursor-pointer px-6 py-4 text-center flex flex-col justify-center items-center
              bg-white text-gray-800 border-r border-gray-600 transition-colors
              hover:bg-blue-50 hover:text-blue-600
              ${isFirst ? "rounded-l-xl" : ""}
              ${isLast ? "rounded-r-xl border-r-0" : ""}
              clip-step
            `}
          >
            <span className="uppercase font-semibold text-sm">{status}</span>
            <span className="text-xs font-normal">
              {statusCounts[status] || "--"}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default StatusSteps;
