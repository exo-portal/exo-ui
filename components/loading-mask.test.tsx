import { render } from "@testing-library/react";
import LoadingMask from "./loading-mask";
const mockedUseAppStateStore = require("@/store").useAppStateStore as jest.Mock;

// Mock the useAppStateStore hook
jest.mock("@/store", () => ({
  useAppStateStore: jest.fn(),
}));

describe("LoadingMask", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the loading mask when isLoading is true", () => {
    mockedUseAppStateStore.mockReturnValue({ isLoading: true });
    render(<LoadingMask />);
    const div = document.querySelector(
      ".fixed.h-screen.w-screen.cursor-progress.z-50"
    );
    expect(div).toBeInTheDocument();
    expect(div).not.toHaveAttribute("hidden");
  });
});

// Mock the useAppStateStore hook
jest.mock("@/store", () => ({
  useAppStateStore: jest.fn(),
}));

describe("LoadingMask", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the loading mask when isLoading is true", () => {
    mockedUseAppStateStore.mockReturnValue({ isLoading: true });
    render(<LoadingMask />);
    const div = document.querySelector(
      ".fixed.h-screen.w-screen.cursor-progress.z-50"
    );
    expect(div).toBeInTheDocument();
    expect(div).not.toHaveAttribute("hidden");
  });

  it("hides the loading mask when isLoading is false", () => {
    mockedUseAppStateStore.mockReturnValue({ isLoading: false });
    render(<LoadingMask />);
    const div = document.querySelector(
      ".fixed.h-screen.w-screen.cursor-progress.z-50"
    );
    expect(div).toBeInTheDocument();
    expect(div).toHaveAttribute("hidden");
  });

  it("renders only one loading mask div", () => {
    mockedUseAppStateStore.mockReturnValue({ isLoading: true });
    render(<LoadingMask />);
    const divs = document.querySelectorAll(
      ".fixed.h-screen.w-screen.cursor-progress.z-50"
    );
    expect(divs.length).toBe(1);
  });

  it("does not render any children inside the loading mask", () => {
    mockedUseAppStateStore.mockReturnValue({ isLoading: true });
    render(<LoadingMask />);
    const div = document.querySelector(
      ".fixed.h-screen.w-screen.cursor-progress.z-50"
    );
    expect(div?.childElementCount).toBe(0);
  });

  it("renders the loading mask with correct class names", () => {
    mockedUseAppStateStore.mockReturnValue({ isLoading: true });
    render(<LoadingMask />);
    const div = document.querySelector(
      ".fixed.h-screen.w-screen.cursor-progress.z-50"
    );
    expect(div).toHaveClass(
      "fixed",
      "h-screen",
      "w-screen",
      "cursor-progress",
      "z-50"
    );
  });

  it("updates visibility when isLoading changes", () => {
    const { rerender } = render(<LoadingMask />);
    mockedUseAppStateStore.mockReturnValue({ isLoading: true });
    rerender(<LoadingMask />);
    let div = document.querySelector(
      ".fixed.h-screen.w-screen.cursor-progress.z-50"
    );
    expect(div).not.toHaveAttribute("hidden");

    mockedUseAppStateStore.mockReturnValue({ isLoading: false });
    rerender(<LoadingMask />);
    div = document.querySelector(
      ".fixed.h-screen.w-screen.cursor-progress.z-50"
    );
    expect(div).toHaveAttribute("hidden");
  });
});
