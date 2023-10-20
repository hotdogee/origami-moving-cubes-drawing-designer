'use client'
import { createContext } from 'react'

export const TranslationContext = createContext<Record<string, string>>({})

export function TranslationProvider({
  t,
  children,
}: {
  t: Record<string, string>
  children: React.ReactNode
}) {
  return <TranslationContext.Provider value={t}>{children}</TranslationContext.Provider>
}
