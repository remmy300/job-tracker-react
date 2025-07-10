import { useParams, useNavigate } from "react-router-dom";
import { useJobContext } from "../context/JobContext";
import { formatCurrency } from "../utils/Format";
import {
  Briefcase,
  CalendarDays,
  MapPin,
  FileText,
  ArrowLeft,
  TimerIcon,
  Mic,
  CreditCardIcon,
  Calendar,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

const formatDate = (date?: string) =>
  date
    ? new Date(date).toLocaleDateString("en-US", { dateStyle: "medium" })
    : "-";

const Details = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { jobs } = useJobContext();

  const job = jobs.find((job) => job.id === jobId);

  if (!job) {
    return <div className="p-4 text-red-500">Job not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 shadow rounded-lg space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2 mb-1">
          <Briefcase className="text-teal-600 w-6 h-6" />
          {job.title}
        </h1>
        <p className="text-lg text-teal-500 font-semibold">{job.company}</p>
        <span
          className={`inline-block mt-2 px-3 py-1 text-sm rounded-full font-medium 
            ${
              job.status === "Applied"
                ? "bg-blue-100 text-blue-800"
                : job.status === "Interviewing"
                ? "bg-purple-100 text-purple-800"
                : job.status === "Accepted"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-700"
            }`}
        >
          {job.status}
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-6 text-gray-700">
        <div>
          <p className="mb-1 font-semibold">
            <MapPin className="text-red-300" /> Location:
          </p>
          <p>{job.location}</p>
        </div>
        <div>
          <p className="mb-1 font-semibold">
            <CreditCardIcon className="text-teal-200" /> Max Salary:
          </p>
          <p>{formatCurrency(job.maxSalary)}</p>
        </div>
        <div>
          <p className="mb-1 font-semibold">
            <CalendarDays className="text-teal-200" /> Date Saved:
          </p>
          <p>{formatDate(job.dateSaved)}</p>
        </div>
        <div>
          <p className="mb-1 font-semibold">
            <Calendar className="text-teal-300" /> Date Applied:
          </p>
          <p>{formatDate(job.dateApplied)}</p>
        </div>
        <div>
          <p className="mb-1 font-semibold">
            <Mic /> Interview Date:
          </p>
          <p>{formatDate(job.interviewDate)}</p>
        </div>
        <div>
          <p className="mb-1 font-semibold">
            <TimerIcon className="text-gray-500" /> Deadline:
          </p>
          <p>{formatDate(job.deadline)}</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <FileText className="w-5 h-5 text-gray-600" />
          Job Description
        </h2>
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown>
            {job.description || "_No description provided._"}
          </ReactMarkdown>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-sm text-teal-600 font-semibold hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Details;
