import { TxKeyPath } from "@/i18n";
import { useTranslations } from "next-intl";

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
