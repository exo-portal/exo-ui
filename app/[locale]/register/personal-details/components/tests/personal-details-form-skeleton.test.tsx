import React from "react";
import { render, screen } from "@testing-library/react";
import { PersonalDetailsFormSkeleton } from "../personal-details-form-skeleton";

// Mock the Skeleton component
jest.mock("@/components/ui/skeleton", () => ({
  Skeleton: ({ className }: { className?: string }) => (
    <div data-testid="skeleton" className={className} />
  ),
}));

describe("PersonalDetailsFormSkeleton", () => {
  it("renders the main container with correct classes", () => {
    render(<PersonalDetailsFormSkeleton />);
    const container = screen.getByTestId("personal-details-form-skeleton");
    expect(container).toHaveClass("flex", "flex-col", "gap-4", "w-[500px]");
  });

  it("renders 7 Skeleton components with correct classes", () => {
    render(<PersonalDetailsFormSkeleton />);
    const skeletons = screen.getAllByTestId("skeleton");
    expect(skeletons).toHaveLength(9);

    // Check classes for each skeleton
    expect(skeletons[0]).toHaveClass("h-4", "w-26");
    expect(skeletons[1]).toHaveClass("h-10", "w-full", "rounded-xl");
    expect(skeletons[2]).toHaveClass("h-4", "w-26");
    expect(skeletons[3]).toHaveClass("h-10", "w-full", "rounded-xl");
    expect(skeletons[4]).toHaveClass("h-4", "w-24");
    expect(skeletons[5]).toHaveClass("h-10", "w-full", "rounded-xl");
    expect(skeletons[6]).toHaveClass("h-4", "w-20");
    expect(skeletons[7]).toHaveClass("h-10", "w-full", "rounded-xl");
    expect(skeletons[8]).toHaveClass("h-10", "w-full", "mt-4", "rounded-xl");
  });
});
