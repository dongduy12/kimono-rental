export const locales = ["vi", "en", "ja"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "vi";

import viMessages from "./messages/vi.json" assert { type: "json" };
import enMessages from "./messages/en.json" assert { type: "json" };
import jaMessages from "./messages/ja.json" assert { type: "json" };

type Messages = typeof viMessages;

const dictionary: Record<Locale, Messages> = {
  vi: viMessages,
  en: enMessages,
  ja: jaMessages,
};

export function getMessages(locale: string): Messages {
  if (locales.includes(locale as Locale)) {
    return dictionary[locale as Locale];
  }

  return dictionary[defaultLocale];
}
