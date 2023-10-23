export const LOCALE_COOKIE = 'locale' as const
export const locales = ['en', 'tw', 'fr', 'de', 'ru', 'nl', 'hu'] as const
export const defaultLocale = 'en' as const

export type Locale = (typeof locales)[number]

const dictionaries = locales.reduce(
  (acc, locale) => {
    return {
      ...acc,
      [locale]: () =>
        import(`./dictionaries/${locale}.json`).then((module) => module.default),
    }
  },
  {} as Record<Locale, () => Promise<Record<string, string>>>
)

export const getDictionary = (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries[defaultLocale]()
