import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { LOCALE_COOKIE, Locale, defaultLocale, locales } from '@/i18n'

import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

function getDetectedLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const languages = new Negotiator({ headers: Object.fromEntries(request.headers) })
    .languages()
    // languages = [ '*' ] // no accept-language header
    // filter out '*' since match() throw an error
    .filter((language) => language !== '*')
    // replace zh with tw, for example 'zh-TW' -> 'tw-TW'
    .map((language) => {
      return language.replace('zh', 'tw')
    })

  const locale = match(languages, locales, defaultLocale)

  return locale
}

export function middleware(request: NextRequest) {
  // Priority
  // 1. route prefix
  // 2. cookie
  // 3. accept-language header
  // 4. default locale
  let locale = request.nextUrl.pathname.split('/')[1] as string | undefined
  if (locale === defaultLocale) {
    // redirect /defaultLocale{} -> /{}, and set cookie
    const response = NextResponse.redirect(
      newUrl(request.nextUrl.pathname.replace(`/${locale}`, ''))
    )
    response.cookies.set(LOCALE_COOKIE, locale, {
      sameSite: 'strict',
      maxAge: 31536000, // 1 year
    })
    return response
  }
  if (locales.includes(locale as Locale)) {
    // render /non-defaultLocale{}, does NOT set cookie
    // Frontend sets cookie on language change
    return NextResponse.next()
  }
  // check cookie or accept-language header
  locale =
    (request.cookies.get(LOCALE_COOKIE)?.value as string | undefined) ||
    getDetectedLocale(request)
  if (locale === defaultLocale) {
    // rewrite /{} -> /defaultLocale{}
    return NextResponse.rewrite(newUrl(`/${locale}${request.nextUrl.pathname}`))
  }
  if (locales.includes(locale as Locale)) {
    // redirect /{} -> /non-defaultLocale{}
    return NextResponse.redirect(newUrl(`/${locale}${request.nextUrl.pathname}`))
  } else {
    // broken cookie, redirect to default locale
    return NextResponse.redirect(newUrl(`/${defaultLocale}${request.nextUrl.pathname}`))
  }
  // handle edge cases
  function newUrl(pathname: string) {
    // remove trailing slash
    if (pathname.endsWith('/')) {
      pathname = pathname.slice(0, -1)
    }
    const url = request.nextUrl.clone()
    url.pathname = pathname || '/'
    return url
  }
}

export const config = {
  // Matcher ignoring `/_next/`, `_vercel`, `/api/` and files with a '.' like `favicon.ico`
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
