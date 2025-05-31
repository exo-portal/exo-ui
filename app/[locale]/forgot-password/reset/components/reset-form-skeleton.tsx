import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export function ResetFormSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <span className="sr-only">Loading Reset Password form</span>
      {/* Password Field */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-38" />
        <Skeleton className="h-10 w-full rounded-xl" />
      </div>
      {/* Confirm Password Field */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-44" />
        <Skeleton className="h-10 w-full rounded-xl" />
      </div>
      {/* Button */}
      <Skeleton className="h-10 w-full rounded-xl" />
    </div>
  );
}
