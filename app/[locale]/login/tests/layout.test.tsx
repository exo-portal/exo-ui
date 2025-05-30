import React from "react";
import { render, screen } from "@testing-library/react";
import LoginLayout from "../layout";

// Mock the InstructionSection component
jest.mock("./section", () => ({
  InstructionSection: () => <div data-testid="instruction-section" />,
}));

describe("LoginLayout", () => {
  it("renders the main layout with correct test id", () => {
    render(
      <LoginLayout>
        <div>Test Child</div>
      </LoginLayout>
    );
    expect(screen.getByTestId("login-layout-main")).toBeInTheDocument();
  });

  it("renders the InstructionSection", () => {
    render(
      <LoginLayout>
        <div>Test Child</div>
      </LoginLayout>
    );
    expect(screen.getByTestId("instruction-section")).toBeInTheDocument();
  });

  it("renders the children inside the section", () => {
    render(
      <LoginLayout>
        <div data-testid="child">Test Child</div>
      </LoginLayout>
    );
    const section = screen.getByTestId("login-layout-section");
    expect(section).toBeInTheDocument();
    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(section).toContainElement(screen.getByTestId("child"));
  });
});
