import React from "react";
import { useJobContext } from "../../context/JobContext";
import JobTable from "./JobTable";

const JobRow = () => {
  const { jobs } = useJobContext();
  console.log("Jobs received in JobRow:", jobs);

  return (
    <div>
      <JobTable jobs={jobs} />
    </div>
  );
};

export default JobRow;
