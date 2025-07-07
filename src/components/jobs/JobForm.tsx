import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export const jobSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  url: z.string().url("Enter a valid URL"),
  company: z.string().min(1),
  location: z.string().min(1),
  description: z.string().min(1),
});

export type JobFormValues = z.infer<typeof jobSchema>;

interface Props {
  onSubmit: (data: JobFormValues) => Promise<void>;
}

const JobForm: React.FC<Props> = ({ onSubmit }) => {
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      url: "",
      company: "",
      location: "",
      description: "",
    },
  });

  const handleFormSubmit = async (data: JobFormValues) => {
    try {
      await onSubmit(data);
      form.reset();
    } catch (err) {
      console.error("Submission failed:", err);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-4 py-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input placeholder="Job Title" {...field} type="title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL for Original Posting</FormLabel>
              <FormControl>
                <Input
                  placeholder="URL for Original Posting"
                  {...field}
                  type="url"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Company</FormLabel>
              <FormControl>
                <Input placeholder="Job Company" {...field} type="company" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Location</FormLabel>
              <FormControl>
                <Input placeholder="Job Location" {...field} type="location" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Job Decription" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Add Job
        </Button>
      </form>
    </Form>
  );
};

export default JobForm;
