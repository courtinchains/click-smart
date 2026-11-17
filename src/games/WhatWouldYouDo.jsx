import { useState } from 'react'
import { scenarios, ROUND_SIZE, POINTS, STEPS_PER_SCENARIO } from '../content/whatWouldYouDo.js'
import { pickFresh } from '../lib/pick.js'
import ResultCard from '../components/ResultCard.jsx'
import GameHeader from '../components/GameHeader.jsx'

const newRound = () => pickFresh('what-would-you-do', scenarios, ROUND_SIZE)

const QUALITY = {
  best: { label: 'Best choice', box: 'bg-safe-tint ring-2 ring-safe', bar: 'border-safe' },
  okay: { label: 'Okay, but…', box: 'bg-bubble ring-2 ring-signal', bar: 'border-signal' },
  risky: { label: 'Risky', box: 'bg-flag-tint ring-2 ring-flag', bar: 'border-flag' },
}

export default function WhatWouldYouDo({ onHome }) {
  const [round, setRound] = useState(newRound)
  const [index, setIndex] = useState(0) // which scenario
  const [nodeId, setNodeId] = useState('start')
  const [picked, setPicked] = useState(null) // index of the chosen option at this node
  const [path, setPath] = useState([]) // choices made in this scenario
  const [score, setScore] = useState(0)
  const [bestCount, setBestCount] = useState(0)
  const [done, setDone] = useState(false)

  const scenario = round[index]
  const node = scenario.nodes[nodeId]
  const choice = picked !== null ? node.choices[picked] : null
  const scenarioOver = choice && !choice.next
  const maxScore = round.length * STEPS_PER_SCENARIO * POINTS.best

  function choose(i) {
    if (picked !== null) return
    const c = node.choices[i]
    setPicked(i)
    setPath((p) => [...p, c])
    setScore((s) => s + POINTS[c.quality])
    if (c.quality === 'best') setBestCount((n) => n + 1)
  }

  function proceed() {
    if (!scenarioOver) {
      setNodeId(choice.next)
      setPicked(null)
      return
    }
    if (index + 1 >= round.length) {
      setDone(true)
      window.scrollTo({ top: 0 })
      return
    }
    setIndex(index + 1)
    setNodeId('start')
    setPicked(null)
    setPath([])
    window.scrollTo({ top: 0 })
  }

  function replay() {
    setRound(newRound())
    setIndex(0)
    setNodeId('start')
    setPicked(null)
    setPath([])
    setScore(0)
    setBestCount(0)
    setDone(false)
  }

  if (done) {
    const decisions = round.length * STEPS_PER_SCENARIO
    return (
      <ResultCard
        game="What Would You Do?"
        score={score}
        max={maxScore}
        found={bestCount}
        total={decisions}
        foundLabel="best choices"
        onReplay={replay}
        replayLabel="Play new situations"
        onHome={onHome}
      />
    )
  }

  const step = path.length + (picked === null ? 1 : 0)

  return (
    <div className="mx-auto max-w-3xl">
      <GameHeader title="What Would You Do?" step={index + 1} steps={round.length} stepLabel="Situation" score={score} onHome={onHome} />

      <div className="mt-6 rounded-card bg-surface shadow-sm ring-1 ring-line">
        <div className="border-b border-line px-6 py-5 sm:px-8">
          <h2 className="text-2xl">{scenario.title}</h2>
          <p className="text-ink-soft">{scenario.setting}</p>
        </div>

        <div className="px-6 py-6 sm:px-8 sm:py-8">
          <p className="text-sm text-ink-soft">
            Decision {Math.min(step, STEPS_PER_SCENARIO)} of {STEPS_PER_SCENARIO}
          </p>

          {node.text && <p className="mt-2 font-display text-[clamp(1.35rem,3.2vw,1.75rem)] leading-snug">{node.text}</p>}
          {node.message && (
            <div className="mt-3">
              <p className="text-sm font-bold text-ink-soft">{node.message.from}</p>
              <p className="mt-1 inline-block max-w-[90%] rounded-[20px] rounded-bl-md bg-bubble px-4 py-3 text-lg">{node.message.text}</p>
            </div>
          )}

          <p className="mt-7 font-bold">What would you do?</p>
          <ul className="mt-3 space-y-2.5" aria-live="polite">
            {node.choices.map((c, i) => {
              const isPicked = picked === i
              const q = QUALITY[c.quality]
              const style =
                picked === null
                  ? 'bg-surface ring-1 ring-line hover:ring-2 hover:ring-signal'
                  : isPicked
                    ? q.box
                    : 'bg-surface ring-1 ring-line opacity-55'
              return (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => choose(i)}
                    disabled={picked !== null}
                    aria-pressed={isPicked}
                    className={`w-full rounded-card px-5 py-4 text-left text-lg transition disabled:cursor-default ${style}`}
                  >
                    {c.text}
                  </button>
                  {isPicked && (
                    <div className={`mt-3 ml-1 border-l-4 pl-4 ${q.bar}`}>
                      <p className="font-bold">
                        {q.label} <span className="font-normal text-ink-soft">(+{POINTS[c.quality]})</span>
                      </p>
                      <p className="mt-1 text-lg text-ink-soft">{c.feedback}</p>
                      {c.quality !== 'best' && (
                        <p className="mt-2 text-ink-soft">
                          <span className="font-bold text-ink">Best choice here: </span>
                          {node.choices.find((x) => x.quality === 'best')?.text}
                        </p>
                      )}
                    </div>
                  )}
                </li>
              )
            })}
          </ul>

          {picked !== null && (
            <button type="button" onClick={proceed} className="mt-8 rounded-full bg-signal px-6 py-3 font-bold text-white hover:bg-deep">
              {!scenarioOver ? 'See what happens next' : index + 1 >= round.length ? 'See my result' : 'Next situation'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
