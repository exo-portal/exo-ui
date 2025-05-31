import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export function OtpFormSkeleton() {
  return (
    <div
      className="flex flex-col gap-16"
      role="status"
      aria-busy="true"
      data-testid="otp-form-skeleton"
    >
      <span className="sr-only">Loading OTP form</span>
      <div className="flex w-full justify-center">
        <div className="flex gap-4 w-9/12">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-22 w-full rounded-xl" />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full items-center">
        <Skeleton className="h-10 w-full rounded-xl" />
        <Skeleton className="h-4 w-7/12 rounded-xl" />
      </div>
    </div>
  );
}
