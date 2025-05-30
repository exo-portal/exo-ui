import React from "react";
import { render, screen } from "@testing-library/react";
import { ForgotPasswordInstructionSection } from "@/app/[locale]/forgot-password/section";
const { usePathname } = require("next/navigation");

// Mocks
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));
jest.mock("@/lib", () => ({
  translate: (_t: any, key: string) => `translated:${key}`,
}));
jest.mock("@/components/auth-instruction/instruction-badge", () => ({
  __esModule: true,
  default: ({ number, title }: { number: number; title: string }) => (
    <div data-testid="instruction-badge">{`${number}-${title}`}</div>
  ),
}));
jest.mock("@/components/auth-instruction/instruction-container", () => ({
  InstructionContainer: ({
    title,
    subTitle,
    topBadge,
    topBadgeTitleKey,
  }: any) => (
    <div>
      <div data-testid="title">{title}</div>
      <div data-testid="subtitle">{subTitle}</div>
      <div data-testid="topBadgeTitleKey">{topBadgeTitleKey}</div>
      <div data-testid="topBadge">{topBadge}</div>
    </div>
  ),
}));
jest.mock("@/config", () => ({
  PATH: {
    FORGOT_PASSWORD: { path: "/forgot-password" },
    FORGOT_PASSWORD_OTP: { path: "/forgot-password/otp" },
    FORGOT_PASSWORD_RESET: { path: "/forgot-password/reset" },
    REGISTER: { path: "/register" },
  },
}));

describe("ForgotPasswordInstructionSection", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders enter email instruction for /forgot-password", () => {
    usePathname.mockReturnValue("/forgot-password");
    render(<ForgotPasswordInstructionSection />);
    expect(screen.getByTestId("title").textContent).toBe(
      "forgotPassword.instruction.enterEmail.title"
    );
    expect(screen.getByTestId("subtitle").textContent).toBe(
      "forgotPassword.instruction.enterEmail.subtitle"
    );
    expect(screen.getByTestId("topBadgeTitleKey").textContent).toBe(
      "forgotPassword.instruction.enterEmail.topBadge.title"
    );
    const badges = screen.getAllByTestId("instruction-badge");
    expect(badges).toHaveLength(2);
    expect(badges[0].textContent).toBe(
      "1-translated:forgotPassword.instruction.enterEmail.topBadge.badgeTitle.1"
    );
    expect(badges[1].textContent).toBe(
      "2-translated:forgotPassword.instruction.enterEmail.topBadge.badgeTitle.2"
    );
  });

  it("renders OTP instruction for /forgot-password/otp", () => {
    usePathname.mockReturnValue("/forgot-password/otp");
    render(<ForgotPasswordInstructionSection />);
    expect(screen.getByTestId("title").textContent).toBe(
      "forgotPassword.instruction.otp.title"
    );
    expect(screen.getAllByTestId("instruction-badge")).toHaveLength(3);
  });

  it("renders reset instruction for /forgot-password/reset", () => {
    usePathname.mockReturnValue("/forgot-password/reset");
    render(<ForgotPasswordInstructionSection />);
    expect(screen.getByTestId("title").textContent).toBe(
      "forgotPassword.instruction.reset.title"
    );
    expect(screen.getAllByTestId("instruction-badge")).toHaveLength(3);
  });

  it("strips locale prefix from pathname", () => {
    usePathname.mockReturnValue("/en/forgot-password");
    render(<ForgotPasswordInstructionSection />);
    expect(screen.getByTestId("title").textContent).toBe(
      "forgotPassword.instruction.enterEmail.title"
    );
  });
});
