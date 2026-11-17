import { useEffect, useState } from 'react'
import { rooms, START_POINTS, PENALTY, MIN_POINTS } from '../content/escapeRoom.js'
import { shuffle, pickFresh } from '../lib/pick.js'
import ResultCard from '../components/ResultCard.jsx'
import GameHeader from '../components/GameHeader.jsx'

// Each game: one puzzle per room (dealt like a shuffled deck), shuffled
// answers and a fresh random exit code.
function newGame() {
  const puzzles = rooms.map((r) => pickFresh(`escape-${r.id}`, r.variants, 1)[0])
  return {
    code: rooms.map(() => Math.floor(Math.random() * 10)),
    puzzles,
    options: puzzles.map((p) => (p.options ? shuffle(p.options) : null)),
    start: Date.now(),
  }
}

const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

export default function EscapeRoom({ onHome }) {
  const [game, setGame] = useState(newGame)
  const [roomIdx, setRoomIdx] = useState(0) // rooms.length = the exit door
  const [solved, setSolved] = useState(false)
  const [wrong, setWrong] = useState([]) // wrong option texts tried in this room
  const [mistakes, setMistakes] = useState(0)
  const [toggles, setToggles] = useState({})
  const [panelMsg, setPanelMsg] = useState('')
  const [entry, setEntry] = useState('')
  const [exitMsg, setExitMsg] = useState('')
  const [elapsed, setElapsed] = useState(0)
  const [done, setDone] = useState(false)

  const room = rooms[roomIdx]
  const puzzle = game.puzzles[roomIdx]
  const atExit = roomIdx >= rooms.length
  const score = Math.max(MIN_POINTS, START_POINTS - mistakes * PENALTY)

  // Settings start in their unsafe positions.
  useEffect(() => {
    if (room?.type === 'settings') setToggles(Object.fromEntries(puzzle.settings.map((s) => [s.id, !s.safe])))
  }, [roomIdx, game]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (done) return
    const t = setInterval(() => setElapsed(Math.floor((Date.now() - game.start) / 1000)), 1000)
    return () => clearInterval(t)
  }, [done, game.start])

  function miss() {
    setMistakes((m) => m + 1)
  }

  function pick(opt) {
    if (solved || wrong.includes(opt.text)) return
    if (opt.correct) setSolved(true)
    else {
      setWrong((w) => [...w, opt.text])
      miss()
    }
  }

  function tryDoor() {
    const unsafe = puzzle.settings.filter((s) => toggles[s.id] !== s.safe).length
    if (unsafe === 0) {
      setSolved(true)
      setPanelMsg('')
    } else {
      miss()
      setPanelMsg(`The door stays shut. ${unsafe} setting${unsafe === 1 ? ' is' : 's are'} still not safe.`)
    }
  }

  function nextRoom() {
    setRoomIdx((i) => i + 1)
    setSolved(false)
    setWrong([])
    setPanelMsg('')
    window.scrollTo({ top: 0 })
  }

  function press(d) {
    if (entry.length >= 4) return
    const next = entry + d
    setEntry(next)
    setExitMsg('')
    if (next.length === 4) {
      if (next === game.code.join('')) {
        setElapsed(Math.floor((Date.now() - game.start) / 1000))
        setDone(true)
        window.scrollTo({ top: 0 })
      } else {
        miss()
        setExitMsg('That code didn’t work. Check your clues and try again.')
        setTimeout(() => setEntry(''), 600)
      }
    }
  }

  function replay() {
    setGame(newGame())
    setRoomIdx(0)
    setSolved(false)
    setWrong([])
    setMistakes(0)
    setPanelMsg('')
    setEntry('')
    setExitMsg('')
    setElapsed(0)
    setDone(false)
  }

  if (done) {
    return (
      <ResultCard
        game="Escape Room"
        score={score}
        max={START_POINTS}
        found={rooms.length}
        total={rooms.length}
        detail={`Escaped in ${fmt(elapsed)} with ${mistakes} wrong ${mistakes === 1 ? 'try' : 'tries'}`}
        onReplay={replay}
        replayLabel="Play again with a new code"
        onHome={onHome}
      />
    )
  }

  return (
    <div className="mx-auto max-w-3xl">
      <GameHeader
        title="Escape Room"
        step={Math.min(roomIdx + 1, rooms.length + 1)}
        steps={rooms.length + 1}
        stepLabel="Room"
        score={score}
        onHome={onHome}
      />

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <Clues code={game.code} found={roomIdx + (solved ? 1 : 0)} />
        <p className="font-mono text-ink-soft" aria-label={`Time ${fmt(elapsed)}`}>
          ⏱ {fmt(elapsed)}
        </p>
      </div>

      <div className="mt-4 rounded-card bg-surface shadow-sm ring-1 ring-line">
        {!atExit ? (
          <>
            <div className="border-b border-line px-6 py-5 sm:px-8">
              <h2 className="text-2xl">{room.name}</h2>
              <p className="mt-1 text-lg text-ink-soft">{puzzle.intro}</p>
            </div>
            <div className="px-6 py-6 sm:px-8 sm:py-8">
              <p className="font-display text-2xl">{puzzle.prompt}</p>
              {puzzle.hint && <p className="mt-1 text-ink-soft">Hint: {puzzle.hint}</p>}

              {room.type === 'choice' && (
                <ul className="mt-5 space-y-2.5">
                  {game.options[roomIdx].map((o) => {
                    const isWrong = wrong.includes(o.text)
                    const isRight = solved && o.correct
                    const style = isRight
                      ? 'bg-safe-tint ring-2 ring-safe'
                      : isWrong
                        ? 'bg-flag-tint ring-2 ring-flag'
                        : solved
                          ? 'bg-surface ring-1 ring-line opacity-55'
                          : 'bg-surface ring-1 ring-line hover:ring-2 hover:ring-signal'
                    return (
                      <li key={o.text}>
                        <button
                          type="button"
                          onClick={() => pick(o)}
                          disabled={solved || isWrong}
                          className={`w-full rounded-card px-5 py-4 text-left text-lg transition disabled:cursor-default ${puzzle.mono ? 'font-mono text-base break-all' : ''} ${style}`}
                        >
                          {o.text}
                        </button>
                        {(isWrong || isRight) && (
                          <p className={`mt-2 ml-1 border-l-4 pl-3 text-ink-soft ${isRight ? 'border-safe' : 'border-flag'}`}>
                            <span className="font-bold text-ink">{isRight ? 'Unlocked. ' : 'Locked. '}</span>
                            {o.why}
                          </p>
                        )}
                      </li>
                    )
                  })}
                </ul>
              )}

              {room.type === 'settings' && (
                <div className="mt-5">
                  <ul className="divide-y divide-line rounded-card ring-1 ring-line">
                    {puzzle.settings.map((s) => {
                      const on = !!toggles[s.id]
                      return (
                        <li key={s.id} className="flex items-center justify-between gap-4 px-5 py-4">
                          <div>
                            <p className="text-lg">{s.label}</p>
                            {solved && <p className="text-ink-soft">{s.why}</p>}
                          </div>
                          <button
                            type="button"
                            role="switch"
                            aria-checked={on}
                            aria-label={s.label}
                            disabled={solved}
                            onClick={() => setToggles((t) => ({ ...t, [s.id]: !t[s.id] }))}
                            className={`relative h-8 w-14 shrink-0 rounded-full transition ${on ? 'bg-signal' : 'bg-line'}`}
                          >
                            <span className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-all ${on ? 'left-7' : 'left-1'}`} />
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                  {!solved && (
                    <button type="button" onClick={tryDoor} className="mt-5 rounded-full bg-ink px-6 py-3 font-bold text-paper hover:bg-signal hover:text-white">
                      Try the door
                    </button>
                  )}
                  <p className="mt-3 text-flag" aria-live="polite">{panelMsg}</p>
                </div>
              )}

              {solved && (
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-card bg-safe-tint p-5 ring-1 ring-safe" aria-live="polite">
                  <p className="text-lg">
                    <span className="font-bold">Room unlocked!</span> You found a code digit:{' '}
                    <span className="font-display text-3xl">{game.code[roomIdx]}</span>
                  </p>
                  <button type="button" onClick={nextRoom} className="rounded-full bg-signal px-6 py-3 font-bold text-white hover:bg-deep">
                    {roomIdx + 1 >= rooms.length ? 'Go to the exit' : 'Next room'}
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="px-6 py-8 sm:px-8">
            <h2 className="text-3xl">The exit</h2>
            <p className="mt-1 text-lg text-ink-soft">Enter the four digits you found, in the order you found them.</p>
            <div className="mt-6 flex gap-3" aria-label={`Code entered: ${entry.split('').join(' ') || 'nothing yet'}`}>
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="flex h-16 w-14 items-center justify-center rounded-card bg-paper font-display text-3xl ring-1 ring-line">
                  {entry[i] ?? ''}
                </span>
              ))}
            </div>
            <p className="mt-3 min-h-6 text-flag" aria-live="polite">{exitMsg}</p>
            <div className="mt-3 grid max-w-[16rem] grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
                <Key key={d} onClick={() => press(String(d))}>{d}</Key>
              ))}
              <Key onClick={() => setEntry((e) => e.slice(0, -1))} label="Delete last digit">⌫</Key>
              <Key onClick={() => press('0')}>0</Key>
              <Key onClick={() => setEntry('')} label="Clear">C</Key>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Key({ children, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="h-14 rounded-card bg-surface font-display text-2xl ring-1 ring-line hover:ring-2 hover:ring-signal"
    >
      {children}
    </button>
  )
}

function Clues({ code, found }) {
  return (
    <div className="flex items-center gap-2" aria-label={`Code digits found: ${code.slice(0, found).join(' ') || 'none yet'}`}>
      <span className="text-ink-soft">Code:</span>
      {code.map((d, i) => (
        <span
          key={i}
          className={`flex h-9 w-8 items-center justify-center rounded-card font-display text-xl ${i < found ? 'bg-deep text-white' : 'bg-bubble text-ink-soft'}`}
        >
          {i < found ? d : '?'}
        </span>
      ))}
    </div>
  )
}
