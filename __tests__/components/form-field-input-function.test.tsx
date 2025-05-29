import { generatePhoneFieldPlaceholder } from "@/components/form-field-input/form-field-input-function";
import { formatPhoneNumber } from "@/lib";

jest.mock("@/lib", () => ({
  formatPhoneNumber: jest.fn(({ value, country }) => {
    return `[${country}] ${value}`;
  }),
}));

describe("generatePhoneFieldPlaceholder", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns formatted PH placeholder", () => {
    const result = generatePhoneFieldPlaceholder("PH");
    expect(formatPhoneNumber).toHaveBeenCalledWith({
      value: "917 123 4567",
      country: "PH",
    });
    expect(result).toBe("[PH] 917 123 4567");
  });

  it("returns formatted US placeholder", () => {
    const result = generatePhoneFieldPlaceholder("US");
    expect(formatPhoneNumber).toHaveBeenCalledWith({
      value: "202 555 0125",
      country: "US",
    });
    expect(result).toBe("[US] 202 555 0125");
  });

  it("returns empty string for unknown country", () => {
    const result = generatePhoneFieldPlaceholder("XX");
    expect(formatPhoneNumber).not.toHaveBeenCalled();
    expect(result).toBe("");
  });

  it("returns empty string for empty country", () => {
    const result = generatePhoneFieldPlaceholder("");
    expect(formatPhoneNumber).not.toHaveBeenCalled();
    expect(result).toBe("");
  });
});
