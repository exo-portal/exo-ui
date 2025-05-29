import React from "react";
import { render, screen } from "@testing-library/react";
import InstructionSection from "./instruction-section";

// Mock dependencies
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));
jest.mock("@/lib", () => ({
  translate: (_t: any, key: string) => key,
}));
jest.mock("../component", () => ({
  InstructionBadge: ({ number, title }: { number: number; title: string }) => (
    <span data-testid={`instruction-badge-${number}`}>{title}</span>
  ),
}));
jest.mock("@/components/ui/separator", () => ({
  Separator: () => <hr data-testid="separator" />,
}));

describe("InstructionSection", () => {
  it("renders the company logo", () => {
    render(<InstructionSection />);
    expect(screen.getByTestId("company-logo")).toBeInTheDocument();
  });

  it("renders the instruction header", () => {
    render(<InstructionSection />);
    expect(screen.getByTestId("instruction-header")).toBeInTheDocument();
  });

  it("renders the main headings", () => {
    render(<InstructionSection />);
    expect(
      screen.getByText("register.instruction.getStartedwithUs")
    ).toBeInTheDocument();
    expect(
      screen.getByText("register.instruction.chooseSignupType")
    ).toBeInTheDocument();
  });

  it("renders OAuth instruction label and badge", () => {
    render(<InstructionSection />);
    expect(
      screen.getByText("register.instruction.signUpWithOAuth")
    ).toBeInTheDocument();
    expect(
      screen.getByText("register.instruction.signUpWithExistingAccounts")
    ).toBeInTheDocument();
    expect(screen.getByTestId("instruction-badge-1")).toBeInTheDocument();
  });

  it("renders separator", () => {
    render(<InstructionSection />);
    expect(screen.getByTestId("separator")).toBeInTheDocument();
  });

  it("renders email/phone instruction labels and badges", () => {
    render(<InstructionSection />);
    expect(
      screen.getByText("register.instruction.signUpWithEmailOrPhone")
    ).toBeInTheDocument();
    expect(
      screen.getByText("register.instruction.signUpWithEmailOrPhoneDescription")
    ).toBeInTheDocument();
    expect(
      screen.getByText("register.instruction.signUpWithUsernameAndPassword")
    ).toBeInTheDocument();
    expect(
      screen.getByText("register.instruction.continueButton")
    ).toBeInTheDocument();
    expect(screen.getByTestId("instruction-badge-1")).toBeInTheDocument();
    expect(screen.getByTestId("instruction-badge-2")).toBeInTheDocument();
    expect(screen.getByTestId("instruction-badge-3")).toBeInTheDocument();
    expect(screen.getByTestId("instruction-badge-4")).toBeInTheDocument();
  });
});
