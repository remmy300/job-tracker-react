import { useState } from "react";
import { Calendar } from "./calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { Button } from "./button";
import { format } from "date-fns";

type DatePickerProps = {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
};

export const DatePicker = ({
  value,
  onChange,
  placeholder = "Pick a date",
  disabled = false,
}: DatePickerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between text-left border-0 focus:border-0 rounded-none focus:outline-none focus:ring-0 bg-transparent hover:bg-transparent"
          disabled={disabled}
          onClick={() => setOpen(!open)}
        >
          {value ? (
            format(value, "PPP")
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            onChange(date);
            setOpen(false);
          }}
          captionLayout="dropdown"
          disabled={disabled}
        />
      </PopoverContent>
    </Popover>
  );
};
