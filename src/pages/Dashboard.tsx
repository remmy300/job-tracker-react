import StatusSteps from "../components/jobs/StatusSteps";
import JobModal from "../components/jobs/AddJobModal";
import JobRow from "../components/jobs/JobRow";
import { useJobContext } from "../context/JobContext";
import { useState } from "react";
import type { JobStatus } from "../types/jobs";

const DashBoard = () => {
  const { jobs } = useJobContext();
  const [filterStatus, setFilterStatus] = useState<JobStatus | null>(null);

  const filteredJobs = filterStatus
    ? jobs.filter((job) => job.status === filterStatus)
    : undefined;

  return (
    <div className="space-y-6 p-4">
      <StatusSteps
        jobs={jobs}
        onStatusClick={(status) => {
          setFilterStatus((prev) => (prev === status ? null : status));
        }}
      />

      <div className="flex justify-end">
        <JobModal />
      </div>

      <JobRow filteredJobs={filteredJobs} />
    </div>
  );
};

export default DashBoard;
