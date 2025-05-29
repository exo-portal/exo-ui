import { render } from "@testing-library/react";
import GlobalAuth from "../global-auth";
const useAuthStore = require("@/store").useAuthStore;

// Mock the useAuthStore hook
jest.mock("@/store", () => ({
  useAuthStore: jest.fn(),
}));

describe("GlobalAuth", () => {
  it("calls validateToken on mount", () => {
    const validateToken = jest.fn();
    useAuthStore.mockImplementation((selector: any) =>
      selector({ validateToken })
    );

    render(<GlobalAuth />);

    expect(validateToken).toHaveBeenCalledTimes(1);
  });
});
