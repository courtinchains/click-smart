import { useEffect, useState } from 'react'

// Light/dark switch. Starts from the visitor's device setting; a choice made
// here is remembered on this device only (localStorage), never sent anywhere.
const KEY = 'click-smart-theme'

function current() {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(current)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0d181d' : '#123c55')
  }, [theme])

  // Follow the device setting until the visitor picks one themselves.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e) => {
      let saved = null
      try { saved = localStorage.getItem(KEY) } catch { /* storage unavailable */ }
      if (!saved) setTheme(e.matches ? 'dark' : 'light')
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    try { localStorage.setItem(KEY, next) } catch { /* storage unavailable */ }
  }

  const dark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      aria-label="Dark mode"
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex h-10 w-10 items-center justify-center rounded-full text-ink ring-1 ring-line hover:ring-2 hover:ring-signal"
    >
      {dark ? (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
          <path d="M20.5 14.6A8.5 8.5 0 0 1 9.4 3.5a8.5 8.5 0 1 0 11.1 11.1z" />
        </svg>
      )}
    </button>
  )
}
