import React from "react";
import { render, screen } from "@testing-library/react";
import page from "../page";

// Mock the components used in page
jest.mock("../components", () => ({
  AuthForm: (props: any) => <div {...props}>AuthForm</div>,
  DividerForm: (props: any) => <div {...props}>DividerForm</div>,
  EmailForm: (props: any) => <div {...props}>EmailForm</div>,
}));

// Mock next-intl's useTranslations
jest.mock("next-intl", () => ({
  useTranslations: () => jest.fn((key) => key),
}));

describe("Login Page", () => {
  it("renders the login page container", () => {
    render(React.createElement(page));
    expect(screen.getByTestId("login-page")).toBeInTheDocument();
  });

  it("renders AuthForm, DividerForm, and EmailForm components", () => {
    render(React.createElement(page));
    expect(screen.getByTestId("auth-form")).toBeInTheDocument();
    expect(screen.getByTestId("divider-form")).toBeInTheDocument();
    expect(screen.getByTestId("email-form")).toBeInTheDocument();
  });

  it("renders components in the correct order", () => {
    render(React.createElement(page));
    const container = screen.getByTestId("login-page");
    const children = Array.from(container.children);
    expect(children[0]).toHaveAttribute("data-testid", "auth-form");
    expect(children[1]).toHaveAttribute("data-testid", "divider-form");
    expect(children[2]).toHaveAttribute("data-testid", "email-form");
  });
});
