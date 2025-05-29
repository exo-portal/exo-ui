import { act } from "@testing-library/react";
import { useAppStateStore } from "../app-state-store";

describe("useAppStateStore", () => {
  beforeEach(() => {
    // Reset Zustand store state before each test
    useAppStateStore.setState({ isLoading: false });
  });

  it("should have initial isLoading as false", () => {
    expect(useAppStateStore.getState().isLoading).toBe(false);
  });

  it("should set isLoading to true", () => {
    act(() => {
      useAppStateStore.getState().setIsLoading(true);
    });
    expect(useAppStateStore.getState().isLoading).toBe(true);
  });

  it("should set isLoading to false", () => {
    act(() => {
      useAppStateStore.getState().setIsLoading(true);
      useAppStateStore.getState().setIsLoading(false);
    });
    expect(useAppStateStore.getState().isLoading).toBe(false);
  });
});
