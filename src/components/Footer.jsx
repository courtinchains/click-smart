import { campaign, showOrg } from '../config.js'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-2">
        <div id="help" className="scroll-mt-6">
          <h2 className="text-2xl">Worried about something online?</h2>
          <p className="mt-3 max-w-[30rem] text-ink-soft">
            You’re never in trouble for asking for help. Talk to a parent, carer, teacher or another adult you trust. If
            someone is in immediate danger, contact your local emergency services.
          </p>
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
            No accounts, cookies or analytics. Your answers stay in your browser and disappear when you leave.
            Donations are handled entirely by RallyUp.
          </p>
        </div>
      </div>
    </footer>
  )
}
