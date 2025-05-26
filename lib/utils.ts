import { clsx, type ClassValue } from "clsx";
import { Locale } from "next-intl";
import { twMerge } from "tailwind-merge";

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
