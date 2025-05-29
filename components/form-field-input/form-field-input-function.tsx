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
  onChange: any,
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
  onChange: any
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
export const TypeTelInput = {
  onBlurTel,
  onKeyDownTel,
  onChangeTel,
};
