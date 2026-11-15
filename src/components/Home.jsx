import { campaign, showOrg } from '../config.js'
import DonateButton from './DonateButton.jsx'
import ProgressBar from './ProgressBar.jsx'

const GAMES = [
  {
    href: '#/red-flags',
    emoji: '🚩',
    title: 'Spot the Red Flags',
    blurb: 'Read four fictional chats and tap the messages that should make you pause.',
    time: '3 min',
    color: 'from-rose-100 to-orange-100',
  },
  {
    href: '#/privacy',
    emoji: '🔎',
    title: 'Privacy Detective',
    blurb: 'Investigate a fictional profile and find the details that are oversharing.',
    time: '2 min',
    color: 'from-violet-100 to-sky-100',
  },
]

const COMING = ['Myth or Fact?', 'What Would You Do?', 'Digital Safety Escape Room']

export default function Home() {
  return (
    <div className="space-y-14">
      {/* Hero */}
      <section className="text-center">
        <p className="text-sm font-semibold tracking-widest text-teal-700 uppercase">{campaign.hashtag}</p>
        <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-balance sm:text-6xl">
          Think before you click.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-pretty text-stone-600">
          Free, quick online-safety games. Learn to spot warning signs, protect your privacy, then challenge your
          friends to beat your score.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="#/red-flags" className="rounded-full bg-teal-700 px-7 py-4 text-lg font-semibold text-white shadow-sm hover:bg-teal-800">
            Start playing
          </a>
          <a href="#support" className="rounded-full px-7 py-4 text-lg font-semibold text-stone-800 ring-1 ring-stone-300 hover:bg-white">
            Why this matters
          </a>
        </div>
        <p className="mt-4 text-sm text-stone-500">No sign-up. No tracking. Your answers never leave your device.</p>
      </section>

      {/* Games */}
      <section aria-labelledby="games-title">
        <h2 id="games-title" className="text-2xl font-bold">Choose a challenge</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {GAMES.map((g) => (
            <a
              key={g.href}
              href={g.href}
              className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-stone-200 transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
            >
              <div className={`flex h-32 items-center justify-center bg-gradient-to-br text-6xl ${g.color}`} aria-hidden="true">
                {g.emoji}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-bold">{g.title}</h3>
                  <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-600">{g.time}</span>
                </div>
                <p className="mt-2 text-stone-600">{g.blurb}</p>
                <p className="mt-4 font-semibold text-teal-800 group-hover:underline">Play now →</p>
              </div>
            </a>
          ))}
        </div>
        <p className="mt-5 text-sm text-stone-500">
          Coming soon: {COMING.join(' · ')}
        </p>
      </section>

      {/* Fundraising */}
      <section id="support" aria-labelledby="support-title" className="scroll-mt-6 rounded-3xl bg-teal-800 px-6 py-10 text-white sm:px-10">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <h2 id="support-title" className="text-3xl font-bold">Learning is free. Protection takes resources.</h2>
            <p className="mt-4 text-teal-50">
              {showOrg
                ? `${campaign.name} is a volunteer fundraiser by ${campaign.fundraiser} for ${campaign.organisation}, which works to protect children from online sexual abuse.`
                : `${campaign.name} is a volunteer fundraiser by ${campaign.fundraiser} supporting work to protect children from online abuse.`}{' '}
              The games will always be free — if you’d like to help, you can make an optional donation through our
              secure fundraising page.
            </p>
            <p className="mt-3 text-sm text-teal-200">
              Donations are processed by RallyUp. This website never sees or stores your payment details.
            </p>
          </div>
          <div className="rounded-2xl bg-teal-900/50 p-6 ring-1 ring-teal-600">
            <ProgressBar dark />
            <div className="mt-6">
              <DonateButton size="lg" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* How to take part */}
      <section aria-labelledby="how-title">
        <h2 id="how-title" className="text-2xl font-bold">Take the {campaign.hashtag}</h2>
        <ol className="mt-5 grid gap-4 sm:grid-cols-3">
          {[
            ['Play', 'Pick a game and test your online-safety instincts.'],
            ['Share', 'Post your badge and challenge three friends to beat it.'],
            ['Support', 'If you can, chip in — $5 from 60 people reaches the goal.'],
          ].map(([t, d], i) => (
            <li key={t} className="rounded-2xl bg-white p-5 ring-1 ring-stone-200">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-400 font-bold text-stone-900">{i + 1}</span>
              <h3 className="mt-3 font-semibold">{t}</h3>
              <p className="mt-1 text-stone-600">{d}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
