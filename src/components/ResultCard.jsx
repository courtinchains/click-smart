import { campaign, showOrg } from '../config.js'
import ShareButton from './ShareButton.jsx'
import DonateButton from './DonateButton.jsx'

export function badgeFor(pct) {
  if (pct >= 90) return 'Click Smart Pro'
  if (pct >= 70) return 'Sharp Eye'
  if (pct >= 40) return 'Getting There'
  return 'Fresh Start'
}

export default function ResultCard({ game, score, max, found, total, onReplay, onHome, replayLabel = 'Play again' }) {
  const pct = max ? Math.round((score / max) * 100) : 0
  const badge = badgeFor(pct)

  return (
    <section aria-labelledby="result-title" className="mx-auto max-w-3xl">
      <div className="overflow-hidden rounded-card bg-deep text-white">
        <div className="px-6 py-10 sm:px-10 sm:py-12">
          <p className="text-lg text-on-deep/85">{game}</p>
          <h1 id="result-title" className="mt-2 text-[clamp(2.75rem,8vw,4.5rem)] leading-none tracking-tight">
            {badge}
          </h1>
          <div className="mt-8 flex flex-wrap items-end gap-x-10 gap-y-4">
            <p>
              <span className="font-display text-5xl text-sun">{score}</span>
              <span className="text-xl text-on-deep/85"> / {max} points</span>
            </p>
            <p className="text-lg text-on-deep/85">
              {found} of {total} found
            </p>
          </div>
        </div>
        <p className="border-t border-white/15 px-6 py-4 font-bold sm:px-10">{campaign.hashtag}</p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-start">
        <div className="rounded-card bg-white p-6 ring-1 ring-line sm:p-7">
          <h2 className="text-2xl font-bold">Challenge your friends</h2>
          <p className="mt-2 text-ink-soft">Post your result card and dare your friends to beat it. Your score isn’t stored anywhere.</p>
          <div className="mt-5">
            <ShareButton result={{ game, badge, score, max, found, total }} />
          </div>
        </div>
        <div className="rounded-card bg-sun/25 p-6 ring-1 ring-sun sm:p-7">
          <h2 className="text-2xl font-bold">Help keep children safer online</h2>
          <p className="mt-2 text-ink">
            {showOrg
              ? `Every donation supports ${campaign.organisation}. It’s completely optional.`
              : 'Donating is completely optional. The games are free for everyone.'}
          </p>
          <DonateButton className="mt-5" />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" onClick={onReplay} className="rounded-full px-5 py-2.5 font-bold ring-2 ring-ink hover:bg-white">
          {replayLabel}
        </button>
        <button type="button" onClick={onHome} className="rounded-full px-5 py-2.5 font-bold text-ink-soft ring-1 ring-line hover:bg-white">
          Try another game
        </button>
      </div>
    </section>
  )
}
