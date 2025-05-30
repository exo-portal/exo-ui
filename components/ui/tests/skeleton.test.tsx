import React from "react";
import { render } from "@testing-library/react";
import { Skeleton } from "../skeleton";

// Mock the cn utility
jest.mock("@/lib/utils", () => ({
  cn: (...args: string[]) => args.filter(Boolean).join(" "),
}));

describe("Skeleton", () => {
  it("renders a div with default classes and data-slot", () => {
    const { container } = render(<Skeleton />);
    const div = container.querySelector('[data-slot="skeleton"]');
    expect(div).toBeInTheDocument();
    expect(div).toHaveClass("bg-neutral-200");
    expect(div).toHaveClass("animate-pulse");
    expect(div).toHaveClass("rounded-md");
  });

  it("applies additional className", () => {
    const { container } = render(<Skeleton className="my-custom-class" />);
    const div = container.querySelector('[data-slot="skeleton"]');
    expect(div).toBeInTheDocument();
    expect(div).toHaveClass("my-custom-class");
  });

  it("forwards other props to the div", () => {
    const { container } = render(
      <Skeleton id="test-id" aria-label="loading" />
    );
    const div = container.querySelector('[data-slot="skeleton"]');
    expect(div).toBeInTheDocument();
    expect(div).toHaveAttribute("id", "test-id");
    expect(div).toHaveAttribute("aria-label", "loading");
  });
});
