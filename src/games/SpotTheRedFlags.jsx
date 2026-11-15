import { useState } from 'react'
import { scenarios as allScenarios, POINTS_CORRECT, POINTS_WRONG, ROUND_SIZE } from '../content/redFlags.js'
import { pickFresh } from '../lib/pick.js'
import ResultCard from '../components/ResultCard.jsx'
import GameHeader from '../components/GameHeader.jsx'
import { FlagIcon } from '../components/HeroChat.jsx'

const newRound = () => pickFresh('red-flags', allScenarios, ROUND_SIZE)

export default function SpotTheRedFlags({ onHome }) {
  const [scenarios, setScenarios] = useState(newRound)
  const TOTAL_FLAGS = scenarios.reduce((n, s) => n + s.messages.filter((m) => m.flag).length, 0)
  const MAX_SCORE = TOTAL_FLAGS * POINTS_CORRECT
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(new Set())
  const [checked, setChecked] = useState(false)
  const [score, setScore] = useState(0)
  const [found, setFound] = useState(0)
  const [done, setDone] = useState(false)

  const scenario = scenarios[index]

  function toggle(i) {
    if (checked) return
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  function check() {
    let correct = 0
    let wrong = 0
    selected.forEach((i) => (scenario.messages[i].flag ? correct++ : wrong++))
    setFound((f) => f + correct)
    setScore((s) => Math.max(0, s + correct * POINTS_CORRECT - wrong * POINTS_WRONG))
    setChecked(true)
  }

  function next() {
    if (index + 1 >= scenarios.length) {
      setDone(true)
      window.scrollTo({ top: 0 })
      return
    }
    setIndex(index + 1)
    setSelected(new Set())
    setChecked(false)
    window.scrollTo({ top: 0 })
  }

  function replay() {
    setScenarios(newRound())
    setIndex(0)
    setSelected(new Set())
    setChecked(false)
    setScore(0)
    setFound(0)
    setDone(false)
  }

  if (done) {
    return (
      <ResultCard
        game="Spot the Red Flags"
        score={score}
        max={MAX_SCORE}
        found={found}
        total={TOTAL_FLAGS}
        onReplay={replay}
        replayLabel="Play new chats"
        onHome={onHome}
      />
    )
  }

  const flagsHere = scenario.messages.filter((m) => m.flag).length

  return (
    <div>
      <GameHeader
        title="Spot the Red Flags"
        step={index + 1}
        steps={scenarios.length}
        score={score}
        onHome={onHome}
      />

      <div className="mt-6 overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-line">
        <div className="border-b border-line px-5 py-4 sm:px-6">
          <h2 className="text-2xl font-bold">{scenario.title}</h2>
          <p className="text-sm text-ink-soft">{scenario.setting}</p>
        </div>

        <p className="bg-paper px-5 py-3 text-ink-soft sm:px-6">
          {checked
            ? 'Here’s how you did. Read the explanations below each message.'
            : 'Tap every message from the other person that feels like a red flag, then check your answers.'}
        </p>

        <ol className="space-y-3 px-4 py-5 sm:px-6" aria-label={`Conversation with ${scenario.contact}`}>
          {scenario.messages.map((m, i) => {
            const mine = m.from === 'you'
            const isSel = selected.has(i)
            let state = 'idle'
            if (checked) {
              if (m.flag && isSel) state = 'hit'
              else if (m.flag) state = 'missed'
              else if (isSel) state = 'wrong'
            }

            if (mine) {
              return (
                <li key={i} className="flex justify-end">
                  <p className="max-w-[80%] rounded-[20px] rounded-br-md bg-signal px-4 py-2.5 text-white">
                    <span className="sr-only">You: </span>
                    {m.text}
                  </p>
                </li>
              )
            }

            const bubble = {
              idle: isSel
                ? 'bg-flag-tint ring-2 ring-flag'
                : 'bg-bubble hover:ring-2 hover:ring-signal/40',
              hit: 'bg-safe-tint ring-2 ring-safe',
              missed: 'bg-white outline-2 outline-dashed outline-flag',
              wrong: 'bg-bubble ring-2 ring-ink-soft/40',
            }[state]

            return (
              <li key={i} className="flex flex-col items-start">
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  disabled={checked}
                  aria-pressed={isSel}
                  className={`max-w-[85%] rounded-[20px] rounded-bl-md px-4 py-2 text-left text-ink transition disabled:cursor-default ${bubble}`}
                >
                  <span className="block text-sm font-bold text-ink-soft">{scenario.contact}</span>
                  {m.text}
                  {!checked && isSel && (
                    <span className="mt-1 flex items-center gap-1.5 text-sm font-bold text-flag"><FlagIcon /> Flagged</span>
                  )}
                </button>

                {state === 'hit' && (
                  <Explanation tone="emerald" title={`Spotted: ${m.flag.label}`} body={m.flag.why} />
                )}
                {state === 'missed' && (
                  <Explanation tone="amber" title={`Missed: ${m.flag.label}`} body={m.flag.why} />
                )}
                {state === 'wrong' && (
                  <Explanation
                    tone="stone"
                    title="This one was okay"
                    body="Not every friendly message is a warning sign — it's the patterns that matter."
                  />
                )}
              </li>
            )
          })}
        </ol>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-4 sm:px-6">
          <p className="text-sm text-ink-soft" aria-live="polite">
            {checked
              ? `${scenario.messages.filter((m, i) => m.flag && selected.has(i)).length} of ${flagsHere} red flags found`
              : `${selected.size} flagged`}
          </p>
          {checked ? (
            <button type="button" onClick={next} className="rounded-full bg-signal px-6 py-3 font-bold text-white hover:bg-ink">
              {index + 1 >= scenarios.length ? 'See my result' : 'Next chat'}
            </button>
          ) : (
            <button
              type="button"
              onClick={check}
              className="rounded-full bg-signal px-6 py-3 font-bold text-white hover:bg-ink"
            >
              Check my answers
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function Explanation({ tone, title, body }) {
  const tones = {
    emerald: 'border-safe text-ink',
    amber: 'border-flag text-ink',
    stone: 'border-line text-ink-soft',
  }
  return (
    <div className={`mt-2 ml-3 max-w-[85%] border-l-4 pl-3 ${tones[tone]}`}>
      <p className="font-semibold">{title}</p>
      <p className="mt-0.5">{body}</p>
    </div>
  )
}
