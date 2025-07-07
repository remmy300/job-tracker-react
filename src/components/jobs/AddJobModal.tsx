import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import JobForm from "./JobForm";
import type { JobFormValues } from "./JobForm";

import { useJobContext } from "../../context/JobContext";
import { DialogDescription } from "@radix-ui/react-dialog";

import { useAuth } from "../../context/AuthContext";

const JobModal = () => {
  const { addJob } = useJobContext();
  const { user } = useAuth();

  const handleFormSubmit = async (data: JobFormValues) => {
    console.log("📥 Form data submitted:", data);
    if (!user) {
      console.log("User is not authenticated.");
      return;
    }
    try {
      await addJob({
        ...data,
        userId: user.uid,
        createdAt: new Date().toISOString(),
        status: "Bookmarked",
      });
      console.log("Job added succefully:", data);
    } catch (error) {
      console.log("Failed to add a new job:", error);
    }
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-green-300 m-2">
            Add a New Job
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add A New Job Post</DialogTitle>
            <DialogDescription>
              Add you job post in the field below
            </DialogDescription>
          </DialogHeader>
          <JobForm onSubmit={handleFormSubmit} />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default JobModal;
