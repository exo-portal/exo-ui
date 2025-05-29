import { render, screen } from "@testing-library/react";
import ClientOnly from "../client-only";

jest.useFakeTimers();

describe("ClientOnly", () => {
  it("renders children immediately in test environment", () => {
    render(
      <ClientOnly fallback={<div>Loading...</div>}>
        <div>Client Content</div>
      </ClientOnly>
    );
    expect(screen.getByText("Client Content")).toBeInTheDocument();
  });

  it("renders children after mounting", () => {
    render(
      <ClientOnly fallback={<div>Loading...</div>}>
        <div>Client Content</div>
      </ClientOnly>
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
      <ClientOnly>
        <span>Only Client</span>
      </ClientOnly>
    );
    jest.runAllTimers();
    const el = await screen.findByText("Only Client");
    expect(el).toBeInTheDocument();
  });
});
