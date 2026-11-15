import { useState } from 'react'

// A playable taste of Spot the Red Flags, right in the hero.
const MESSAGES = [
  { from: 'them', text: 'saw your drawings on the art page, they’re honestly so good' },
  { from: 'you', text: 'omg thank you!!' },
  { from: 'them', text: 'which school do you go to? i bet we live close 😊', flag: true },
  { from: 'them', text: 'do you take requests? i’d love a sketch of my cat' },
]

export default function HeroChat() {
  const [picked, setPicked] = useState(null) // index the visitor tapped
  const found = picked !== null && MESSAGES[picked].flag

  return (
    <div className="relative">
      <div className="rounded-card bg-white p-4 shadow-[0_24px_60px_-28px_rgba(26,27,65,0.45)] ring-1 ring-line sm:p-5">
        <div className="flex items-center gap-3 border-b border-line pb-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-bubble font-display text-sm font-bold text-ink-soft" aria-hidden="true">
            S
          </span>
          <div className="leading-tight">
            <p className="font-bold">sketchy_sam</p>
            <p className="text-sm text-ink-soft">Started following you today</p>
          </div>
        </div>

        <ol className="mt-4 space-y-2.5" aria-label="Example chat — tap the message that worries you">
          {MESSAGES.map((m, i) => {
            const delay = { animationDelay: `${250 + i * 450}ms` }
            if (m.from === 'you') {
              return (
                <li key={i} className="msg-in flex justify-end" style={delay}>
                  <p className="max-w-[78%] rounded-[20px] rounded-br-md bg-signal px-4 py-2.5 text-white">
                    <span className="sr-only">You: </span>
                    {m.text}
                  </p>
                </li>
              )
            }
            const isPicked = picked === i
            const style =
              found && m.flag
                ? 'bg-flag-tint ring-2 ring-flag'
                : isPicked
                  ? 'bg-bubble ring-2 ring-ink-soft/40'
                  : 'bg-bubble hover:ring-2 hover:ring-signal/40'
            return (
              <li key={i} className="msg-in" style={delay}>
                <button
                  type="button"
                  onClick={() => !found && setPicked(i)}
                  aria-pressed={isPicked}
                  className={`max-w-[85%] rounded-[20px] rounded-bl-md px-4 py-2.5 text-left transition ${style}`}
                >
                  {m.text}
                  {found && m.flag && (
                    <span className="mt-1.5 flex items-center gap-1.5 text-sm font-bold text-flag">
                      <FlagIcon /> Red flag
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ol>

        <div className="mt-4 min-h-[5.5rem] rounded-2xl px-1" aria-live="polite">
          {picked === null && (
            <p className="msg-in flex items-center gap-2 text-ink-soft" style={{ animationDelay: '2200ms' }}>
              <span className="flex gap-1" aria-hidden="true">
                <span className="typing-dot h-1.5 w-1.5 rounded-full bg-ink-soft" />
                <span className="typing-dot h-1.5 w-1.5 rounded-full bg-ink-soft [animation-delay:150ms]" />
                <span className="typing-dot h-1.5 w-1.5 rounded-full bg-ink-soft [animation-delay:300ms]" />
              </span>
              Tap the message that should make you pause.
            </p>
          )}
          {picked !== null && !found && (
            <p className="text-ink">
              <strong>That one’s okay.</strong> Compliments and normal questions aren’t the problem. Look for something
              that could help a stranger find you.
            </p>
          )}
          {found && (
            <div>
              <p>
                <strong>Spotted.</strong> Your school tells someone where to find you every weekday. People you only
                know online don’t need it.
              </p>
              <a href="#/red-flags" className="mt-3 inline-flex rounded-full bg-deep px-5 py-2.5 font-bold text-white hover:bg-signal">
                Play the full game
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function FlagIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
      <path d="M4 2.5v15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M5 3.5h10l-2.5 3.75L15 11H5z" fill="currentColor" />
    </svg>
  )
}
