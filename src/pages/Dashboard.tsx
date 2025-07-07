import StatusSteps from "../components/jobs/StatusSteps";

import JobModal from "../components/jobs/AddJobModal";

import JobRow from "../components/jobs/JobRow";

const DashBoard = () => {
  return (
    <div>
      <StatusSteps />
      <div className=" flex items-end justify-end">
        <JobModal />
      </div>

      <JobRow />
    </div>
  );
};

export default DashBoard;
