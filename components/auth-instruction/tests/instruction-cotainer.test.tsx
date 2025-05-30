import React from "react";
import { render, screen } from "@testing-library/react";
import { TxKeyPath } from "@/i18n";
import InstructionBadge from "../instruction-badge";
import { translate } from "@/lib";
import { useTranslations } from "next-intl";
import { InstructionContainer } from "../instruction-container";

// Mock dependencies
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));
jest.mock("@/lib", () => ({
  translate: (_t: any, key: string) => `translated:${key}`,
}));
jest.mock("@/components/ui/separator", () => ({
  Separator: () => <div data-testid="separator" />,
}));

describe("InstructionContainer", () => {
  const defaultProps = {
    title: "register.instruction.register.title.1" as TxKeyPath,
    subTitle: "register.instruction.register.subtitle.1" as TxKeyPath,
    topBadge: (
      <InstructionBadge
        data-testid="top-badge"
        title={translate(
          useTranslations(),
          "register.instruction.register.topBadge.badgeTitle.1"
        )}
        number={1}
      />
    ),
    topBadgeTitleKey:
      "register.instruction.register.topBadge.badgeTitle.1" as TxKeyPath,
  };

  it("renders the container and header elements", () => {
    render(<InstructionContainer {...defaultProps} />);
    expect(screen.getByTestId("instruction-header")).toBeInTheDocument();
    expect(screen.getByTestId("company-logo")).toBeInTheDocument();
  });

  it("renders translated title and subtitle", () => {
    render(<InstructionContainer {...defaultProps} />);
    expect(
      screen.getByText("translated:register.instruction.register.title.1")
    ).toBeInTheDocument();
    expect(
      screen.getByText("translated:register.instruction.register.subtitle.1")
    ).toBeInTheDocument();
  });

  it("renders correct class names on aside", () => {
    render(<InstructionContainer {...defaultProps} />);
    const aside = screen.getByTestId("instruction-header").closest("aside");
    expect(aside).toHaveClass("basis-4/12");
    expect(aside).toHaveClass("bg-main-700");
    expect(aside).toHaveClass("flex");
    expect(aside).toHaveClass("flex-col");
    expect(aside).toHaveClass("px-11");
    expect(aside).toHaveClass("py-12");
  });

  it("renders company logo with correct styles", () => {
    render(<InstructionContainer {...defaultProps} />);
    const logo = screen.getByTestId("company-logo");
    expect(logo).toHaveClass("h-[50px]");
    expect(logo).toHaveClass("w-[120px]");
    expect(logo).toHaveClass("bg-neutral-50");
    expect(logo).toHaveClass("rounded-lg");
  });

  it("renders both badges and their labels when both are provided", () => {
    render(
      <InstructionContainer
        {...defaultProps}
        bottomBadge={
          <InstructionBadge
            number={1}
            title={translate(
              useTranslations(),
              "register.instruction.register.bottomBadge.badgeTitle.1"
            )}
          />
        }
        bottomBadgeTitleKey="register.instruction.register.bottomBadge.title"
      />
    );
    const badges = screen.getAllByTestId("instruction-badge-1");
    expect(badges).toHaveLength(4);
    expect(badges[0]).toHaveTextContent(
      "translated:register.instruction.register.topBadge.badgeTitle.1"
    );
    expect(badges[1]).toHaveTextContent(
      "translated:register.instruction.register.topBadge.badgeTitle.1"
    );
    expect(badges[2]).toHaveTextContent(
      "translated:register.instruction.register.bottomBadge.badgeTitle.1"
    );
    expect(badges[3]).toHaveTextContent(
      "translated:register.instruction.register.bottomBadge.badgeTitle.1"
    );
    expect(
      screen.getByText(
        "translated:register.instruction.register.bottomBadge.badgeTitle.1"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "translated:register.instruction.register.bottomBadge.title"
      )
    ).toBeInTheDocument();
  });

  it("renders subtitle with correct class", () => {
    render(<InstructionContainer {...defaultProps} />);
    const subtitle = screen.getByText(
      "translated:register.instruction.register.subtitle.1"
    );
    expect(subtitle).toHaveClass("text-body-normal");
    expect(subtitle).toHaveClass("text-neutral-50");
  });

  it("renders title with correct class", () => {
    render(<InstructionContainer {...defaultProps} />);
    const title = screen.getByText(
      "translated:register.instruction.register.title.1"
    );
    expect(title).toHaveClass("text-body-large");
    expect(title).toHaveClass("text-neutral-50");
    expect(title).toHaveClass("font-bold");
  });

  it("does not render bottom badge section if not provided", () => {
    render(<InstructionContainer {...defaultProps} />);
    expect(screen.queryByTestId("separator")).not.toBeInTheDocument();
  });

  it("renders bottom badge and its label when provided", () => {
    render(
      <InstructionContainer
        {...defaultProps}
        bottomBadge={<div data-testid="bottom-badge">BottomBadge</div>}
        bottomBadgeTitleKey="register.instruction.register.bottomBadge.title"
      />
    );
    expect(screen.getByTestId("separator")).toBeInTheDocument();
    expect(
      screen.getByText(
        "translated:register.instruction.register.bottomBadge.title"
      )
    ).toBeInTheDocument();
    expect(screen.getByTestId("bottom-badge")).toBeInTheDocument();
  });

  it("does not render bottom badge section if only one of bottomBadge or bottomBadgeTitleKey is provided", () => {
    const { rerender } = render(
      <InstructionContainer
        {...defaultProps}
        bottomBadge={<div data-testid="bottom-badge">BottomBadge</div>}
      />
    );
    expect(screen.queryByTestId("separator")).not.toBeInTheDocument();

    rerender(
      <InstructionContainer
        {...defaultProps}
        bottomBadgeTitleKey="register.instruction.register.bottomBadge.title"
      />
    );
    expect(screen.queryByTestId("separator")).not.toBeInTheDocument();
  });
});
