"use client";

import React, { useState, useEffect, useContext, createContext } from "react";
import type { Job } from "../types/jobs";
import { createClient } from "../lib/supabase/client";
import { useAuth } from "./AuthContext";

interface JobContextType {
  jobs: Job[];
  addJob: (job: Omit<Job, "id">) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
  updateJob: (job: { id: string } & Partial<Job>) => Promise<void>;
}

// The `jobs` table stores snake_case columns; the app works with the camelCase `Job` type.
interface JobRow {
  id: string;
  user_id: string;
  title: string;
  company: string;
  description: string;
  status: Job["status"];
  location: string;
  max_salary: number;
  date_saved: string | null;
  date_applied: string | null;
  interview_date: string | null;
  excitement: number;
  deadline: string | null;
  created_at: string;
}

const rowToJob = (row: JobRow): Job => ({
  id: row.id,
  userId: row.user_id,
  title: row.title,
  company: row.company,
  description: row.description,
  status: row.status,
  location: row.location,
  maxSalary: row.max_salary,
  dateSaved: row.date_saved ?? "",
  dateApplied: row.date_applied ?? "",
  interviewDate: row.interview_date ?? undefined,
  excitement: row.excitement,
  deadline: row.deadline ?? "",
  createdAt: row.created_at,
});

const jobToRow = (job: Partial<Job>) => {
  const row: Record<string, unknown> = {};
  if (job.title !== undefined) row.title = job.title;
  if (job.company !== undefined) row.company = job.company;
  if (job.description !== undefined) row.description = job.description;
  if (job.status !== undefined) row.status = job.status;
  if (job.location !== undefined) row.location = job.location;
  if (job.maxSalary !== undefined) row.max_salary = job.maxSalary;
  if (job.dateSaved !== undefined) row.date_saved = job.dateSaved || null;
  if (job.dateApplied !== undefined) row.date_applied = job.dateApplied || null;
  if (job.interviewDate !== undefined)
    row.interview_date = job.interviewDate || null;
  if (job.excitement !== undefined) row.excitement = job.excitement;
  if (job.deadline !== undefined) row.deadline = job.deadline || null;
  return row;
};

const JobContext = createContext<JobContextType | null>(null);

const JobProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setJobs([]);
      return;
    }

    const supabase = createClient();

    const fetchJobs = async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching jobs:", error);
        return;
      }

      setJobs((data as JobRow[]).map(rowToJob));
    };

    fetchJobs();

    const channel = supabase
      .channel("jobs-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "jobs", filter: `user_id=eq.${user.id}` },
        () => fetchJobs()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const addJob = async (job: Omit<Job, "id">) => {
    if (!user) return;
    const supabase = createClient();

    const { error } = await supabase.from("jobs").insert({
      ...jobToRow(job),
      user_id: user.id,
    });

    if (error) throw error;
  };

  const deleteJob = async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase.from("jobs").delete().eq("id", id);
    if (error) throw error;
  };

  const updateJob = async ({ id, ...rest }: { id: string } & Partial<Job>) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("jobs")
      .update(jobToRow(rest))
      .eq("id", id);
    if (error) throw error;
  };

  return (
    <JobContext.Provider value={{ jobs, addJob, deleteJob, updateJob }}>
      {children}
    </JobContext.Provider>
  );
};

export default JobProvider;

export const useJobContext = () => {
  const context = useContext(JobContext);
  if (!context)
    throw new Error("useJobContext must be used within JobProvider");
  return context;
};
