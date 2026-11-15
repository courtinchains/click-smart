import { useEffect, useState } from 'react'
import { campaign, showOrg } from './config.js'
import Home from './components/Home.jsx'
import Footer from './components/Footer.jsx'
import DonateButton from './components/DonateButton.jsx'
import SpotTheRedFlags from './games/SpotTheRedFlags.jsx'
import PrivacyDetective from './games/PrivacyDetective.jsx'

// Tiny hash router: #/ , #/red-flags , #/privacy — no extra dependency,
// and links to a specific game can be shared.
const ROUTES = ['red-flags', 'privacy']

function useRoute() {
  const read = () => {
    const h = window.location.hash.replace(/^#\/?/, '')
    return ROUTES.includes(h) ? h : 'home'
  }
  const [route, setRoute] = useState(read)
  useEffect(() => {
    const onChange = () => {
      const h = window.location.hash.replace(/^#\/?/, '')
      const section = !ROUTES.includes(h) && h && document.getElementById(h)
      if (section) {
        // In-page link (e.g. #support): stay on the page and scroll to it.
        section.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
      setRoute(read())
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}

export const go = (path) => {
  window.location.hash = path === 'home' ? '/' : `/${path}`
}

export default function App() {
  const route = useRoute()
  const home = () => go('home')

  let page
  if (route === 'red-flags') page = <SpotTheRedFlags onHome={home} />
  else if (route === 'privacy') page = <PrivacyDetective onHome={home} />
  else page = <Home />

  const isGame = route === 'red-flags' || route === 'privacy'

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-10 focus:rounded focus:bg-white focus:px-3 focus:py-2">
        Skip to content
      </a>

      {!campaign.organisationApproved && (
        <p className="bg-sun px-4 py-2 text-center text-sm font-bold text-ink">
          Preview: content is awaiting review before launch.
        </p>
      )}

      <p className="bg-deep px-4 py-2 text-center font-mono text-xs tracking-[0.12em] text-on-deep uppercase">
        Worried<span className="hidden sm:inline"> about something online</span>?{' '}
        <a href="#help" className="text-white underline underline-offset-4">
          Find support
        </a>
      </p>

      <header className="border-b border-line bg-paper">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <a href="#/" className="flex items-center gap-2.5" aria-label={`${campaign.name} home`}>
            <Logo />
            <span className="font-display text-2xl font-semibold tracking-tight">click smart</span>
            {showOrg && <span className="hidden text-ink-soft sm:inline">for {campaign.organisation}</span>}
          </a>
          <DonateButton size="sm" />
        </div>
      </header>

      <main id="main" className={isGame ? 'mx-auto w-full max-w-6xl flex-1 px-5 py-8 sm:px-8 sm:py-12' : 'flex-1'}>
        {page}
      </main>

      <Footer />
    </div>
  )
}

function Logo() {
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="#123c55" />
      <path d="M10 7.5l13 9.2-5.6 1 3.3 6.6-2.9 1.4-3.3-6.6-4.5 4z" fill="#fff" />
      <circle cx="24" cy="8" r="3.2" fill="#74e46e" />
    </svg>
  )
}
