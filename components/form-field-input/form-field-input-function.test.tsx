import {
  generatePhoneFieldPlaceholder,
  TypeTelInput,
} from "@/components/form-field-input/form-field-input-function";
import { formatPhoneNumber, liveFormat } from "@/lib";

// Mocking the formatPhoneNumber and liveFormat functions
jest.mock("@/lib", () => ({
  formatPhoneNumber: jest.fn(({ value, country }) => `[${country}] ${value}`),
  liveFormat: jest.fn(
    ({ input, countryCode }) => `live-${countryCode}-${input}`
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

// TypeTelInput.onChangeTel Tests Case Start Here
describe("TypeTelInput.onChangeTel", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("formats and calls onChange with formatted value", () => {
    const mockOnChange = jest.fn();
    const mockEvent = {
      currentTarget: { value: "98765" },
    } as React.ChangeEvent<HTMLInputElement>;
    (liveFormat as jest.Mock).mockReturnValue("liveFormattedValue");
    (formatPhoneNumber as jest.Mock).mockReturnValue("finalFormattedValue");

    TypeTelInput.onChangeTel(mockEvent, "PH", "+63", mockOnChange);

    expect(liveFormat).toHaveBeenCalledWith({
      input: "98765",
      country: "PH",
      countryCode: "+63",
    });
    expect(formatPhoneNumber).toHaveBeenCalledWith({
      value: "liveFormattedValue",
      country: "PH",
    });
    expect(mockOnChange).toHaveBeenCalledWith("finalFormattedValue");
  });

  it("passes correct arguments from event", () => {
    const mockOnChange = jest.fn();
    const mockEvent = {
      currentTarget: { value: "555-6789" },
    } as React.ChangeEvent<HTMLInputElement>;

    TypeTelInput.onChangeTel(mockEvent, "US", "+1", mockOnChange);

    expect(liveFormat).toHaveBeenCalledWith({
      input: "555-6789",
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

// TypeTelInput.onKeyDownTel Tests Case Start Here
describe("TypeTelInput.onKeyDownTel", () => {
  it("calls preventDefault and blur when Enter key is pressed", () => {
    const preventDefault = jest.fn();
    const blur = jest.fn();
    const event = {
      key: "Enter",
      preventDefault,
      currentTarget: { blur },
    } as unknown as React.KeyboardEvent<HTMLInputElement>;

    TypeTelInput.onKeyDownTel(event);

    expect(preventDefault).toHaveBeenCalled();
    expect(blur).toHaveBeenCalled();
  });

  it("does nothing when a non-Enter key is pressed", () => {
    const preventDefault = jest.fn();
    const blur = jest.fn();
    const event = {
      key: "a",
      preventDefault,
      currentTarget: { blur },
    } as unknown as React.KeyboardEvent<HTMLInputElement>;

    TypeTelInput.onKeyDownTel(event);

    expect(preventDefault).not.toHaveBeenCalled();
    expect(blur).not.toHaveBeenCalled();
  });
});

// TypeTelInput.onBlurTel Tests Case Start Here
describe("TypeTelInput.onBlurTel", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("formats and calls onChange with formatted value", () => {
    const mockOnChange = jest.fn();
    const mockEvent = {
      currentTarget: { value: "1234567890" },
    } as React.FocusEvent<HTMLInputElement>;
    (formatPhoneNumber as jest.Mock).mockReturnValue("formattedOnBlur");

    TypeTelInput.onBlurTel(mockEvent, mockOnChange, "PH");

    expect(formatPhoneNumber).toHaveBeenCalledWith({
      value: "1234567890",
      country: "PH",
    });
    expect(mockOnChange).toHaveBeenCalledWith("formattedOnBlur");
  });

  it("passes correct arguments from event", () => {
    const mockOnChange = jest.fn();
    const mockEvent = {
      currentTarget: { value: "555-0000" },
    } as React.FocusEvent<HTMLInputElement>;

    TypeTelInput.onBlurTel(mockEvent, mockOnChange, "US");

    expect(formatPhoneNumber).toHaveBeenCalledWith({
      value: "555-0000",
      country: "US",
    });
    expect(mockOnChange).toHaveBeenCalled();
  });
});
