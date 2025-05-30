import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export function EmailFormSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {/* Email Field */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-10 w-full rounded-xl" />
      </div>
      {/* Password Field */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-20" />
        <div className="flex flex-col gap-2 items-end">
          <Skeleton className="h-10 w-full rounded-xl" />
          <Skeleton className="h-4 w-30 justify-self-end" />
        </div>
      </div>
      <Skeleton className="h-10 w-full rounded-xl" />
      <div className="flex justify-center">
        <Skeleton className="h-4 w-1/2 rounded-xl" />
      </div>
    </div>
  );
}
