import React from "react";
import { render, screen } from "@testing-library/react";
import EmailFormSkeleton from "./email-form-skeleton";

jest.mock("@/components/ui/skeleton", () => ({
  Skeleton: ({
    "data-testid": testId,
    className,
  }: {
    "data-testid"?: string;
    className?: string;
  }) => <div data-testid={testId} className={className} />,
}));

describe("EmailFormSkeleton", () => {
  beforeEach(() => {
    render(<EmailFormSkeleton />);
  });

  it("renders the main skeleton container with correct attributes", () => {
    const container = screen.getByTestId("email-form-skeleton");
    expect(container).toBeInTheDocument();
    expect(container).toHaveAttribute("role", "status");
    expect(container).toHaveAttribute("aria-busy", "true");
  });

  it("renders email field skeletons", () => {
    expect(screen.getByTestId("email-field-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("email-label-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("email-input-skeleton")).toBeInTheDocument();
  });

  it("renders password field skeletons", () => {
    expect(screen.getByTestId("password-field-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("password-label-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("password-input-skeleton")).toBeInTheDocument();
  });

  it("renders confirm password field skeletons", () => {
    expect(screen.getByTestId("confirm-field-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("confirm-label-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("confirm-input-skeleton")).toBeInTheDocument();
  });

  it("renders submit button skeleton", () => {
    expect(screen.getByTestId("submit-skeleton")).toBeInTheDocument();
  });

  it("renders footer skeleton", () => {
    expect(screen.getByTestId("footer-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("footer-text-skeleton")).toBeInTheDocument();
  });
});
