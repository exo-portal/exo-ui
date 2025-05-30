import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export function ContactDetailsFormSkeleton() {
  return (
    <div
      className="flex flex-col gap-4 w-[500px]"
      data-testid="contact-details-form-skeleton"
      role="status"
      aria-busy="true"
    >
      {/* Country skeleton */}
      <div className="flex flex-col gap-2" data-testid="country-skeleton">
        <Skeleton className="h-4 w-20" data-testid="country-label-skeleton" />
        <Skeleton
          className="h-10 w-full rounded-xl"
          data-testid="country-input-skeleton"
        />
      </div>
      {/* Phone number skeleton */}
      <div className="flex flex-col gap-2" data-testid="phone-skeleton">
        <Skeleton className="h-4 w-32" data-testid="phone-label-skeleton" />
        <Skeleton
          className="h-10 w-full rounded-xl"
          data-testid="phone-input-skeleton"
        />
      </div>
      {/* Address skeleton */}
      <div className="flex flex-col gap-2" data-testid="address-skeleton">
        <Skeleton className="h-4 w-24" data-testid="address-label-skeleton" />
        <Skeleton
          className="h-10 w-full rounded-xl"
          data-testid="address-input-skeleton"
        />
      </div>
      {/* state and city skeleton */}
      <div className="flex gap-4 items-start" data-testid="state-city-skeleton">
        <div
          className="flex flex-col gap-2 w-full"
          data-testid="state-skeleton"
        >
          <Skeleton className="h-4 w-16" data-testid="state-label-skeleton" />
          <Skeleton
            className="h-10 w-full rounded-xl"
            data-testid="state-input-skeleton"
          />
        </div>
        <div className="flex flex-col gap-2 w-full" data-testid="city-skeleton">
          <Skeleton className="h-4 w-14" data-testid="city-label-skeleton" />
          <Skeleton
            className="h-10 w-full rounded-xl"
            data-testid="city-input-skeleton"
          />
        </div>
      </div>
      {/* barangay and postal skeleton */}
      <div
        className="flex gap-4 items-start"
        data-testid="barangay-postal-skeleton"
      >
        <div
          className="flex flex-col gap-2 w-full"
          data-testid="barangay-skeleton"
        >
          <Skeleton
            className="h-4 w-20"
            data-testid="barangay-label-skeleton"
          />
          <Skeleton
            className="h-10 w-full rounded-xl"
            data-testid="barangay-input-skeleton"
          />
        </div>
        <div
          className="flex flex-col gap-2 w-full"
          data-testid="postal-skeleton"
        >
          <Skeleton className="h-4 w-26" data-testid="postal-label-skeleton" />
          <Skeleton
            className="h-10 w-full rounded-xl"
            data-testid="postal-input-skeleton"
          />
        </div>
      </div>
      <Skeleton
        className="h-10 w-full mt-4 rounded-xl"
        data-testid="submit-skeleton"
      />
    </div>
  );
}
