import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Origami Moving Cubes Drawing Designer',
  description: 'Origami Moving Cubes Drawing Designer by Han Lin (hotdogee [at] gmail [dot] com)',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f3f4f6' },
    { media: '(prefers-color-scheme: dark)', color: '#1f2937' },
  ],
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`bg-gray-100 dark:bg-gray-800 ${inter.className}`}>{children}</body>
    </html>
  )
}
