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
  if (!Array.isArray(jobs) || jobs.length === 0) {
    return <div>No jobs to display.</div>;
  }
  return (
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
          <tr key={job.id ?? job.title} className="border-t">
            <td className="">
              <Input
                className="
      border-0          
      focus:border-0  
      focus-visible:ring-0  
      focus-visible:outline-none  
      bg-transparent   
      hover:bg-none 
      rounded-none    
    "
                defaultValue={job.title}
                onBlur={(e) => onUpdate(job.id!, { title: e.target.value })}
              />
            </td>

            <td>
              <Input
                type="text"
                defaultValue={job.company}
                onBlur={(e) => onUpdate(job.id!, { company: e.target.value })}
                className="
      border-0          
      focus:border-0  
      focus-visible:ring-0  
      focus-visible:outline-none  
      bg-transparent   
      hover:bg-none  
      rounded-none    
    "
              />
            </td>

            <td>
              <Input
                type="number"
                defaultValue={job.maxSalary}
                onBlur={(e) => onUpdate(job.id!, { maxSalary: e.target.value })}
                className="
      border-0          
      focus:border-0  
      focus-visible:ring-0  
      focus-visible:outline-none  
      bg-transparent   
      hover:bg-none  
      rounded-none    
    "
              />
            </td>

            <td>
              <Input
                type="text"
                defaultValue={job.location}
                onBlur={(e) => onUpdate(job.id!, { location: e.target.value })}
                className="
      border-0          
      focus:border-0  
      focus-visible:ring-0  
      focus-visible:outline-none  
      bg-transparent   
      hover:bg-none       
      rounded-none    
    "
              />
            </td>

            <td>
              <Select
                defaultValue={job.status}
                onValueChange={(value) =>
                  onUpdate(job.id!, { status: value as JobStatus })
                }
              >
                <SelectTrigger
                  className="
      border-0          
      focus:border-0  
      focus-visible:ring-0  
      focus-visible:outline-none  
      bg-transparent   
      hover:bg-none  
      rounded-none    
    "
                >
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bookmarked">Bookmarked</SelectItem>
                  <SelectItem value="Applying">Applying</SelectItem>
                  <SelectItem value="Applied">Applied</SelectItem>
                  <SelectItem value="Interviewing">Interviewing</SelectItem>
                  <SelectItem value="Negotiating">Negotiating</SelectItem>
                  <SelectItem value="Accepted">Accepted</SelectItem>
                </SelectContent>
              </Select>
            </td>

            <td className="">
              <DatePicker
                value={
                  job.interviewDate && !isNaN(Date.parse(job.interviewDate))
                    ? new Date(job.interviewDate)
                    : undefined
                }
                onChange={(date: Date | undefined) => {
                  onUpdate(job.id!, {
                    interviewDate: date ? date.toISOString() : undefined,
                  });
                }}
                disabled={false}
              />
            </td>
            <td className="">
              <DatePicker
                value={
                  job.dateSaved && !isNaN(Date.parse(job.dateSaved))
                    ? new Date(job.dateSaved)
                    : undefined
                }
                onChange={(date: Date | undefined) => {
                  console.log("Selected interview date:", date);
                  onUpdate(job.id!, {
                    dateSaved: date ? date.toISOString() : undefined,
                  });
                }}
                placeholder="Pick saved date"
                disabled={false}
              />
            </td>
            <td className="">
              <DatePicker
                value={
                  job.dateApplied && !isNaN(Date.parse(job.dateApplied))
                    ? new Date(job.dateApplied)
                    : undefined
                }
                onChange={(date: Date | undefined) => {
                  onUpdate(job.id!, {
                    dateApplied: date ? date.toISOString() : undefined,
                  });
                }}
                disabled={false}
              />
            </td>
            <td className="">
              <DatePicker
                value={job.deadline ? new Date(job.deadline) : undefined}
                onChange={(date: Date | undefined) => {
                  onUpdate(job.id!, {
                    deadline: date ? date.toISOString() : undefined,
                  });
                }}
                disabled={false}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default JobTable;
