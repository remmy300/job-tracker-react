import type { Job, JobStatus } from "../../types/jobs";
import { Input } from "../ui/input";
import { DatePicker } from "../ui/DatePicker";
import { Checkbox } from "../ui/checkbox";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/Format";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "../ui/select";

interface Props {
  jobs: Job[];
  onUpdate: (id: string, updates: Partial<Job>) => Promise<void>;
  selectedJobs: string[];
  editedJobs: Record<string, Partial<Job>>;
  onToggleSelection: (jobId: string) => void;
}

const JobTable = ({
  jobs = [],
  onUpdate,
  selectedJobs,
  editedJobs,
  onToggleSelection,
}: Props) => {
  const navigate = useNavigate();
  const handleStatusUpdate = async (id: string, newStatus: JobStatus) => {
    try {
      await onUpdate(id, { status: newStatus });
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const isFieldEdited = (jobId: string, field: keyof Job) => {
    return editedJobs[jobId] && field in editedJobs[jobId];
  };

  if (!Array.isArray(jobs)) {
    return <div>Invalid jobs data</div>;
  }

  if (jobs.length === 0) {
    return <div className="p-4 text-gray-500">No jobs to display.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Checked</th>
            <th className="p-2 text-left">Job Position</th>
            <th className="p-2 text-left">Company</th>
            <th className="p-2 text-left">Max Salary</th>
            <th className="p-2 text-left">Location</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Interview Date</th>
            <th className="p-2 text-left">Date Saved</th>
            <th className="p-2 text-left">Date Applied</th>
            <th className="p-2 text-left">Deadline</th>
            <th className="p-2 text-left">Excitement</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => {
            const isEdited = job.id in editedJobs;
            return (
              <tr
                key={job.id ?? job.title}
                className={`border-t hover:bg-gray-50 ${
                  isEdited ? "bg-yellow-50" : ""
                }`}
              >
                <td className="border-r">
                  <Checkbox
                    checked={selectedJobs.includes(job.id)}
                    onCheckedChange={() => onToggleSelection(job.id)}
                  />
                </td>
                <td className="border-r">
                  <Input
                    className={`border-0 bg-transparent focus:border-0 focus-visible:ring-0 focus:outline-none hover:bg-transparent ${
                      isFieldEdited(job.id, "title")
                        ? "ring-1 ring-yellow-400"
                        : ""
                    }`}
                    defaultValue={job.title}
                    onBlur={(e) => onUpdate(job.id!, { title: e.target.value })}
                  />
                </td>

                <td className="border-r">
                  <Input
                    className={`border-0 bg-transparent focus-visible:ring-0 focus:outline-none hover:bg-transparent rounded ${
                      isFieldEdited(job.id, "company")
                        ? "ring-1 ring-yellow-400"
                        : ""
                    }`}
                    defaultValue={job.company}
                    onBlur={(e) =>
                      onUpdate(job.id!, { company: e.target.value })
                    }
                    onClick={() => navigate(`/details/${job.id}`)}
                  />
                </td>

                <td className="border-r">
                  <Input
                    type="number"
                    className={`border-0 bg-transparent focus:border-0 focus-visible:ring-0 focus:outline-none hover:bg-transparent rounded ${
                      isFieldEdited(job.id, "maxSalary")
                        ? "ring-1 ring-yellow-400"
                        : ""
                    }`}
                    defaultValue={formatCurrency(job.maxSalary)}
                    onBlur={(e) =>
                      onUpdate(job.id!, { maxSalary: Number(e.target.value) })
                    }
                  />
                </td>

                <td className="border-r">
                  <Input
                    className={`border-0 bg-transparent focus:border-0 focus-visible:ring-0 focus:outline-none hover:bg-transparent rounded ${
                      isFieldEdited(job.id, "location")
                        ? "ring-1 ring-yellow-400"
                        : ""
                    }`}
                    defaultValue={job.location}
                    onBlur={(e) =>
                      onUpdate(job.id!, { location: e.target.value })
                    }
                  />
                </td>

                <td className="border-r">
                  <Select
                    value={job.status}
                    onValueChange={(value) =>
                      handleStatusUpdate(job.id!, value as JobStatus)
                    }
                  >
                    <SelectTrigger
                      className={`border-0 bg-transparent focus-visible:ring-0 focus:outline-none hover:bg-gray-100 ${
                        isFieldEdited(job.id, "status")
                          ? "ring-1 ring-yellow-400"
                          : ""
                      }`}
                    >
                      <SelectValue placeholder="Select status" />
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
                </td>

                <td className="border-r">
                  <DatePicker
                    value={
                      job.interviewDate
                        ? new Date(job.interviewDate)
                        : undefined
                    }
                    onChange={(date) =>
                      onUpdate(job.id!, { interviewDate: date?.toISOString() })
                    }
                    isEdited={isFieldEdited(job.id, "interviewDate")}
                  />
                </td>

                <td className="border-r">
                  <DatePicker
                    value={job.dateSaved ? new Date(job.dateSaved) : undefined}
                    onChange={(date) =>
                      onUpdate(job.id!, { dateSaved: date?.toISOString() })
                    }
                    isEdited={isFieldEdited(job.id, "dateSaved")}
                  />
                </td>

                <td className="border-r">
                  <DatePicker
                    value={
                      job.dateApplied ? new Date(job.dateApplied) : undefined
                    }
                    onChange={(date) =>
                      onUpdate(job.id!, { dateApplied: date?.toISOString() })
                    }
                    isEdited={isFieldEdited(job.id, "dateApplied")}
                  />
                </td>

                <td className="border-r">
                  <DatePicker
                    value={job.deadline ? new Date(job.deadline) : undefined}
                    onChange={(date) =>
                      onUpdate(job.id!, { deadline: date?.toISOString() })
                    }
                    isEdited={isFieldEdited(job.id, "deadline")}
                  />
                </td>
                <td className="border-r">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <span
                      key={val}
                      className={`cursor-pointer ${
                        val <= job.excitement
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      onClick={() => onUpdate(job.id!, { excitement: val })}
                    >
                      ★
                    </span>
                  ))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default JobTable;
