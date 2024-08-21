import english from "../../resources/locales/en/common.json";
import spanish from "../../resources/locales/es/common.json";

export const supportedLanguages = ["en", "es"] as const;
export type Language = (typeof supportedLanguages)[number];

export type Resource = {
  common: typeof english;
};

export const resources: Record<Language, Resource> = {
  en: {
    common: english,
  },
  es: {
    common: spanish,
  },
};
