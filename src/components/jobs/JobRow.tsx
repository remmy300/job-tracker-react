import React from "react";
import { useJobContext } from "../../context/JobContext";
import JobTable from "./JobTable";
import type { Job } from "../../types/jobs";

interface JobRowProps {
  filteredJobs?: Job[];
}

const JobRow = ({ filteredJobs }: JobRowProps) => {
  const { jobs, updateJob } = useJobContext();
  const jobsToDisplay = filteredJobs ?? jobs;

  console.log("Jobs being displayed:", jobsToDisplay);

  const handleJobUpdate = async (id: string, updates: Partial<Job>) => {
    try {
      await updateJob({ id, ...updates });
    } catch (error) {
      console.error("Failed to update job:", error);
    }
  };

  return (
    <div className="mt-6">
      <JobTable jobs={jobsToDisplay} onUpdate={handleJobUpdate} />
    </div>
  );
};

export default JobRow;
