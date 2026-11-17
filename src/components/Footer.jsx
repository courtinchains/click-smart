import { campaign, showOrg } from '../config.js'
import { supportRegion, supportContacts } from '../content/support.js'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-2">
        <div id="help" className="scroll-mt-6">
          <h2 className="text-2xl">Worried about something online?</h2>
          <p className="mt-3 max-w-[30rem] text-ink-soft">
            You’re never in trouble for asking for help. Talk to a parent, carer, teacher or another adult you trust.
          </p>

          <h3 className="mt-6 font-sans text-sm font-bold text-ink">In {supportRegion}</h3>
          <ul className="mt-3 divide-y divide-line rounded-card ring-1 ring-line">
            {supportContacts.map((c) => (
              <li key={c.label} className="flex items-start justify-between gap-4 px-4 py-3">
                <div>
                  <p className="font-bold">{c.label}</p>
                  <p className="text-sm text-ink-soft">{c.note}</p>
                </div>
                {c.tel ? (
                  <a
                    href={`tel:${c.tel}`}
                    className="shrink-0 rounded-full bg-ink px-4 py-1.5 font-display text-xl text-paper hover:bg-signal hover:text-white"
                    aria-label={`Call ${c.label} on ${c.number}`}
                  >
                    {c.number}
                  </a>
                ) : (
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="max-w-[9rem] shrink-0 text-right text-sm font-bold text-signal underline underline-offset-4"
                  >
                    {c.linkText}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-ink-soft">Outside {supportRegion}? Contact your local emergency services.</p>
          {campaign.supportLinks.length > 0 && (
            <ul className="mt-4 space-y-1.5">
              {campaign.supportLinks.map((l) => (
                <li key={l.url}>
                  <a href={l.url} target="_blank" rel="noopener noreferrer" className="font-bold text-signal underline underline-offset-4">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h2 className="text-2xl">About this site</h2>
          <p className="mt-3 max-w-[30rem] text-ink-soft">
            A volunteer project by {campaign.fundraiser}
            {showOrg && ` in support of ${campaign.organisation}`}. Every chat and profile in the games is made up.
          </p>
          <p className="mt-3 max-w-[30rem] text-ink-soft">
            No accounts, cookies or analytics. Your answers stay in your browser and disappear when you leave. The only thing remembered is your light or dark mode choice, on your own device.
            Donations are handled entirely by RallyUp.
          </p>
        </div>
      </div>
    </footer>
  )
}
