import React from "react";
import { render, screen } from "@testing-library/react";
import Page from "../page";

// Mock the components used in the page
jest.mock("../components", () => ({
  AuthForm: (props: React.ComponentProps<"div">) => (
    <div {...props}>AuthForm</div>
  ),
  DividerForm: (props: React.ComponentProps<"div">) => (
    <div {...props}>DividerForm</div>
  ),
  EmailForm: (props: React.ComponentProps<"div">) => (
    <div {...props}>EmailForm</div>
  ),
  EmailFormSkeleton: (props: React.ComponentProps<"div">) => (
    <div {...props}>EmailFormSkeleton</div>
  ),
}));

jest.mock("@/providers", () => ({
  ClientOnlyProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="client-only-provider">{children}</div>
  ),
}));

describe("Login Page", () => {
  it("renders the login page container", () => {
    render(<Page />);
    expect(screen.getByTestId("login-page")).toBeInTheDocument();
  });

  it("renders AuthForm, DividerForm, and EmailForm", () => {
    render(<Page />);
    expect(screen.getByTestId("auth-form")).toBeInTheDocument();
    expect(screen.getByTestId("divider-form")).toBeInTheDocument();
    expect(screen.getByTestId("email-form")).toBeInTheDocument();
  });

  it("renders ClientOnlyProvider", () => {
    render(<Page />);
    expect(screen.getByTestId("client-only-provider")).toBeInTheDocument();
  });
});
