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
  status: JobStatus;
  location: string;
  maxSalary: string;
  dateSaved: string;
  dateApplied: string;
  interviewDate?: string;
  excitement: number;
  deadline: string;
}
