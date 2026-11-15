import { campaign, showOrg } from '../config.js'
import ShareButton from './ShareButton.jsx'
import DonateButton from './DonateButton.jsx'

export function badgeFor(pct) {
  if (pct >= 90) return { name: 'Click Smart Pro', emoji: '🏆' }
  if (pct >= 70) return { name: 'Sharp Eye', emoji: '🔍' }
  if (pct >= 40) return { name: 'Getting There', emoji: '🌱' }
  return { name: 'Fresh Start', emoji: '✨' }
}

export default function ResultCard({ game, score, max, found, total, onReplay, onHome }) {
  const pct = max ? Math.round((score / max) * 100) : 0
  const badge = badgeFor(pct)
  const shareText = `I scored ${score}/${max} on ${game} ${badge.emoji} and earned "${badge.name}" on ${campaign.name}.`

  return (
    <section aria-labelledby="result-title" className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-stone-200">
      <div className="bg-gradient-to-br from-teal-700 to-teal-900 px-6 py-8 text-center text-white sm:px-10">
        <p className="text-sm font-semibold tracking-widest text-teal-200 uppercase">{game} · Result</p>
        <p className="mt-4 text-6xl" aria-hidden="true">{badge.emoji}</p>
        <h2 id="result-title" className="mt-3 text-3xl font-bold">{badge.name}</h2>
        <p className="mt-2 text-lg text-teal-100">
          {score} / {max} points · {found} of {total} found
        </p>
        <p className="mt-4 text-sm font-semibold text-amber-300">{campaign.hashtag}</p>
      </div>
      <div className="space-y-6 px-6 py-8 sm:px-10">
        <div>
          <h3 className="font-semibold text-stone-900">Challenge your friends</h3>
          <p className="mt-1 text-stone-600">Share your score — no sign-up, and we never store your results.</p>
          <div className="mt-3">
            <ShareButton text={shareText} />
          </div>
        </div>
        <div className="rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-200">
          <h3 className="font-semibold text-stone-900">Enjoyed this? Help keep children safer online.</h3>
          <p className="mt-1 text-stone-700">
            {showOrg
              ? `Every donation supports ${campaign.organisation}'s work. Donating is completely optional.`
              : 'Donating is completely optional — the games are free for everyone.'}
          </p>
          <div className="mt-4">
            <DonateButton />
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={onReplay} className="rounded-full px-4 py-2 font-semibold text-teal-800 ring-1 ring-teal-700 hover:bg-teal-50">
            Play again
          </button>
          <button type="button" onClick={onHome} className="rounded-full px-4 py-2 font-semibold text-stone-700 ring-1 ring-stone-300 hover:bg-stone-100">
            Try another game
          </button>
        </div>
      </div>
    </section>
  )
}
