import React from "react";
import { render, screen } from "@testing-library/react";
import InstructionBadge from "../instruction-badge";

describe("InstructionBadge", () => {
  it("renders the number and title correctly", () => {
    render(<InstructionBadge number={1} title="Step One" />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByTestId("instruction-badge-1")).toHaveTextContent(
      "Step One"
    );
  });

  it("applies the correct test id based on number", () => {
    render(<InstructionBadge number={5} title="Fifth Step" />);
    expect(screen.getByTestId("instruction-badge-5")).toBeInTheDocument();
    expect(screen.getByTestId("instruction-badge-5")).toHaveTextContent(
      "Fifth Step"
    );
  });

  it("renders with the correct classes", () => {
    render(<InstructionBadge number={2} title="Second Step" />);
    const outerDiv = screen.getByText("2").parentElement;
    expect(outerDiv).toHaveClass(
      "flex",
      "gap-2",
      "bg-[#B6C2D3]/40",
      "p-6",
      "rounded-4xl"
    );
  });
});
