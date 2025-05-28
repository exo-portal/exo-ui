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

export function DatePicker({ ...props }: React.ComponentProps<"input"> & {}) {
  const { onChange } = props;

  const handleDateChange = React.useCallback(
    (selectedDate: Moment | undefined) => {
      if (onChange) {
        const value = selectedDate
          ? moment(selectedDate).format("YYYY-MM-DD")
          : "";
        const event = {
          target: { value } as EventTarget & HTMLInputElement,
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    },
    [onChange]
  );

  const resetDate = React.useCallback(() => {
    handleDateChange(undefined);
  }, [handleDateChange]);

  return (
    <Popover>
      <Input
        className="no-calendar-icon"
        type="date"
        value={props.value || ""}
        onChange={(e) => {
          const value = e.target.value;
          if (!value) {
            handleDateChange(undefined);
            return;
          }
          // Use moment to parse the date string
          const parsedDate: Moment = moment(value, "YYYY-MM-DD", true);
          console.log("Parsed Date:", parsedDate);
          if (parsedDate.isValid()) {
            handleDateChange(parsedDate);
          } else {
            handleDateChange(undefined);
          }
        }}
        aria-invalid={props["aria-invalid"] || false}
        inputSuffixIcon={
          !props.value ? (
            <PopoverTrigger asChild>
              <Image
                className="cursor-pointer"
                src={CalendarIcon}
                alt="calendar-icon"
              />
            </PopoverTrigger>
          ) : (
            <button className="cursor-pointer mt-1" onClick={resetDate}>
              <XIcon className="text-neutral-500" />
            </button>
          )
        }
        {...props}
      />
      <PopoverContent
        hidden={props.value ? true : false}
        className="w-auto p-0"
        side="bottom"
        align="end"
      >
        <Calendar
          mode="single"
          selected={
            props.value
              ? moment.isMoment(props.value)
                ? moment(props.value).toDate()
                : typeof props.value === "string"
                ? moment(props.value, "YYYY-MM-DD", true).isValid()
                  ? moment(props.value, "YYYY-MM-DD", true).toDate()
                  : undefined
                : undefined
              : undefined
          }
          onSelect={(selectedDate: Date | undefined) => {
            handleDateChange(selectedDate ? moment(selectedDate) : undefined);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
