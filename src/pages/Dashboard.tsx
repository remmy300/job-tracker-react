import StatusSteps from "../components/jobs/StatusSteps";
import JobModal from "../components/jobs/AddJobModal";
import { useJobContext } from "../context/JobContext";
import { useState } from "react";
import type { JobStatus, Job } from "../types/jobs";
import JobTable from "../components/jobs/JobTable";
import SelectedJobs from "../components/jobs/SelectedJobs";
import { Button } from "../components/ui/button";
import { useAuth } from "../context/AuthContext";
import {
  Select,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
  SelectGroup,
} from "../components/ui/select";
const DashBoard = () => {
  const { jobs, updateJob } = useJobContext();
  const [filterStatus, setFilterStatus] = useState<JobStatus | null>(null);
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [editedJobs, setEditedJobs] = useState<Record<string, Partial<Job>>>(
    {}
  );
  const [isSaving, setIsSaving] = useState(false);
  const [sortBy, setSortBy] = useState<
    "excitement" | "dateApplied" | "company"
  >("dateApplied");
  const { user } = useAuth();

  const filteredJobs = filterStatus
    ? jobs.filter((job) => job.status === filterStatus)
    : undefined;

  const jobsToDisplay = [...(filteredJobs ?? jobs)].sort((a, b) => {
    switch (sortBy) {
      case "excitement":
        return b.excitement - a.excitement;
      case "company":
        return a.company.localeCompare(b.company);
      case "dateApplied":
        return (
          new Date(b.dateApplied || 0).getTime() -
          new Date(a.dateApplied || 0).getTime()
        );
      default:
        return 0;
    }
  });

  const handleJobUpdate = async (id: string, updates: Partial<Job>) => {
    setEditedJobs((prev) => ({
      ...prev,
      [id]: { ...prev[id], ...updates },
    }));

    try {
      await updateJob({ id, ...updates });
    } catch (error) {
      console.error("Failed to update job:", error);
    }
  };

  const handleSaveAllEdits = async () => {
    if (Object.keys(editedJobs).length === 0) return;

    setIsSaving(true);
    try {
      await Promise.all(
        Object.entries(editedJobs).map(([id, updates]) =>
          updateJob({ id, ...updates })
        )
      );
      setEditedJobs({});
    } catch (error) {
      console.error("Failed to save some jobs:", error);
    } finally {
      setIsSaving(false);
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
    <div className="space-y-6 p-4">
      {!user && (
        <p className="text-gray-500 mb-4 text-2xl font-semibold">
          Log in to save jobs and track your progress.
        </p>
      )}
      <StatusSteps
        jobs={jobs}
        onStatusClick={(status) => {
          setFilterStatus((prev) => (prev === status ? null : status));
        }}
      />

      <div className="flex justify-between bg-white/90 rounded shadow p-2">
        {user ? (
          <>
            <SelectedJobs
              selectedJobs={selectedJobs}
              onStatusSelection={() => setSelectedJobs([])}
            />
            <div className="flex gap-2">
              <Button
                onClick={handleSaveAllEdits}
                disabled={Object.keys(editedJobs).length === 0 || isSaving}
                className={`variant-outlined m-2 rounded-md ${
                  Object.keys(editedJobs).length > 0
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-gray-300 text-gray-900 cursor-not-allowed"
                }`}
              >
                {isSaving
                  ? "Saving..."
                  : `Save All Changes (${Object.keys(editedJobs).length})`}
              </Button>

              <Select
                value={sortBy}
                onValueChange={(val) => setSortBy(val as typeof sortBy)}
              >
                <SelectTrigger className="m-2 bg-gray-200 hover:bg-gray-300 shadow">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sort By:</SelectLabel>
                    <SelectItem value="excitement">Excitement</SelectItem>
                    <SelectItem value="dateApplied">Date Applied</SelectItem>
                    <SelectItem value="company">Company</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <JobModal />
            </div>
          </>
        ) : (
          <p className="text-center text-lg  mt-4 text-gray-400 font-semibold ">
            🔒 You must log in to add jobs.
          </p>
        )}
      </div>

      <JobTable
        jobs={jobsToDisplay}
        onUpdate={handleJobUpdate}
        onToggleSelection={handleToggleSelection}
        selectedJobs={selectedJobs}
        editedJobs={editedJobs}
      />
    </div>
  );
};

export default DashBoard;
