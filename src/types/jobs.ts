export type JobStatus =
  | "Bookmarked"
  | "Applying"
  | "Applied"
  | "Interviewing"
  | "Negotiating"
  | "Accepted";

export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  status: JobStatus;
  location: string;
  maxSalary: number;
  dateSaved: string;
  dateApplied: string;
  interviewDate?: string;
  excitement: number;
  deadline: string;
}
