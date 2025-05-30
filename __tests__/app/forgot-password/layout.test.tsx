import React from "react";
import { render, screen } from "@testing-library/react";
import ForgotPasswordLayout from "../../../app/[locale]/forgot-password/layout";

// Mock the ForgotPasswordInstructionSection component
jest.mock("../../../app/[locale]/forgot-password/section", () => ({
  ForgotPasswordInstructionSection: (props: any) => (
    <div
      data-testid={
        props["data-testid"] || "forgot-password-instruction-section"
      }
    >
      Mocked Instruction Section
    </div>
  ),
}));

describe("ForgotPasswordLayout", () => {
  it("renders the main layout with correct test id", () => {
    render(
      <ForgotPasswordLayout>
        <div>Test Child</div>
      </ForgotPasswordLayout>
    );
    expect(
      screen.getByTestId("forgot-password-layout-main")
    ).toBeInTheDocument();
  });

  it("renders the ForgotPasswordInstructionSection", () => {
    render(
      <ForgotPasswordLayout>
        <div>Test Child</div>
      </ForgotPasswordLayout>
    );
    expect(
      screen.getByTestId("forgot-password-instruction-section")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("forgot-password-instruction-section")
    ).toHaveTextContent("Mocked Instruction Section");
  });

  it("renders the section with children and correct test id", () => {
    render(
      <ForgotPasswordLayout>
        <span data-testid="child-element">Test Child</span>
      </ForgotPasswordLayout>
    );
    const section = screen.getByTestId("forgot-password-layout-section");
    expect(section).toBeInTheDocument();
    expect(screen.getByTestId("child-element")).toBeInTheDocument();
    expect(section).toContainElement(screen.getByTestId("child-element"));
  });
});
