import { useState } from 'react'
import { statements, ROUND_SIZE, POINTS_CORRECT } from '../content/mythOrFact.js'
import { pickFresh } from '../lib/pick.js'
import ResultCard from '../components/ResultCard.jsx'
import GameHeader from '../components/GameHeader.jsx'

const newRound = () => pickFresh('myth-or-fact', statements, ROUND_SIZE)

export default function MythOrFact({ onHome }) {
  const [round, setRound] = useState(newRound)
  const [index, setIndex] = useState(0)
  const [answer, setAnswer] = useState(null) // 'myth' | 'fact' for the current card
  const [correct, setCorrect] = useState(0)
  const [done, setDone] = useState(false)

  const item = round[index]
  const answered = answer !== null
  const right = answered && answer === item.answer
  const score = correct * POINTS_CORRECT

  function choose(choice) {
    if (answered) return
    setAnswer(choice)
    if (choice === item.answer) setCorrect((c) => c + 1)
  }

  function next() {
    if (index + 1 >= round.length) {
      setDone(true)
      window.scrollTo({ top: 0 })
      return
    }
    setIndex(index + 1)
    setAnswer(null)
  }

  function replay() {
    setRound(newRound())
    setIndex(0)
    setAnswer(null)
    setCorrect(0)
    setDone(false)
  }

  if (done) {
    return (
      <ResultCard
        game="Myth or Fact"
        score={score}
        max={round.length * POINTS_CORRECT}
        found={correct}
        total={round.length}
        foundLabel="correct"
        onReplay={replay}
        replayLabel="Play new statements"
        onHome={onHome}
      />
    )
  }

  const choiceStyle = (choice) => {
    if (!answered) return 'bg-surface ring-1 ring-line hover:ring-2 hover:ring-signal'
    if (choice === item.answer) return 'bg-safe-tint ring-2 ring-safe'
    if (choice === answer) return 'bg-flag-tint ring-2 ring-flag'
    return 'bg-surface ring-1 ring-line opacity-60'
  }

  return (
    <div className="mx-auto max-w-3xl">
      <GameHeader title="Myth or Fact" step={index + 1} steps={round.length} stepLabel="Statement" score={score} onHome={onHome} />

      <div className="mt-6 rounded-card bg-surface p-6 shadow-sm ring-1 ring-line sm:p-10">
        <p className="text-ink-soft">Myth or fact?</p>
        <p className="mt-3 font-display text-[clamp(1.6rem,4vw,2.35rem)] leading-tight tracking-[-0.015em]" aria-live="polite">
          {item.text}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3" role="group" aria-label="Your answer">
          {['myth', 'fact'].map((choice) => (
            <button
              key={choice}
              type="button"
              onClick={() => choose(choice)}
              disabled={answered}
              aria-pressed={answer === choice}
              className={`rounded-card px-4 py-5 font-display text-2xl capitalize transition disabled:cursor-default sm:text-3xl ${choiceStyle(choice)}`}
            >
              {choice}
            </button>
          ))}
        </div>

        <div aria-live="polite">
          {answered && (
            <div className={`mt-6 border-l-4 pl-4 ${right ? 'border-safe' : 'border-flag'}`}>
              <p className="text-lg font-bold">
                {right ? 'Correct.' : 'Not quite.'} It’s a {item.answer}.
              </p>
              <p className="mt-1 text-lg text-ink-soft">{item.why}</p>
            </div>
          )}
        </div>

        {answered && (
          <button type="button" onClick={next} className="mt-8 rounded-full bg-signal px-6 py-3 font-bold text-white hover:bg-deep">
            {index + 1 >= round.length ? 'See my result' : 'Next statement'}
          </button>
        )}
      </div>
    </div>
  )
}
