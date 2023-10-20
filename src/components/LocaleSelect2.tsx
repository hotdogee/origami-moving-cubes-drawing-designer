'use client'
import { Locale, defaultLocale, locales } from '@/i18n'
import { Noto_Color_Emoji } from 'next/font/google'
import Link from 'next/link'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

const noto_color_emoji = Noto_Color_Emoji({
  weight: '400',
  subsets: ['emoji'],
  // fallback: ['var(--font-noto)'],
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: false,
})

export default function LocaleSelect() {
  const pathname = usePathname()
  const params = useParams()
  const router = useRouter()
  const [locale, setLocale] = useState(params.lang)
  // { params: { lang: 'de' }, pathname: '/de' }
  // { params: { lang: 'en' }, pathname: '/' }
  // console.log({ params, pathname, defaultLocale, locales })
  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const locale = e.target.value
    setLocale(locale)
    const currentLocale = params.lang
    const pathnameWithoutLocale = pathname.replace(`/${currentLocale}`, '')
    const pathnameWithNewLocale =
      locale === defaultLocale
        ? pathnameWithoutLocale || '/'
        : `/${locale}${pathnameWithoutLocale}`
    // console.log({ locale, currentLocale, pathnameWithoutLocale, pathnameWithNewLocale })
    router.push(pathnameWithNewLocale)
  }
  return (
    <div className="">
      <select
        value={locale}
        onChange={onChange}
        aria-label="Locale Select"
        name="choice"
        className={`flex w-[42px] appearance-none space-y-5 rounded-full border border-gray-300 bg-gray-100 p-1.5 px-2.5  text-lg outline-none focus:border-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:focus:border-gray-400 ${noto_color_emoji.className}`}
      >
        <option value="" className="text-[3pt]" disabled></option>
        <option value="en">🇺🇸 English &nbsp;</option>
        <option value="" className="text-[3pt]" disabled></option>
        <option value="tw">🇹🇼 Taiwan &nbsp;</option>
        <option value="" className="text-[3pt]" disabled></option>
        <option value="de">🇩🇪 German &nbsp;</option>
        <option value="" className="text-[3pt]" disabled></option>
      </select>
    </div>
  )
}
