import { TxKeyPath } from "@/i18n";
import { useTranslations } from "next-intl";
import React from "react";
import DOMPurify from "isomorphic-dompurify";

/**
 * Translates text.
 *
 * @param t The translation function.
 * @param key The i18n key.
 * @param options The options object containing dynamic values.
 */
export const translate = (
  t: ReturnType<typeof useTranslations>,
  key: TxKeyPath,
  options?: Record<string, string | number>
) => {
  return key ? t(key, options) : "";
};

/**
 * Translates a given key using the provided translation function and renders the result as sanitized HTML.
 *
 * @param t - The translation function, typically returned by `useTranslations`.
 * @param key - The translation key path to look up the localized string.
 * @param options - Optional parameters to interpolate into the translation string.
 * @returns A React `<span>` element with the translated and sanitized HTML content.
 *
 * @remarks
 * This function uses `dangerouslySetInnerHTML` to render HTML content. The HTML is sanitized using DOMPurify
 * to prevent XSS attacks. Use this function only when you trust the translation source and need to render HTML.
 */
export const translateWithHtml = (
  t: ReturnType<typeof useTranslations>,
  key: TxKeyPath,
  options?: Record<string, string | number>
) => {
  const translated = translate(t, key, options);
  const sanitized = DOMPurify.sanitize(translated ? translated : "");
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: sanitized,
      }}
    />
  );
};
