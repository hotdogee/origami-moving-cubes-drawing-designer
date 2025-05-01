'use client'
import { useEffect, useState } from 'react'

// localStorage.getItem("isDarkMode") === null
// localStorage.getItem("isDarkMode") === 'true'
// localStorage.getItem("isDarkMode") === 'false'
// localStorage.removeItem("isDarkMode")
// localStorage.setItem("isDarkMode", 'true')
// localStorage.setItem("isDarkMode", 'false')

const toggleDarkClass = (isDark: boolean) => {
  if (isDark) {
    document.documentElement.classList.add('dark')
    document.documentElement.style.colorScheme = 'dark'
  } else {
    document.documentElement.classList.remove('dark')
    document.documentElement.style.colorScheme = ''
  }
}

function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState<string | null>(
    global.localStorage?.getItem('isDarkMode') || null
  )

  useEffect(() => {
    if (isDarkMode === null) {
      localStorage.removeItem('isDarkMode')
      // check system preference
      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const listener = (e: MediaQueryListEvent | MediaQueryList) => {
        toggleDarkClass(e.matches)
      }
      listener(darkModeQuery)
      darkModeQuery.addEventListener('change', listener)
      return () => {
        darkModeQuery.removeEventListener('change', listener)
      }
    } else {
      localStorage.setItem('isDarkMode', isDarkMode)
      toggleDarkClass(isDarkMode === 'true')
    }
  }, [isDarkMode])

  const toggleDarkMode = () => {
    if (isDarkMode === 'false') {
      setIsDarkMode(null)
    } else if (isDarkMode === 'true') {
      setIsDarkMode('false')
    } else if (isDarkMode === null) {
      setIsDarkMode('true')
    }
  }

  const setDarkMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === 'system') {
      setIsDarkMode(null)
    } else if (e.target.value === 'light') {
      setIsDarkMode('false')
    } else if (e.target.value === 'dark') {
      setIsDarkMode('true')
    }
  }

  const buttonText = () => {
    switch (isDarkMode) {
      case 'true':
        return 'Dark'
      case null:
        return 'System'
      case 'false':
        return 'Light'
    }
  }

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        if (
          localStorage.getItem('isDarkMode') === 'true' ||
          (localStorage.getItem('isDarkMode') === null &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
          document.documentElement.classList.add('dark')
          document.documentElement.style.colorScheme = 'dark'
        } else {
          document.documentElement.classList.remove('dark')
          document.documentElement.style.colorScheme = ''
        }
        `,
          }}
        ></script>
        <button className="p-2">
          <div className="w-16"></div>
        </button>
        <div className="rounded-full border border-gray-300 p-1 dark:border-gray-600">
          <div className="h-8 w-24"></div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className="flex rounded-full border border-gray-300 p-1 dark:border-gray-600">
          <input
            type="radio"
            name="theme-toggle"
            value="light"
            id="theme-toggle-light"
            aria-label="Switch to light theme"
            className="peer/light appearance-none"
            checked={isDarkMode === 'false'}
            onChange={setDarkMode}
          ></input>
          <label
            htmlFor="theme-toggle-light"
            className="gray-100 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-0 text-gray-500 hover:text-gray-900 peer-checked/light:bg-gray-200 peer-checked/light:text-gray-800 dark:text-gray-400 dark:hover:text-gray-50 dark:peer-checked/light:bg-gray-700 dark:peer-checked/light:text-gray-100"
          >
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              className="☀︎ h-4 w-4 shrink-0"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2m0 18v2M4.2 4.2l1.4 1.4m12.8 12.8 1.4 1.4M1 12h2m18 0h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
          </label>
          <input
            type="radio"
            name="theme-toggle"
            value="system"
            id="theme-toggle-system"
            aria-label="Switch to system theme"
            className="peer/system appearance-none"
            checked={isDarkMode === null}
            onChange={setDarkMode}
          ></input>
          <label
            htmlFor="theme-toggle-system"
            className="gray-100 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-0 text-gray-500  hover:text-gray-900 peer-checked/system:bg-gray-200 peer-checked/system:text-gray-800 dark:text-gray-400 dark:hover:text-gray-50 dark:peer-checked/system:bg-gray-700 dark:peer-checked/system:text-gray-100"
          >
            <svg
              className="🖳 h-4 w-4 shrink-0"
              fill="none"
              shapeRendering="geometricPrecision"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <rect width="20" height="14" x="2" y="3" rx="2" />
              <path d="M8 21h8m-4-4v4" />
            </svg>
          </label>
          <input
            type="radio"
            name="theme-toggle"
            value="dark"
            id="theme-toggle-dark"
            aria-label="Switch to dark theme"
            className="peer/dark appearance-none"
            checked={isDarkMode === 'true'}
            onChange={setDarkMode}
          ></input>
          <label
            htmlFor="theme-toggle-dark"
            className="gray-100 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-0 text-gray-500  hover:text-gray-900 peer-checked/dark:bg-gray-200 peer-checked/dark:text-gray-800 dark:text-gray-400 dark:hover:text-gray-50 dark:peer-checked/dark:bg-gray-700 dark:peer-checked/dark:text-gray-100"
          >
            <svg
              className="☾ h-4 w-4 shrink-0"
              fill="none"
              shapeRendering="geometricPrecision"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
            </svg>
          </label>
        </div>
      </>
    )
  }
}

export default DarkModeToggle
