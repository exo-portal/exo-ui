import React from "react";
import { render } from "@testing-library/react";
import { ForgotPasswordForm } from "@/app/[locale]/forgot-password/component";

// Mock the useAppStateStore hook
jest.mock("@/store", () => ({
  useAppStateStore: jest.fn(),
}));

describe("ForgotPasswordForm", () => {
  it("renders the Forgot text", () => {
    // Mock setIsLoading as a jest function
    const setIsLoading = jest.fn();
    // @ts-ignore
    require("@/store").useAppStateStore.mockReturnValue({ setIsLoading });

    const { getByText } = render(<ForgotPasswordForm />);
    expect(getByText("Forgot")).toBeInTheDocument();
  });

  it("calls setIsLoading(false) on mount", () => {
    const setIsLoading = jest.fn();
    // @ts-ignore
    require("@/store").useAppStateStore.mockReturnValue({ setIsLoading });

    render(<ForgotPasswordForm />);
    expect(setIsLoading).toHaveBeenCalledWith(false);
  });
});
