import { clsx, type ClassValue } from "clsx";
import { Locale, useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";
import { parsePhoneNumberFromString, AsYouType } from "libphonenumber-js";
import { UseFormReturn } from "react-hook-form";
import { translate } from "./translate";
import { TxKeyPath } from "@/i18n";
import { ExoPortalErrorMessage } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCurrentLocale = (): Locale => {
  if (typeof window === "undefined" || !window) {
    return "en"; // Default locale for SSR or fallback
  }
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
    const cleaned = input.startsWith(countryCode)
      ? input
      : `${countryCode}${input}`;
    return new AsYouType(country).input(cleaned);
  }

  return input; // Return the original input if country is not supported
};

export const metaDataTitle = (title: string): string => {
  return `${title} | ExoPortal`;
};

export function handleErrorMessage<
  TFieldValues extends Record<string, unknown>,
  TFieldName extends keyof TFieldValues
>({
  data,
  form,
  allowedFields,
  useTranslate,
}: {
  data: ExoPortalErrorMessage;
  form: UseFormReturn<TFieldValues>;
  allowedFields: TFieldName[];
  useTranslate: ReturnType<typeof useTranslations>;
}) {
  if (
    typeof data?.errorType === "string" &&
    data.errorType.toLowerCase() === "field"
  ) {
    if (Array.isArray(data.errorMessageList)) {
      data.errorMessageList.forEach(
        (err: { fieldName: string; errorMessage: string }) => {
          if (allowedFields.includes(err.fieldName as TFieldName)) {
            form.setError(
              err.fieldName as unknown as import("react-hook-form").Path<TFieldValues>,
              {
                type: "manual",
                message: translate(useTranslate, err.errorMessage as TxKeyPath),
              }
            );
            form.setFocus(
              err.fieldName as unknown as import("react-hook-form").Path<TFieldValues>
            );
          }
        }
      );
    }
  }
}
