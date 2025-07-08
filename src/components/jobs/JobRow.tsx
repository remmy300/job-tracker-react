import React from "react";
import { useJobContext } from "../../context/JobContext";
import JobTable from "./JobTable";
import type { Job } from "../../types/jobs";
import SelectedJobs from "./SelectedJobs";
import { useState } from "react";

interface JobRowProps {
  filteredJobs?: Job[];
}

const JobRow = ({ filteredJobs }: JobRowProps) => {
  const { jobs, updateJob } = useJobContext();
  const jobsToDisplay = filteredJobs ?? jobs;

  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);

  console.log("Jobs being displayed:", jobsToDisplay);

  const handleJobUpdate = async (id: string, updates: Partial<Job>) => {
    try {
      await updateJob({ id, ...updates });
    } catch (error) {
      console.error("Failed to update job:", error);
    }
  };

  const handleToggleSelection = (jobId: string) => {
    setSelectedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  return (
    <div className="mt-6">
      <SelectedJobs
        selectedJobs={selectedJobs}
        onStatusSelection={() => setSelectedJobs([])}
      />
      <JobTable
        jobs={jobsToDisplay}
        onUpdate={handleJobUpdate}
        onToggleSelection={handleToggleSelection}
        selectedJobs={selectedJobs}
      />
    </div>
  );
};

export default JobRow;
