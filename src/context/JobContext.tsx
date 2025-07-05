import {
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  collection,
  where,
  onSnapshot,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";
import React, { useState, useEffect, useContext, createContext } from "react";
import type { Job } from "../types/jobs";
import { db } from "../utils/firebase";

interface JobContextType {
  jobs: Job[];
  addJob: (job: Omit<Job, "id">) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
  updateJob: (job: Job) => Promise<void>;
}

const JobContext = createContext<JobContextType | null>(null);

const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "jobs"), where("userId", "==", user.uid));

    const unsub = onSnapshot(q, (snapshot) => {
      const fetchedJob: Job[] = snapshot.docs.map((doc) => ({
        ...(doc.data() as Job),
        id: doc.id,
      }));

      setJobs(fetchedJob);
    });

    return unsub;
  }, [user]);

  const addJob = async (job: Omit<Job, "id">) => {
    await addDoc(collection(db, "jobs"), job);
  };

  const deleteJob = async (id: string) => {
    await deleteDoc(doc(db, "jobs", id));
  };

  const updateJob = async (job: Job) => {
    const { id, ...rest } = job;
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
