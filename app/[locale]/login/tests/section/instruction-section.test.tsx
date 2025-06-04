import React from "react";
import { render, screen } from "@testing-library/react";
import { InstructionSection } from "../../section";

// Mock dependencies
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => `translated:${key}`,
}));

jest.mock("@/lib", () => ({
  translate: (t: (key: string) => string, key: string) => t(key),
}));

jest.mock("@/components/auth-instruction/instruction-badge", () => {
  const MockInstructionBadge = ({
    "data-testid": dataTestId,
    title,
  }: {
    "data-testid": string;
    title: string;
  }) => <div data-testid={dataTestId}>{title}</div>;
  MockInstructionBadge.displayName = "MockInstructionBadge";
  return MockInstructionBadge;
});

jest.mock("@/components/auth-instruction/instruction-container", () => ({
  InstructionContainer: ({
    "data-testid": dataTestId,
    title,
    subTitle,
    topBadge,
    topBadgeTitleKey,
    bottomBadgeTitleKey,
    bottomBadge,
  }: {
    "data-testid": string;
    title: React.ReactNode;
    subTitle: React.ReactNode;
    topBadge: React.ReactNode;
    topBadgeTitleKey: React.ReactNode;
    bottomBadgeTitleKey: React.ReactNode;
    bottomBadge: React.ReactNode;
  }) => (
    <div data-testid={dataTestId}>
      <div data-testid="title">{title}</div>
      <div data-testid="subTitle">{subTitle}</div>
      <div data-testid="topBadge">{topBadge}</div>
      <div data-testid="topBadgeTitleKey">{topBadgeTitleKey}</div>
      <div data-testid="bottomBadgeTitleKey">{bottomBadgeTitleKey}</div>
      <div data-testid="bottomBadge">{bottomBadge}</div>
    </div>
  ),
}));

describe("InstructionSection", () => {
  it("renders InstructionContainer with correct props", () => {
    render(<InstructionSection />);
    expect(screen.getByTestId("instruction-container")).toBeInTheDocument();
    expect(screen.getByTestId("title")).toHaveTextContent(
      "login.instruction.title"
    );
    expect(screen.getByTestId("subTitle")).toHaveTextContent(
      "login.instruction.subtitle"
    );
    expect(screen.getByTestId("topBadgeTitleKey")).toHaveTextContent(
      "login.instruction.topBadge.title"
    );
    expect(screen.getByTestId("bottomBadgeTitleKey")).toHaveTextContent(
      "login.instruction.bottomBadge.title"
    );
  });

  it("renders top instruction badge with correct title", () => {
    render(<InstructionSection />);
    const topBadge = screen.getByTestId("top-instruction-badge");
    expect(topBadge).toHaveTextContent(
      "translated:login.instruction.topBadge.badgeTitle.1"
    );
  });

  it("renders two bottom instruction badges with correct titles", () => {
    render(<InstructionSection />);
    const badge1 = screen.getByTestId("bottom-instruction-badge-1");
    const badge2 = screen.getByTestId("bottom-instruction-badge-2");
    expect(badge1).toHaveTextContent(
      "translated:login.instruction.bottomBadge.badgeTitle.1"
    );
    expect(badge2).toHaveTextContent(
      "translated:login.instruction.bottomBadge.badgeTitle.2"
    );
  });
});
