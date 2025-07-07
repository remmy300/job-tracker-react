import React from "react";
import { useJobContext } from "../../context/JobContext";
import JobTable from "./JobTable";
import type { Job } from "../../types/jobs";

const JobRow = () => {
  const { jobs,updateJob } = useJobContext();
  console.log("Jobs received in JobRow:", jobs);

  const handleJobUpdate = async(id:string,updates:Partial<Job>) =>{
     try{
      await updateJob({id,...updates})

  }catch(error){
console.log("Failed to update:",error);

  }

  }
 
  

  return (
    <div>
      <JobTable jobs={jobs} onUpdate={handleJobUpdate} />
    </div>
  );
};

export default JobRow;
