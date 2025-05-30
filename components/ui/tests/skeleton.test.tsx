import React from "react";
import { render } from "@testing-library/react";
import { Skeleton } from "../skeleton";

// Mock the cn utility
jest.mock("@/lib/utils", () => ({
  cn: (...args: string[]) => args.filter(Boolean).join(" "),
}));

describe("Skeleton", () => {
  it("renders a div with default classes and data-slot", () => {
    const { getAllByRole } = render(<Skeleton />);
    const divs = getAllByRole("generic");
    const div = divs[divs.length - 1]; // Select the innermost skeleton div
    expect(div).toHaveAttribute("data-slot", "skeleton");
    expect(div).toHaveClass("bg-accent");
    expect(div).toHaveClass("animate-pulse");
    expect(div).toHaveClass("rounded-md");
  });

  it("applies additional className", () => {
    const { getAllByRole } = render(<Skeleton className="my-custom-class" />);
    const divs = getAllByRole("generic");
    const div = divs[divs.length - 1]; // Select the innermost skeleton div
    expect(div).toHaveClass("my-custom-class");
  });

  it("forwards other props to the div", () => {
    const { getAllByRole } = render(
      <Skeleton id="test-id" aria-label="loading" />
    );
    const divs = getAllByRole("generic");
    const div = divs[divs.length - 1]; // Select the innermost skeleton div
    expect(div).toHaveAttribute("id", "test-id");
    expect(div).toHaveAttribute("aria-label", "loading");
  });
});
