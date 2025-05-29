import { render, screen } from "@testing-library/react";
import ClientOnlyProvider from "../client-only-provider";

jest.useFakeTimers();

describe("ClientOnlyProvider", () => {
  it("renders children immediately in test environment", () => {
    render(
      <ClientOnlyProvider fallback={<div>Loading...</div>}>
        <div>Client Content</div>
      </ClientOnlyProvider>
    );
    expect(screen.getByText("Client Content")).toBeInTheDocument();
  });

  it("renders children after mounting", () => {
    render(
      <ClientOnlyProvider fallback={<div>Loading...</div>}>
        <div>Client Content</div>
      </ClientOnlyProvider>
    );
    // Fast-forward useEffect
    jest.runAllTimers();
    // Re-render after effect
    // @testing-library/react does not re-render automatically for useEffect,
    // so we need to use findByText which waits for the update
    return screen.findByText("Client Content").then((el) => {
      expect(el).toBeInTheDocument();
    });
  });

  it("renders children if no fallback is provided", async () => {
    render(
      <ClientOnlyProvider>
        <span>Only Client</span>
      </ClientOnlyProvider>
    );
    jest.runAllTimers();
    const el = await screen.findByText("Only Client");
    expect(el).toBeInTheDocument();
  });
});
