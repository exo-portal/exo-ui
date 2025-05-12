import { EN } from '@/messages';

type DefaultLocale = typeof EN;
type TxKeyPath = RecursiveKeyOf<DefaultLocale>;
type RecursiveKeyOf<TObj extends Record<string, unknown>> = {
  [TKey in keyof TObj & string]: TObj[TKey] extends Record<string, unknown>
    ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
    : `${TKey}`;
}[keyof TObj & string];

export type { TxKeyPath };
