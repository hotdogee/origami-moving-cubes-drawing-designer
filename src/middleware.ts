import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { LOCALE_COOKIE, Locale, defaultLocale, locales } from '@/i18n'

import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  // const negotiatorHeaders: Record<string, string> = {}
  // request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // let headers = { 'accept-language': 'en-US,en;q=0.5' }
  // let headers = { 'accept-language': 'zh-TW,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6' }
  // languages = new Negotiator({ headers }).languages(['em', 'de', 'tw'])
  // languages = new Negotiator({ headers }).languages()
  // languages = new Negotiator({ headers: { 'accept-language': 'zh-TW,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6' } }).languages()
  // languages = [ 'zh-TW', 'zh', 'en', 'en-GB', 'en-US' ]
  // languages = [ 'zh-TW', 'en-GB', 'en-US' ]
  // languages = [ '*' ] // no accept-language header
  // locales = ['en', 'de', 'tw']
  // defaultLocale = 'en'
  // match(languages, locales, defaultLocale)

  // Use negotiator and intl-localematcher to get best locale
  const languages = new Negotiator({ headers: Object.fromEntries(request.headers) })
    .languages()
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
  // Redirect /defaultLocale -> /, and set cookie
  // Render /non-defaultLocale, does NOT set cookie
  // Rewrite / -> /defaultLocale
  // Redirect / -> /non-defaultLocale
  // Frontend sets cookie on language change
  //
  // Priority
  // 1. route prefix
  // 2. cookie
  // 3. accept-language header
  // 4. default locale
  let locale = request.nextUrl.pathname.split('/')[1] as string | undefined
  if (locale === defaultLocale) {
    // redirect /defaultLocale{} -> /{}
    const response = NextResponse.redirect(
      newUrl(request.nextUrl.pathname.replace(`/${locale}`, ''))
    )
    response.cookies.set(LOCALE_COOKIE, locale, {
      sameSite: 'strict',
      maxAge: 31536000, // 1 year
    })
    // console.log(
    //   'redirect /defaultLocale{} -> /{}',
    //   newUrl(request.nextUrl.pathname.replace(`/${locale}`, ''))
    // )
    return response
  }
  if (locales.includes(locale as Locale)) {
    // render /non-defaultLocale{}
    // console.log('render /non-defaultLocale{}', newUrl(request.nextUrl.pathname))
    return NextResponse.next()
  }
  // check cookie or accept-language header
  locale =
    (request.cookies.get(LOCALE_COOKIE)?.value as string | undefined) ||
    getLocale(request)
  // console.log(
  //   'cookie',
  //   request.cookies.get(LOCALE_COOKIE),
  //   locale,
  //   defaultLocale,
  //   getLocale(request)
  // )
  if (locale === defaultLocale) {
    // rewrite /{} -> /defaultLocale{}
    // console.log('rewrite /{} -> /defaultLocale{}', newUrl(`/${locale}${request.nextUrl.pathname}`))
    return NextResponse.rewrite(newUrl(`/${locale}${request.nextUrl.pathname}`))
  }
  if (locales.includes(locale as Locale)) {
    // redirect /{} -> /non-defaultLocale{}
    // console.log(
    //   'redirect /{} -> /non-defaultLocale{}',
    //   newUrl(`/${locale}${request.nextUrl.pathname}`)
    // )
    return NextResponse.redirect(newUrl(`/${locale}${request.nextUrl.pathname}`))
  } else {
    // broken cookie, redirect to default locale
    // console.log(
    //   'broken cookie, redirect to default locale',
    //   newUrl(`/${defaultLocale}${request.nextUrl.pathname}`)
    // )
    return NextResponse.redirect(newUrl(`/${defaultLocale}${request.nextUrl.pathname}`))
  }

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
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
// export const config = {
//   // matcher: '/:lng*'
//   matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|manifest.json|sw.js).*)'],
// }
// // this tells the middleware to run only on requests to our app pages
// export const config = {
//   matcher: ['/((?!api|_next|.*\\..*).*)'],
// }
// export const config = {
//   // Match only internationalized pathnames
//   matcher: ['/', '/(de|en)/:path*'],
// }
// export const config = {
//   // Matcher entries are linked with a logical "or", therefore
//   // if one of them matches, the middleware will be invoked.
//   matcher: [
//     // Match all pathnames except for
//     // - … if they start with `/api`, `/_next` or `/_vercel`
//     // - … the ones containing a dot (e.g. `favicon.ico`)
//     '/((?!api|_next|_vercel|.*\\..*).*)',
//     // Match all pathnames within `/users`, optionally with a locale prefix
//     '/(.+)?/users/(.+)',
//   ],
// }
