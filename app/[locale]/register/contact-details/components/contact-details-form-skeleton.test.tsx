import React from "react";
import { render, screen } from "@testing-library/react";
import { ContactDetailsFormSkeleton } from "./contact-details-form-skeleton";

jest.mock("@/components/ui/skeleton", () => ({
  Skeleton: ({
    "data-testid": testId,
    className,
  }: {
    "data-testid"?: string;
    className?: string;
  }) => <div data-testid={testId} className={className} />,
}));

describe("ContactDetailsFormSkeleton", () => {
  beforeEach(() => {
    render(<ContactDetailsFormSkeleton />);
  });

  it("renders the main skeleton container", () => {
    expect(
      screen.getByTestId("contact-details-form-skeleton")
    ).toBeInTheDocument();
  });

  it("renders country skeleton section", () => {
    expect(screen.getByTestId("country-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("country-label-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("country-input-skeleton")).toBeInTheDocument();
  });

  it("renders phone skeleton section", () => {
    expect(screen.getByTestId("phone-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("phone-label-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("phone-input-skeleton")).toBeInTheDocument();
  });

  it("renders address skeleton section", () => {
    expect(screen.getByTestId("address-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("address-label-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("address-input-skeleton")).toBeInTheDocument();
  });

  it("renders state and city skeleton section", () => {
    expect(screen.getByTestId("state-city-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("state-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("state-label-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("state-input-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("city-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("city-label-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("city-input-skeleton")).toBeInTheDocument();
  });

  it("renders barangay and postal skeleton section", () => {
    expect(screen.getByTestId("barangay-postal-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("barangay-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("barangay-label-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("barangay-input-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("postal-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("postal-label-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("postal-input-skeleton")).toBeInTheDocument();
  });

  it("renders submit skeleton", () => {
    expect(screen.getByTestId("submit-skeleton")).toBeInTheDocument();
  });
});
