import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export function PersonalDetailsFormSkeleton() {
  return (
    <div
      data-testid="personal-details-form-skeleton"
      className="flex flex-col gap-4 w-[500px]"
    >
      {/* first name and last name skeleton */}
      <div className="flex gap-4 items-start">
        <div className="flex flex-col gap-2 w-full">
          <Skeleton className="h-4 w-26" />
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Skeleton className="h-4 w-26" />
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
      </div>
      {/* Date of birth skeleton */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full rounded-xl" />
      </div>
      {/* Gender Skeleton */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full rounded-xl" />
      </div>
      {/* Next Button Skeleton */}
      <Skeleton className="h-10 w-full mt-4 rounded-xl" />
    </div>
  );
}
