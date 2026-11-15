import { campaign } from '../config.js'

export default function DonateButton({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-3 text-base',
    lg: 'px-7 py-4 text-lg',
  }
  const base = `inline-flex whitespace-nowrap items-center justify-center gap-2 rounded-full font-semibold ${sizes[size]} ${className}`

  if (!campaign.rallyUpUrl) {
    return (
      <span
        className={`${base} cursor-not-allowed bg-stone-200 text-stone-500`}
        aria-disabled="true"
        title="The donation page is being set up"
      >
        {size === 'sm' ? 'Donations soon' : 'Donation link coming soon'}
      </span>
    )
  }

  return (
    <a
      href={campaign.rallyUpUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} bg-amber-400 text-stone-900 shadow-sm transition hover:bg-amber-300 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-amber-500`}
    >
      Donate
      <span aria-hidden="true">→</span>
      <span className="sr-only">(opens the secure RallyUp donation page in a new tab)</span>
    </a>
  )
}
