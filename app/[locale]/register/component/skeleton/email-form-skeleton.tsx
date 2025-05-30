import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function EmailFormSkeleton() {
  return (
    <div
      className="flex flex-col gap-4"
      role="status"
      aria-busy="true"
      data-testid="email-form-skeleton"
    >
      <div className="flex flex-col gap-2" data-testid="email-field-skeleton">
        <Skeleton className="h-4 w-10" data-testid="email-label-skeleton" />
        <Skeleton
          className="h-10 w-full rounded-xl"
          data-testid="email-input-skeleton"
        />
      </div>
      <div
        className="flex flex-col gap-2"
        data-testid="password-field-skeleton"
      >
        <Skeleton className="h-4 w-20" data-testid="password-label-skeleton" />
        <Skeleton
          className="h-10 w-full rounded-xl"
          data-testid="password-input-skeleton"
        />
      </div>
      <div className="flex flex-col gap-2" data-testid="confirm-field-skeleton">
        <Skeleton className="h-4 w-44" data-testid="confirm-label-skeleton" />
        <Skeleton
          className="h-10 w-full rounded-xl"
          data-testid="confirm-input-skeleton"
        />
      </div>
      <Skeleton
        className="h-10 w-full rounded-xl"
        data-testid="submit-skeleton"
      />
      <div className="flex justify-center" data-testid="footer-skeleton">
        <Skeleton
          className="h-4 w-3/4 rounded-xl"
          data-testid="footer-text-skeleton"
        />
      </div>
    </div>
  );
}
