import StatusSteps from "../components/jobs/StatusSteps";
import JobTable from "../components/jobs/JobTable";

import JobModal from "../components/jobs/AddJobModal";
import { useJobContext } from "../context/JobContext";

const DashBoard = () => {
  const { jobs } = useJobContext();

  return (
    <div>
      <StatusSteps />
      <JobModal />
      <JobTable jobs={jobs} />
    </div>
  );
};

export default DashBoard;
