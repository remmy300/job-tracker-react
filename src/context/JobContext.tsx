import {
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  collection,
  where,
  onSnapshot,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";
import React, { useState, useEffect, useContext, createContext } from "react";
import type { Job } from "../types/jobs";
import { db } from "../utils/firebase";

interface JobContextType {
  jobs: Job[];
  addJob: (job: Omit<Job, "id">) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
  updateJob: (job: { id: string } & Partial<Job>) => Promise<void>;
}

// Helper function to safely convert any date format
const convertFirestoreDate = (date: unknown): string | undefined => {
  if (!date) return undefined;

  // If it's a Firestore Timestamp
  if (date instanceof Timestamp) {
    return date.toDate().toISOString();
  }

  // If it's a JavaScript Date object
  if (date instanceof Date) {
    return date.toISOString();
  }

  // If it's already a string
  if (typeof date === "string") {
    return date;
  }

  // If it's a number (milliseconds)
  if (typeof date === "number") {
    return new Date(date).toISOString();
  }

  return undefined;
};

const JobContext = createContext<JobContextType | null>(null);

const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "jobs"), where("userId", "==", user.uid));

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        console.log("Snapshot docs:", snapshot.docs);

        const fetchedJob: Job[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          console.log("📄 Job doc:", data);
          return {
            ...data,
            id: doc.id,
            dateSaved: convertFirestoreDate(data.dateSaved),
            dateApplied: convertFirestoreDate(data.dateApplied),
            deadline: convertFirestoreDate(data.deadline),
            interviewDate: convertFirestoreDate(data.interviewDate),
          } as Job;
        });
        setJobs(fetchedJob);
      },
      (error) => {
        console.error("Error fetching jobs:", error);
      }
    );

    return () => unsub();
  }, [user?.uid]);

  const addJob = async (job: Omit<Job, "id">) => {
    if (!user) return;
    console.log("Current user:", user);

    await addDoc(collection(db, "jobs"), {
      ...job,
      userId: user.uid,
      dateSaved: serverTimestamp(),
    });
    console.log("🔥 Job being saved:", job);
  };

  const deleteJob = async (id: string) => {
    await deleteDoc(doc(db, "jobs", id));
  };

  const updateJob = async ({ id, ...rest }: { id: string } & Partial<Job>) => {
    await updateDoc(doc(db, "jobs", id!), rest);
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
