import { useJobContext } from "../../context/JobContext";
import type { Job } from "../../types/jobs";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

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
      console.log(`${selectedJobs.length} jobs deleted`);
      onStatusSelection("deleted");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdateStatus = async (newStatus: Job["status"]) => {
    try {
      await Promise.all(
        selectedJobs.map((id) => updateJob({ id, status: newStatus }))
      );
      console.log(`Updated ${selectedJobs.length} jobs to ${newStatus}`);
      onStatusSelection("deleted");
      setSelectedStatus("");
    } catch (error) {
      console.error("Error updating status:", error);
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
        onClick={() => alert("Archive not implemented")}
        variant="outline"
      >
        Archive
      </Button>
      <Button onClick={handleDeleteSelectedJobs} variant="destructive">
        {isDeleting ? "Deleting..." : "Delete"}
      </Button>
    </div>
  ) : null;
};

export default SelectedJobs;
