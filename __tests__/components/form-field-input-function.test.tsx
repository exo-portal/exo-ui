import {
  generatePhoneFieldPlaceholder,
  TypeTelInput,
} from "@/components/form-field-input/form-field-input-function";
import { formatPhoneNumber, liveFormat } from "@/lib";

// Mocking the formatPhoneNumber and liveFormat functions
jest.mock("@/lib", () => ({
  formatPhoneNumber: jest.fn(({ value, country }) => `[${country}] ${value}`),
  liveFormat: jest.fn(
    ({ input, country, countryCode }) => `live-${countryCode}-${input}`
  ),
}));

// generatePhoneFieldPlaceholder Tests Case Start Here
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

// TypeTelInput.onFocusTel Tests Case Start Here
describe("TypeTelInput.onFocusTel", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("formats and calls onChange with formatted value", () => {
    const mockOnChange = jest.fn();
    const mockEvent = {
      currentTarget: { value: "12345" },
    } as React.FocusEvent<HTMLInputElement>;
    (liveFormat as jest.Mock).mockReturnValue("formattedValue");
    (formatPhoneNumber as jest.Mock).mockReturnValue("finalValue");

    TypeTelInput.onFocusTel(mockEvent, mockOnChange, "PH", "+63");

    expect(liveFormat).toHaveBeenCalledWith({
      input: "12345",
      country: "PH",
      countryCode: "+63",
    });
    expect(formatPhoneNumber).toHaveBeenCalledWith({
      value: "formattedValue",
      country: "PH",
    });
    expect(mockOnChange).toHaveBeenCalledWith("finalValue");
  });

  it("passes correct arguments from event", () => {
    const mockOnChange = jest.fn();
    const mockEvent = {
      currentTarget: { value: "555-1234" },
    } as React.FocusEvent<HTMLInputElement>;

    TypeTelInput.onFocusTel(mockEvent, mockOnChange, "US", "+1");

    expect(liveFormat).toHaveBeenCalledWith({
      input: "555-1234",
      country: "US",
      countryCode: "+1",
    });
    expect(formatPhoneNumber).toHaveBeenCalledWith({
      value: expect.any(String),
      country: "US",
    });
    expect(mockOnChange).toHaveBeenCalled();
  });
});
