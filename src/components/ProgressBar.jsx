import { campaign } from '../config.js'

const usd = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

export default function ProgressBar({ dark = false }) {
  const { confirmedRaisedUSD: raised, goalUSD: goal, confirmedDonations, lastUpdated } = campaign
  const pct = Math.min(100, Math.round((raised / goal) * 100))
  const remaining = Math.max(0, goal - raised)
  const muted = dark ? 'text-teal-100' : 'text-stone-600'

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <p className={`text-2xl font-bold ${dark ? 'text-white' : 'text-stone-900'}`}>
          {usd(raised)} <span className={`text-base font-medium ${muted}`}>of {usd(goal)}</span>
        </p>
        <p className={`text-sm ${muted}`}>{pct}%</p>
      </div>
      <div
        className={`mt-2 h-3 w-full overflow-hidden rounded-full ${dark ? 'bg-teal-950/40' : 'bg-stone-200'}`}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={goal}
        aria-valuenow={raised}
        aria-label="Confirmed donations towards the goal"
      >
        <div className="h-full rounded-full bg-amber-400 transition-all" style={{ width: `${pct}%` }} />
      </div>
      <p className={`mt-2 text-sm ${muted}`}>
        {remaining > 0 ? `${usd(remaining)} to go` : 'Goal reached — thank you!'}
        {confirmedDonations > 0 && ` · ${confirmedDonations} confirmed donation${confirmedDonations === 1 ? '' : 's'}`}
        {lastUpdated && ` · updated ${lastUpdated}`}
      </p>
    </div>
  )
}
