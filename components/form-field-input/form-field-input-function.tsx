import { formatPhoneNumber, liveFormat } from "@/lib";

/**
 * Handles the blur event for a telephone input field by formatting the phone number
 * according to the specified country and updating the input value.
 *
 * @param e - The blur event from the input element.
 * @param onChange - Callback function to update the input value.
 * @param country - The country code used for formatting the phone number.
 */
const onBlurTel = (
  e: React.FocusEvent<HTMLInputElement>,
  onChange: (value: string) => void,
  country: string
) => {
  const inputValue = e.currentTarget.value;
  const formattedValue = formatPhoneNumber({
    value: inputValue,
    country: country,
  });
  onChange(formattedValue);
};

/**
 * Handles the `onKeyDown` event for telephone input fields.
 *
 * Prevents the default action and removes focus from the input when the Enter key is pressed.
 *
 * @param e - The keyboard event triggered on the input element.
 */
const onKeyDownTel = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter") {
    e.preventDefault();
    e.currentTarget.blur();
  }
};

/**
 * Handles the change event for a telephone input field, formats the input value
 * according to the specified country and country code, and invokes the provided
 * onChange callback with the formatted phone number.
 *
 * @param e - The change event from the input element.
 * @param country - The country identifier used for formatting the phone number.
 * @param countryCode - The country code used for formatting the phone number.
 * @param onChange - Callback function to be called with the formatted phone number.
 */
const onChangeTel = (
  e: React.ChangeEvent<HTMLInputElement>,
  country: string,
  countryCode: string,
  onChange: (value: string) => void
) => {
  const inputValue = e.currentTarget.value;
  const stringValue = liveFormat({
    input: inputValue,
    country: country,
    countryCode: countryCode,
  });

  const formattedValue = formatPhoneNumber({
    value: stringValue,
    country: country,
  });
  onChange(formattedValue);
};

/**
 * Handles the focus event for a telephone input field by formatting the input value
 * according to the specified country and country code, then triggers the onChange callback
 * with the formatted phone number.
 *
 * @param e - The focus event from the input element.
 * @param onChange - Callback function to update the input value.
 * @param country - The country identifier used for formatting.
 * @param countryCode - The country code used for formatting.
 */
const onFocusTel = (
  e: React.FocusEvent<HTMLInputElement>,
  onChange: (value: string) => void,
  country: string,
  countryCode: string
) => {
  const inputValue = e.currentTarget.value;
  const stringValue = liveFormat({
    input: inputValue,
    country: country,
    countryCode: countryCode,
  });

  const formattedValue = formatPhoneNumber({
    value: stringValue,
    country: country,
  });

  onChange(formattedValue);
};

/**
 * Generates a formatted phone number placeholder based on the provided country code.
 *
 * @param country - The ISO country code (e.g., "PH" for Philippines, "US" for United States).
 * @returns A formatted phone number string suitable for use as a placeholder.
 *
 * @example
 * generatePhoneFieldPlaceholder("PH"); // returns a formatted Philippine phone number placeholder
 * generatePhoneFieldPlaceholder("US"); // returns a formatted US phone number placeholder
 */
export const generatePhoneFieldPlaceholder = (country: string): string => {
  switch (country) {
    case "PH":
      return formatPhoneNumber({ value: "917 123 4567", country: country }); // Example format for Philippines
    case "US":
      return formatPhoneNumber({ value: "202 555 0125", country: country }); // Example format for United States
    default:
      return ""; // Neutral default placeholder
  }
};

export const TypeTelInput = {
  onBlurTel,
  onKeyDownTel,
  onChangeTel,
  onFocusTel,
};
