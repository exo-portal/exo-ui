import React from "react";
import { render, screen } from "@testing-library/react";
import InstructionBadge from "../instruction-badge";

describe("InstructionBadge", () => {
  it("renders the wrapper with correct data-testid", () => {
    render(<InstructionBadge number={1} title="Step One" />);
    const wrapper = screen.getByTestId("instruction-badge-wrapper-1");
    expect(wrapper).toBeInTheDocument();
  });

  it("renders the number inside the badge", () => {
    render(<InstructionBadge number={2} title="Step Two" />);
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("renders the title with correct data-testid", () => {
    render(<InstructionBadge number={3} title="Step Three" />);
    const title = screen.getByTestId("instruction-badge-title-3");
    expect(title).toHaveTextContent("Step Three");
  });

  it("applies the correct classes to the wrapper", () => {
    render(<InstructionBadge number={4} title="Step Four" />);
    const wrapper = screen.getByTestId("instruction-badge-wrapper-4");
    expect(wrapper).toHaveClass(
      "flex",
      "gap-2",
      "bg-[#B6C2D3]/40",
      "p-6",
      "rounded-4xl"
    );
  });

  it("renders different numbers and titles correctly", () => {
    render(<InstructionBadge number={5} title="Final Step" />);
    expect(
      screen.getByTestId("instruction-badge-wrapper-5")
    ).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByTestId("instruction-badge-title-5")).toHaveTextContent(
      "Final Step"
    );
  });
});
