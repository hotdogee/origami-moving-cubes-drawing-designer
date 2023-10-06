import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Origami Moving Cubes Drawing Designer',
  description: 'Origami Moving Cubes Drawing Designer by Han Lin (hotdogee [at] gmail [dot] com)',
  viewport: {
    width: 'device-width',
    height: 'device-height',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={`bg-gray-100 dark:bg-gray-800 ${inter.className}`}>{children}</body>
    </html>
  )
}
