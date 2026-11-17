import { campaign, showOrg } from '../config.js'
import DonateButton from './DonateButton.jsx'
import ProgressBar from './ProgressBar.jsx'
import HeroChat, { FlagIcon } from './HeroChat.jsx'

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pt-10 pb-20 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pt-16 lg:pb-28">
        <div>
          <h1 className="text-[clamp(2.75rem,7vw,5.25rem)] leading-[0.95] tracking-[-0.03em]">
            Can you spot the red flag?
          </h1>
          <p className="mt-6 max-w-[34rem] text-xl leading-relaxed text-ink-soft">
            Short, free games that build the habit of pausing before you reply, share or click. Try the chat on this
            page, then challenge your friends to beat your score.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a href="#/red-flags" className="rounded-full bg-signal px-7 py-4 text-lg font-bold text-white hover:bg-deep">
              Start playing
            </a>
            <a href="#support" className="font-bold text-ink underline decoration-2 underline-offset-4 hover:text-signal">
              Why we’re doing this
            </a>
          </div>
          <p className="mt-8 text-ink-soft">
            No sign-up. Nothing you tap is saved or sent anywhere.
          </p>
        </div>
        <HeroChat />
      </section>

      {/* Games */}
      <section aria-labelledby="games-title" className="border-y border-line bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
          <h2 id="games-title" className="text-4xl tracking-tight">Five games, about twenty minutes</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <GameLink
              href="#/red-flags"
              title="Spot the Red Flags"
              minutes={3}
              text="Four chats, picked at random from eight. Tap the messages that should make you stop and think, then see why."
              art={<RedFlagsArt />}
            />
            <GameLink
              href="#/privacy"
              title="Privacy Detective"
              minutes={2}
              text="Investigate one of eight made-up profiles and find everything that gives away too much."
              art={<DetectiveArt />}
            />
            <GameLink
              href="#/myth-or-fact"
              title="Myth or Fact"
              minutes={3}
              text="Eight quick statements about staying safe online. Decide which are true, and learn why."
              art={<MythFactArt />}
            />
            <GameLink
              href="#/what-would-you-do"
              title="What Would You Do?"
              minutes={5}
              text="Three tricky situations where your choices change what happens next. See how your decisions play out."
              art={<ChoicesArt />}
            />
            <GameLink
              href="#/escape-room"
              title="Escape Room"
              minutes={5}
              text="Four locked rooms, four safety puzzles. Find every digit of the code to get out, as fast as you can."
              art={<EscapeArt />}
            />
            <div className="flex flex-col justify-between rounded-card bg-deep p-7 text-white">
              <div>
                <h3 className="text-2xl">Played them all?</h3>
                <p className="mt-2 text-lg text-on-deep">
                  Share your best badge with {campaign.hashtag}, and if you can, help fund the work behind it.
                </p>
              </div>
              <DonateButton className="mt-6 self-start" />
            </div>
          </div>
        </div>
      </section>

      {/* Fundraising */}
      <section id="support" aria-labelledby="support-title" className="scroll-mt-4 bg-deep text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.2fr_1fr] lg:py-24">
          <div>
            <h2 id="support-title" className="text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.02] tracking-tight">
              The games are free. Keeping children safe online isn’t.
            </h2>
            <p className="mt-6 max-w-[36rem] text-lg leading-relaxed text-on-deep">
              {showOrg
                ? `${campaign.name} is a volunteer project by ${campaign.fundraiser}, raising money for ${campaign.organisation}, which works to protect children from online sexual abuse.`
                : `${campaign.name} is a volunteer project by ${campaign.fundraiser}, raising money for work that protects children from online abuse.`}{' '}
              If you enjoyed playing, an optional donation helps that work continue.
            </p>
            <p className="mt-4 max-w-[36rem] text-on-deep/85">
              Donations go through RallyUp’s secure page. This site never sees your payment details.
            </p>
          </div>
          <div className="self-end rounded-card bg-white/[0.06] p-6 ring-1 ring-white/15 sm:p-8">
            <ProgressBar dark />
            <DonateButton size="lg" className="mt-7 w-full" />
          </div>
        </div>
      </section>

      {/* Take part */}
      <section aria-labelledby="how-title" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
        <h2 id="how-title" className="text-4xl tracking-tight">Take the {campaign.hashtag}</h2>
        <ol className="mt-10 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {[
            ['Play', 'Pick a game and see how sharp your instincts are.'],
            ['Share', 'Post your result and dare three friends to beat it.'],
            ['Support', 'If you can, chip in. Sixty people giving $5 gets us to the goal.'],
          ].map(([t, d], i) => (
            <li key={t} className="border-t-4 border-ink pt-5">
              <p className="font-display text-5xl text-signal">{i + 1}</p>
              <h3 className="mt-2 text-2xl font-bold">{t}</h3>
              <p className="mt-2 text-lg text-ink-soft">{d}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}

function GameLink({ href, title, minutes, text, art }) {
  return (
    <a
      href={href}
      className="group flex flex-col overflow-hidden rounded-card bg-paper ring-1 ring-line transition hover:ring-2 hover:ring-signal"
    >
      <div className="flex h-48 items-center justify-center px-6" aria-hidden="true">
        {art}
      </div>
      <div className="flex flex-1 flex-col bg-surface p-6 sm:p-7">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-2xl font-bold">{title}</h3>
          <span className="shrink-0 text-ink-soft">{minutes} min</span>
        </div>
        <p className="mt-2 flex-1 text-lg text-ink-soft">{text}</p>
        <span className="mt-5 font-bold text-signal group-hover:underline">Play {title}</span>
      </div>
    </a>
  )
}

function RedFlagsArt() {
  return (
    <div className="w-full max-w-[17rem] space-y-2">
      <div className="h-7 w-3/5 rounded-full rounded-bl-sm bg-bubble" />
      <div className="ml-auto h-7 w-2/5 rounded-full rounded-br-sm bg-signal" />
      <div className="flex h-9 w-4/5 items-center gap-2 rounded-full rounded-bl-sm bg-flag-tint px-3 text-flag ring-2 ring-flag">
        <FlagIcon />
        <span className="h-2 flex-1 rounded-full bg-flag/30" />
      </div>
      <div className="h-7 w-1/2 rounded-full rounded-bl-sm bg-bubble" />
    </div>
  )
}

function ChoicesArt() {
  return (
    <div className="w-full max-w-[17rem] space-y-2">
      <div className="h-8 w-4/5 rounded-[18px] rounded-bl-md bg-bubble" />
      <div className="flex h-9 items-center rounded-card bg-safe-tint px-3 ring-2 ring-safe">
        <span className="h-2 w-3/4 rounded-full bg-safe/40" />
      </div>
      <div className="flex h-9 items-center rounded-card bg-surface px-3 ring-1 ring-line">
        <span className="h-2 w-2/3 rounded-full bg-line" />
      </div>
      <div className="flex h-9 items-center rounded-card bg-surface px-3 ring-1 ring-line">
        <span className="h-2 w-1/2 rounded-full bg-line" />
      </div>
    </div>
  )
}

function EscapeArt() {
  return (
    <div className="flex items-end gap-5">
      <div className="relative h-32 w-20 rounded-t-[40px] bg-deep ring-4 ring-line">
        <span className="absolute top-16 right-3 h-3 w-3 rounded-full bg-sun" />
      </div>
      <div className="mb-2 flex gap-1.5">
        {['4', '?', '?', '?'].map((d, i) => (
          <span key={i} className={`flex h-10 w-8 items-center justify-center rounded-card font-display text-xl ${i === 0 ? 'bg-deep text-white' : 'bg-surface text-ink-soft ring-1 ring-line'}`}>
            {d}
          </span>
        ))}
      </div>
    </div>
  )
}

function MythFactArt() {
  return (
    <div className="w-full max-w-[17rem]">
      <div className="rounded-card bg-surface p-4 ring-1 ring-line">
        <span className="block h-2.5 w-full rounded-full bg-ink/60" />
        <span className="mt-2 block h-2.5 w-3/4 rounded-full bg-ink/60" />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <span className="rounded-card bg-surface py-2 text-center font-display text-lg ring-1 ring-line">Myth</span>
        <span className="rounded-card bg-safe-tint py-2 text-center font-display text-lg ring-2 ring-safe">Fact</span>
      </div>
    </div>
  )
}

function DetectiveArt() {
  return (
    <div className="relative w-full max-w-[17rem] rounded-2xl bg-surface p-4 ring-1 ring-line">
      <div className="flex items-center gap-3">
        <span className="h-10 w-10 rounded-full bg-signal/80" />
        <div className="space-y-1.5">
          <span className="block h-2.5 w-24 rounded-full bg-ink/70" />
          <span className="block h-2 w-16 rounded-full bg-line" />
        </div>
      </div>
      <span className="mt-4 block h-2 w-full rounded-full bg-line" />
      <span className="mt-2 block h-6 w-4/5 rounded-md bg-flag-tint ring-2 ring-flag" />
      <span className="mt-2 block h-2 w-2/3 rounded-full bg-line" />
      <svg viewBox="0 0 48 48" className="absolute -right-4 -bottom-5 h-16 w-16 text-ink" fill="none">
        <circle cx="20" cy="20" r="13" stroke="currentColor" strokeWidth="5" fill="var(--color-surface)" fillOpacity="0.6" />
        <path d="M30 30l12 12" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      </svg>
    </div>
  )
}
