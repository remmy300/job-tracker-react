"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "../context/AuthContext";
import JobProvider from "../context/JobContext";
import NavBar from "../components/layout/NavBar";

export const Providers = ({ children }: { children: ReactNode }) => (
  <AuthProvider>
    <JobProvider>
      <NavBar />
      {children}
    </JobProvider>
  </AuthProvider>
);
