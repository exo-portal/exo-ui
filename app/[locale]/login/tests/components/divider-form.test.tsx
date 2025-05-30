import React from "react";
import { render, screen } from "@testing-library/react";
import { DividerForm } from "../../components/divider-form";

// Mock next-intl's useTranslations
jest.mock("next-intl", () => ({
  useTranslations: () => jest.fn((key: string) => key),
}));

// Mock translate function
jest.mock("@/lib", () => ({
  translate: (_t: any, key: string) => key,
}));

describe("DividerForm", () => {
  it("renders the divider container", () => {
    render(<DividerForm />);
    expect(screen.getByTestId("divider-form")).toBeInTheDocument();
  });

  it("renders left and right divider lines", () => {
    render(<DividerForm />);
    expect(screen.getByTestId("divider-line-left")).toBeInTheDocument();
    expect(screen.getByTestId("divider-line-right")).toBeInTheDocument();
  });

  it("renders the divider text with correct translation key", () => {
    render(<DividerForm />);
    const dividerText = screen.getByTestId("divider-text");
    expect(dividerText).toBeInTheDocument();
    expect(dividerText).toHaveTextContent("login.form.signIn.or");
  });
});
