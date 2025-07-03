export type JobStatus =
  | "Wishlist"
  | "Applied"
  | "Interview"
  | "Offer"
  | "Rejected";

export interface Job {
  id?: string;
  title: string;
  company: string;
  status: JobStatus;
  appliedDate: string;
  interviewDate?: string;
  excitement: number;
  link?: string;
  notes?: string;
  userId: string;
}
