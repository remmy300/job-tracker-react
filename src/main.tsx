import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./routing/route.ts";
import JobProvider from "./context/JobContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <JobProvider>
        <RouterProvider router={router} />
      </JobProvider>
    </AuthProvider>
  </StrictMode>
);
