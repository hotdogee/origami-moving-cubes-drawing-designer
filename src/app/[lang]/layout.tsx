import { DictionaryProvider } from '@/context/i18n.context'
import '@/globals.css'
import { Locale, getDictionary, locales } from '@/i18n'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }))
}

const inter = Inter({ subsets: ['latin'] })

const APP_NAME = 'Origami Cubes'
const APP_DEFAULT_TITLE = 'Origami Moving Cubes Drawing Designer'
const APP_TITLE_TEMPLATE = '%s - Origami Cubes'
const APP_DESCRIPTION = 'Created by Han Lin'

export const metadata: Metadata = {
  metadataBase: new URL(`https://${process.env.VERCEL_URL}`),
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  keywords: [
    'Origami Moving Cubes',
    'Moving Cubes',
    'Origami Cubes',
    'Cubes',
    'Self-assembling material pops into 3D',
    'Steve Mould',
  ],
  authors: [{ name: 'Han Lin' }],
  creator: 'Han Lin',
  publisher: 'Han Lin',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f3f4f6' },
    { media: '(prefers-color-scheme: dark)', color: '#1f2937' },
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_NAME,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    url: '/',
    images: [
      {
        url: '/og.jpg',
        width: 1493,
        height: 894,
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    siteId: '65576906',
    creator: '@hotdogee',
    creatorId: '65576906',
    images: ['/og.jpg'],
  },
  alternates: {
    canonical: '/',
    languages: {
      en: '/en',
      'zh-TW': '/tw',
      de: '/de',
      fr: '/fr',
      hu: '/hu',
      nl: '/nl',
      ru: '/ru',
    },
  },
}
export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  const t = await getDictionary(lang)
  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`bg-gray-100 dark:bg-gray-800 ${inter.className}`}>
        <DictionaryProvider t={t}>{children}</DictionaryProvider>
        <Analytics />
      </body>
    </html>
  )
}
