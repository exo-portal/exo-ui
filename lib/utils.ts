import { clsx, type ClassValue } from "clsx";
import { Locale } from "next-intl";
import { twMerge } from "tailwind-merge";
import { parsePhoneNumberFromString, AsYouType } from "libphonenumber-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCurrentLocale = (): Locale => {
  const path = window.location.pathname;
  const localeMatch = path.match(/^\/([a-z]{2})(\/|$)/);

  if (localeMatch) {
    const locale = localeMatch[1];
    return locale;
  }
  return "en"; // Default locale if none is found
};

export const formatPhoneNumber = ({
  value,
  country,
}: {
  value: string;
  country: string;
}): string => {
  if (country === "PH" || country === "US") {
    const phoneNumber = parsePhoneNumberFromString(value, country);
    return phoneNumber ? phoneNumber.formatInternational() : value;
  }

  return value; // Return the original value if country is not supported
};

// Live formatting as user types
// TODO:: enhance this to handle more countries and formats
export const liveFormat = ({
  input,
  country,
  countryCode,
}: {
  input: string;
  country: string;
  countryCode: string;
}): string => {
  if (country === "PH" || country === "US") {
    const cleaned = input.startsWith(countryCode) ? input : `${countryCode}${input}`;
    return new AsYouType().input(cleaned);
  }

  return input; // Return the original input if country is not supported
};
