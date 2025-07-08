import type { Job, JobStatus } from "../../types/jobs";
import { Input } from "../ui/input";
import { DatePicker } from "../ui/DatePicker";
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
}

const formatDate = (isoString?: string) => {
  if (!isoString) return "-";
  return new Date(isoString).toLocaleDateString();
};

const JobTable = ({ jobs = [], onUpdate }: Props) => {
  const handleStatusUpdate = async (id: string, newStatus: JobStatus) => {
    try {
      await onUpdate(id, { status: newStatus });
    } catch (error) {
      console.error("Failed to update status:", error);
    }
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
            <th className="p-2 text-left">Job Position</th>
            <th className="p-2 text-left">Company</th>
            <th className="p-2 text-left">Max Salary</th>
            <th className="p-2 text-left">Location</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Interview Date</th>
            <th className="p-2 text-left">Date Saved</th>
            <th className="p-2 text-left">Date Applied</th>
            <th className="p-2 text-left">Deadline</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr
              key={job.id ?? job.title}
              className="border-t  hover:bg-gray-50"
            >
              <td className="border-r">
                <Input
                  className="border-0 bg-transparent focus:border-0 focus-visible:ring-0 focus:outline-none hover:bg-transparent"
                  defaultValue={job.title}
                  onBlur={(e) => onUpdate(job.id!, { title: e.target.value })}
                />
              </td>

              <td className="border-r">
                <Input
                  className="border-0 bg-transparent focus-visible:ring-0 focus:outline-none hover:bg-transparent rounded"
                  defaultValue={job.company}
                  onBlur={(e) => onUpdate(job.id!, { company: e.target.value })}
                />
              </td>

              <td className="border-r">
                <Input
                  type="number"
                  className="border-0 bg-transparent focus:border-0 focus-visible:ring-0 focus:outline-none hover:bg-transparent rounded"
                  defaultValue={job.maxSalary}
                  onBlur={(e) =>
                    onUpdate(job.id!, { maxSalary: e.target.value })
                  }
                />
              </td>

              <td className="border-r">
                <Input
                  className="border-0 bg-transparent focus:border-0 focus-visible:ring-0 focus:outline-none hover:bg-transparent rounded"
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
                  <SelectTrigger className="border-0 bg-transparent focus-visible:ring-0 focus:outline-none hover:bg-gray-100">
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
                    job.interviewDate ? new Date(job.interviewDate) : undefined
                  }
                  onChange={(date) =>
                    onUpdate(job.id!, { interviewDate: date?.toISOString() })
                  }
                />
              </td>

              <td className="border-r">
                <DatePicker
                  value={job.dateSaved ? new Date(job.dateSaved) : undefined}
                  onChange={(date) =>
                    onUpdate(job.id!, { dateSaved: date?.toISOString() })
                  }
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
                />
              </td>

              <td className="border-r">
                <DatePicker
                  value={job.deadline ? new Date(job.deadline) : undefined}
                  onChange={(date) =>
                    onUpdate(job.id!, { deadline: date?.toISOString() })
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobTable;
