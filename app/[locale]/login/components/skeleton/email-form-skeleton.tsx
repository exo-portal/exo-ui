import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export function EmailFormSkeleton() {
  return (
    <div
      className="flex flex-col gap-4"
      role="status"
      aria-busy="true"
      data-testid="email-form-skeleton"
    >
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
          {/* Forgot Password */}
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      {/* Button */}
      <Skeleton className="h-10 w-full rounded-xl" />
      <div className="flex justify-center">
        {/* Link */}
        <Skeleton className="h-4 w-1/2 rounded-xl" />
      </div>
    </div>
  );
}
