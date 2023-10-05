import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Origami Moving Cubes Drawing Designer',
  description: 'Origami Moving Cubes Drawing Designer by Han Lin (hotdogee [at] gmail [dot] com)',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`bg-white dark:bg-gray-800 ${inter.className}`}>{children}</body>
    </html>
  )
}
