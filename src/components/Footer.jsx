import { campaign, showOrg } from '../config.js'

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 text-sm text-stone-600 sm:grid-cols-2 sm:px-6">
        <div>
          <h2 className="font-semibold text-stone-900">Need help or worried about something online?</h2>
          <p className="mt-2">
            You are never in trouble for asking for help. Talk to a parent, carer, teacher or another adult you trust.
          </p>
          {campaign.supportLinks.length > 0 && (
            <ul className="mt-3 space-y-1">
              {campaign.supportLinks.map((l) => (
                <li key={l.url}>
                  <a href={l.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-teal-800 underline">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-2">If someone is in immediate danger, contact your local emergency services.</p>
        </div>
        <div>
          <h2 className="font-semibold text-stone-900">About {campaign.name}</h2>
          <p className="mt-2">
            A volunteer project by {campaign.fundraiser}
            {showOrg && ` in support of ${campaign.organisation}`}. All scenarios and profiles are fictional.
          </p>
          <p className="mt-2">
            Privacy: no accounts, cookies or analytics. Game answers stay in your browser and disappear when you leave.
            Donations are handled entirely by RallyUp.
          </p>
          <p className="mt-4 text-stone-400">© {new Date().getFullYear()} {campaign.name}</p>
        </div>
      </div>
    </footer>
  )
}
