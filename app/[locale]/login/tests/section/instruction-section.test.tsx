import React from "react";
import { render, screen } from "@testing-library/react";
import { InstructionSection } from "../../section";

// Mock dependencies
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => `translated:${key}`,
}));
jest.mock("@/lib", () => ({
  translate: (t: any, key: string) => t(key),
}));
jest.mock(
  "@/components/auth-instruction/instruction-badge",
  () => (props: any) =>
    <div data-testid={props["data-testid"]}>{props.title}</div>
);
jest.mock("@/components/auth-instruction/instruction-container", () => ({
  InstructionContainer: (props: any) => (
    <div data-testid={props["data-testid"]}>
      <div data-testid="title">{props.title}</div>
      <div data-testid="subTitle">{props.subTitle}</div>
      <div data-testid="topBadge">{props.topBadge}</div>
      <div data-testid="topBadgeTitleKey">{props.topBadgeTitleKey}</div>
      <div data-testid="bottomBadgeTitleKey">{props.bottomBadgeTitleKey}</div>
      <div data-testid="bottomBadge">{props.bottomBadge}</div>
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
