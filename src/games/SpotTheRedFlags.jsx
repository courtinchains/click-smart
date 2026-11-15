import { useState } from 'react'
import { scenarios, POINTS_CORRECT, POINTS_WRONG } from '../content/redFlags.js'
import ResultCard from '../components/ResultCard.jsx'
import GameHeader from '../components/GameHeader.jsx'

const TOTAL_FLAGS = scenarios.reduce((n, s) => n + s.messages.filter((m) => m.flag).length, 0)
const MAX_SCORE = TOTAL_FLAGS * POINTS_CORRECT

export default function SpotTheRedFlags({ onHome }) {
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

      <div className="mt-6 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-stone-200">
        <div className="border-b border-stone-200 px-5 py-4 sm:px-6">
          <h2 className="text-xl font-bold text-stone-900">{scenario.title}</h2>
          <p className="text-sm text-stone-600">{scenario.setting}</p>
        </div>

        <p className="bg-teal-50 px-5 py-3 text-sm text-teal-900 sm:px-6">
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
                  <p className="max-w-[80%] rounded-2xl rounded-br-sm bg-teal-700 px-4 py-2 text-white">
                    <span className="sr-only">You: </span>
                    {m.text}
                  </p>
                </li>
              )
            }

            const bubble = {
              idle: isSel
                ? 'bg-red-50 ring-2 ring-red-500'
                : 'bg-stone-100 ring-1 ring-stone-200 hover:ring-stone-400',
              hit: 'bg-emerald-50 ring-2 ring-emerald-600',
              missed: 'bg-amber-50 ring-2 ring-amber-500',
              wrong: 'bg-stone-100 ring-2 ring-stone-400',
            }[state]

            return (
              <li key={i} className="flex flex-col items-start">
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  disabled={checked}
                  aria-pressed={isSel}
                  className={`max-w-[85%] rounded-2xl rounded-bl-sm px-4 py-2 text-left text-stone-900 transition focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-teal-500 disabled:cursor-default ${bubble}`}
                >
                  <span className="block text-xs font-semibold text-stone-500">{scenario.contact}</span>
                  {m.text}
                  {!checked && isSel && (
                    <span className="mt-1 block text-xs font-semibold text-red-700">🚩 Flagged</span>
                  )}
                </button>

                {state === 'hit' && (
                  <Explanation tone="emerald" title={`✅ You spotted it: ${m.flag.label}`} body={m.flag.why} />
                )}
                {state === 'missed' && (
                  <Explanation tone="amber" title={`⚠️ Missed red flag: ${m.flag.label}`} body={m.flag.why} />
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

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-stone-200 px-5 py-4 sm:px-6">
          <p className="text-sm text-stone-600" aria-live="polite">
            {checked
              ? `${scenario.messages.filter((m, i) => m.flag && selected.has(i)).length} of ${flagsHere} red flags found`
              : `${selected.size} flagged`}
          </p>
          {checked ? (
            <button type="button" onClick={next} className="rounded-full bg-teal-700 px-6 py-3 font-semibold text-white hover:bg-teal-800">
              {index + 1 >= scenarios.length ? 'See my result' : 'Next conversation →'}
            </button>
          ) : (
            <button
              type="button"
              onClick={check}
              className="rounded-full bg-teal-700 px-6 py-3 font-semibold text-white hover:bg-teal-800"
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
    emerald: 'border-emerald-600 text-emerald-950',
    amber: 'border-amber-500 text-amber-950',
    stone: 'border-stone-400 text-stone-700',
  }
  return (
    <div className={`mt-2 ml-2 max-w-[85%] border-l-4 pl-3 text-sm ${tones[tone]}`}>
      <p className="font-semibold">{title}</p>
      <p className="mt-0.5">{body}</p>
    </div>
  )
}
