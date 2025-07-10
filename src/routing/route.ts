import { createBrowserRouter } from "react-router-dom";
import React from "react";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Details from "../pages/Details";

export const router = createBrowserRouter([
  {
    path: "/",
    element: React.createElement(App),
    children: [
      {
        path: "login",
        element: React.createElement(Login),
      },
      {
        index: true,
        element: React.createElement(Dashboard),
      },
      {
        path: "details/:jobId",
        element: React.createElement(Details),
      },
    ],
  },
]);
