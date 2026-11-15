import { campaign } from '../config.js'

const usd = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

export default function ProgressBar({ dark = false }) {
  const { confirmedRaisedUSD: raised, goalUSD: goal, confirmedDonations, lastUpdated } = campaign
  const pct = Math.min(100, Math.round((raised / goal) * 100))
  const remaining = Math.max(0, goal - raised)
  const muted = dark ? 'text-on-deep/85' : 'text-ink-soft'

  return (
    <div>
      <p className={`font-display text-6xl tracking-tight ${dark ? 'text-white' : 'text-ink'}`}>
        {usd(raised)}
      </p>
      <p className={`mt-1 text-lg ${muted}`}>raised of our {usd(goal)} goal</p>
      <div
        className={`mt-5 h-4 w-full overflow-hidden rounded-full ${dark ? 'bg-white/15' : 'bg-line'}`}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={goal}
        aria-valuenow={raised}
        aria-label="Confirmed donations towards the goal"
      >
        <div className="h-full rounded-full bg-sun" style={{ width: `${Math.max(pct, raised > 0 ? 3 : 0)}%` }} />
      </div>
      <p className={`mt-3 ${muted}`}>
        {remaining > 0 ? `${usd(remaining)} to go` : 'Goal reached. Thank you!'}
        {confirmedDonations > 0 && `, from ${confirmedDonations} donation${confirmedDonations === 1 ? '' : 's'} so far`}
        {lastUpdated && `. Updated ${lastUpdated}`}
      </p>
    </div>
  )
}
