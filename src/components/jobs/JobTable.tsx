import type { Job } from "../../types/jobs";

interface Props {
  jobs: Job[];
}

const formatDate = (isoString?: string) => {
  if (!isoString) return "-";
  return new Date(isoString).toLocaleDateString();
};

const JobTable = ({ jobs = [] }: Props) => {
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
            <td className="p-2">{job.title}</td>
            <td className="p-2">{job.company}</td>
            <td className="p-2">{job.maxSalary}</td>
            <td className="p-2">{job.location}</td>
            <td className="p-2">{job.status}</td>
            <td className="p-2">{formatDate(job.interviewDate)}</td>
            <td className="p-2">{formatDate(job.dateSaved)}</td>
            <td className="p-2">{formatDate(job.dateApplied)}</td>
            <td className="p-2">{formatDate(job.deadline)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default JobTable;
