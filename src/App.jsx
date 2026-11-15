import { useEffect, useState } from 'react'
import { campaign, showOrg } from './config.js'
import Home from './components/Home.jsx'
import Footer from './components/Footer.jsx'
import DonateButton from './components/DonateButton.jsx'
import SpotTheRedFlags from './games/SpotTheRedFlags.jsx'
import PrivacyDetective from './games/PrivacyDetective.jsx'

// Tiny hash router: #/ , #/red-flags , #/privacy — no extra dependency,
// and links to a specific game can be shared.
function useRoute() {
  const read = () => window.location.hash.replace(/^#\/?/, '') || 'home'
  const [route, setRoute] = useState(read)
  useEffect(() => {
    const onChange = () => {
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

  return (
    <div className="flex min-h-screen flex-col bg-stone-50 font-sans text-stone-900">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:rounded focus:bg-white focus:px-3 focus:py-2">
        Skip to content
      </a>

      {!campaign.organisationApproved && (
        <p className="bg-amber-100 px-4 py-2 text-center text-sm text-amber-900">
          Preview — content is awaiting review before launch.
        </p>
      )}

      <header className="border-b border-stone-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="#/" className="flex items-center gap-2 font-extrabold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-700 text-white" aria-hidden="true">
              ↖
            </span>
            <span>
              {campaign.name}
              {showOrg && <span className="ml-2 hidden text-sm font-medium text-stone-500 sm:inline">for {campaign.organisation}</span>}
            </span>
          </a>
          <DonateButton size="sm" />
        </div>
      </header>

      <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        {page}
      </main>

      <Footer />
    </div>
  )
}
