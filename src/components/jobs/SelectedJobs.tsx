"use client";

import { toast } from "sonner";
import { useJobContext } from "../../context/JobContext";
import type { Job } from "../../types/jobs";
import { useState } from "react";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

interface SelectedJobsProps {
  selectedJobs: string[];
  onStatusSelection: (newStatus: string) => void;
}

const SelectedJobs = ({
  selectedJobs,
  onStatusSelection,
}: SelectedJobsProps) => {
  const { updateJob, deleteJob } = useJobContext();
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Job["status"] | "">("");

  const handleDeleteSelectedJobs = async () => {
    if (selectedJobs.length === 0 || isDeleting) return;
    setIsDeleting(true);
    try {
      await Promise.all(selectedJobs.map(deleteJob));
      toast.success(`Deleted ${selectedJobs.length} job(s)`);
      onStatusSelection("deleted");
    } catch (error) {
      toast.error(
        `Failed to delete jobs: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdateStatus = async (newStatus: Job["status"]) => {
    try {
      await Promise.all(
        selectedJobs.map((id) => updateJob({ id, status: newStatus }))
      );
      toast.success(`Updated ${selectedJobs.length} job(s) to ${newStatus}`);
      onStatusSelection("deleted");
      setSelectedStatus("");
    } catch (error) {
      toast.error(
        `Failed to update jobs: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  return selectedJobs.length > 0 ? (
    <div className="flex items-center gap-4 ">
      <span>{selectedJobs.length} selected</span>

      <Select
        value={selectedStatus}
        onValueChange={(val) => {
          setSelectedStatus(val as Job["status"]);
          handleUpdateStatus(val as Job["status"]);
        }}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Change status" />
        </SelectTrigger>
        <SelectContent>
          {[
            "Bookmarked",
            "Applying",
            "Applied",
            "Interviewing",
            "Negotiating",
            "Accepted",
          ].map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        onClick={() => toast("Archive not implemented yet")}
        variant="outline"
      >
        Archive
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {selectedJobs.length} job(s)?</AlertDialogTitle>
            <AlertDialogDescription>
              This can&apos;t be undone. These job applications will be
              permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteSelectedJobs}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  ) : null;
};

export default SelectedJobs;
