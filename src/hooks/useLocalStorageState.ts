import { useEffect, useState } from 'react'

export default function useLocalStorageState(key: string, initialState: any) {
  const [state, setState] = useState(() => {
    let value
    try {
      value = JSON.parse(window.localStorage.getItem(key) || String(initialState))
    } catch (e) {
      value = initialState
    }
    return value
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  return [state, setState]
}
