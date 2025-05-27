"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { CalendarIcon } from "../icons";
import { XIcon } from "lucide-react";
import { Input } from "./input";
import moment, { Moment } from "moment";

export function DatePicker({
  className,
  ...props
}: React.ComponentProps<"input"> & {}) {
  const [date, setDate] = React.useState<Moment>();

  const resetDate = React.useCallback(() => {
    setDate(undefined);
  }, []);

  return (
    <Popover>
      <Input
        className="no-calendar-icon"
        type="date"
        value={date ? date.format("YYYY-MM-DD") : ""}
        onChange={(e) => {
          const value = e.target.value;
          if (!value) {
            setDate(undefined);
            return;
          }
          // Use moment to parse the date string
          const parsedDate: Moment = moment(value, "YYYY-MM-DD", true);
          console.log("Parsed Date:", parsedDate);
          if (parsedDate.isValid()) {
            setDate(parsedDate);
          } else {
            setDate(undefined);
          }
        }}
        aria-invalid={props["aria-invalid"] || false}
        inputSuffixIcon={
          !date ? (
            <PopoverTrigger asChild>
              <Image className="cursor-pointer" src={CalendarIcon} alt="calendar-icon" />
            </PopoverTrigger>
          ) : (
            <div className="ml-2 cursor-pointer" onClick={resetDate}>
              <XIcon />
            </div>
          )
        }
        {...props}
      />
      <PopoverContent
        hidden={date ? true : false}
        className="w-auto p-0"
        side="bottom"
        align="end"
      >
        <Calendar
          mode="single"
          selected={date ? date.toDate() : undefined}
          onSelect={(selectedDate: Date | undefined) => {
            setDate(
              selectedDate
                ? moment(selectedDate, "YYYY-MM-DD", true)
                : undefined
            );
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
