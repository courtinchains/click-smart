import { campaign } from '../config.js'

export default function DonateButton({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'px-4 py-2',
    md: 'px-6 py-3 text-lg',
    lg: 'px-7 py-4 text-xl',
  }
  const base = `inline-flex items-center justify-center whitespace-nowrap rounded-full font-bold ${sizes[size]} ${className}`

  if (!campaign.rallyUpUrl) {
    return (
      <span className={`${base} cursor-not-allowed bg-line text-ink-soft`} aria-disabled="true">
        {size === 'sm' ? 'Donations soon' : 'Donation link coming soon'}
      </span>
    )
  }

  return (
    <a
      href={campaign.rallyUpUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} bg-sun text-ink shadow-[inset_0_-3px_0_rgba(26,27,65,0.18)] hover:brightness-105`}
    >
      Donate
      <span className="sr-only"> (opens the secure RallyUp page in a new tab)</span>
    </a>
  )
}
