'use client'
import { createContext } from 'react'

export const DictionaryContext = createContext<Record<string, string>>({})

export function DictionaryProvider({
  t,
  children,
}: {
  t: Record<string, string>
  children: React.ReactNode
}) {
  return <DictionaryContext.Provider value={t}>{children}</DictionaryContext.Provider>
}
