import { useState } from 'react'
import { profile, POINTS_CORRECT, POINTS_WRONG } from '../content/privacyProfile.js'
import ResultCard from '../components/ResultCard.jsx'
import GameHeader from '../components/GameHeader.jsx'

const RISKY_TOTAL = profile.items.filter((i) => i.risky).length
const MAX_SCORE = RISKY_TOTAL * POINTS_CORRECT

const TIPS = [
  'Set your account to private and review who follows you.',
  'Leave out your school, address, phone number and full birthday.',
  'Post locations and trips after you’ve left, not while you’re there.',
  'Check photo backgrounds for uniforms, street signs and house numbers.',
  'Use passwords nobody could guess from your posts — a password manager helps.',
]

export default function PrivacyDetective({ onHome }) {
  const [selected, setSelected] = useState(new Set())
  const [checked, setChecked] = useState(false)
  const [done, setDone] = useState(false)

  const correct = profile.items.filter((i) => i.risky && selected.has(i.id)).length
  const wrong = profile.items.filter((i) => !i.risky && selected.has(i.id)).length
  const score = checked ? Math.max(0, correct * POINTS_CORRECT - wrong * POINTS_WRONG) : 0

  function toggle(id) {
    if (checked) return
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function replay() {
    setSelected(new Set())
    setChecked(false)
    setDone(false)
  }

  if (done) {
    return (
      <ResultCard
        game="Privacy Detective"
        score={score}
        max={MAX_SCORE}
        found={correct}
        total={RISKY_TOTAL}
        onReplay={replay}
        onHome={onHome}
      />
    )
  }

  const byKind = (kind) => profile.items.filter((i) => i.kind === kind)

  return (
    <div>
      <GameHeader title="Privacy Detective" step={1} steps={1} score={score} onHome={onHome} />

      <p className="mt-4 text-stone-700">
        {checked
          ? 'Case closed! Green = risks you caught, amber = risks you missed, grey = safe to share.'
          : `This is a fictional profile. Tap everything that could put Alex's privacy or safety at risk. There are ${RISKY_TOTAL} to find.`}
      </p>

      <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_18rem]">
        {/* Fictional profile */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-stone-200">
          <div className="h-24 bg-gradient-to-r from-violet-300 via-pink-200 to-amber-200" aria-hidden="true" />
          <div className="px-5 pb-6 sm:px-6">
            <div className="-mt-10 flex items-end gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-violet-600 text-2xl font-bold text-white ring-4 ring-white" aria-hidden="true">
                {profile.avatarInitials}
              </div>
              <div className="pb-1">
                <p className="text-xl font-bold text-stone-900">{profile.displayName}</p>
                <p className="text-sm text-stone-500">{profile.handle}</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-stone-600">
              <strong className="text-stone-900">{profile.followers}</strong> followers ·{' '}
              <strong className="text-stone-900">{profile.following}</strong> following
            </p>

            <Group label="Bio">
              {byKind('bio').map((item) => (
                <Item key={item.id} item={item} selected={selected} checked={checked} onToggle={toggle} />
              ))}
            </Group>
            <Group label="Details">
              {byKind('detail').map((item) => (
                <Item key={item.id} item={item} selected={selected} checked={checked} onToggle={toggle} />
              ))}
            </Group>
            <Group label="Recent posts">
              {byKind('post').map((item) => (
                <Item key={item.id} item={item} selected={selected} checked={checked} onToggle={toggle} post />
              ))}
            </Group>
          </div>
        </div>

        {/* Side panel */}
        <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-stone-200">
            <p className="text-sm text-stone-600" aria-live="polite">
              {checked ? (
                <>
                  You found <strong className="text-stone-900">{correct} of {RISKY_TOTAL}</strong> risks
                  {wrong > 0 && ` and flagged ${wrong} safe item${wrong === 1 ? '' : 's'}`}.
                </>
              ) : (
                <>
                  <strong className="text-stone-900">{selected.size}</strong> item{selected.size === 1 ? '' : 's'} flagged
                </>
              )}
            </p>
            {checked ? (
              <button type="button" onClick={() => { setDone(true); window.scrollTo({ top: 0 }) }} className="mt-4 w-full rounded-full bg-teal-700 px-6 py-3 font-semibold text-white hover:bg-teal-800">
                See my result
              </button>
            ) : (
              <button type="button" onClick={() => setChecked(true)} className="mt-4 w-full rounded-full bg-teal-700 px-6 py-3 font-semibold text-white hover:bg-teal-800">
                Check my answers
              </button>
            )}
          </div>
          {checked && (
            <div className="rounded-3xl bg-teal-50 p-5 ring-1 ring-teal-200">
              <h2 className="font-semibold text-teal-950">Safer sharing checklist</h2>
              <ul className="mt-2 space-y-2 text-sm text-teal-900">
                {TIPS.map((t) => (
                  <li key={t} className="flex gap-2">
                    <span aria-hidden="true">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

function Group({ label, children }) {
  return (
    <section className="mt-5">
      <h2 className="text-xs font-semibold tracking-widest text-stone-500 uppercase">{label}</h2>
      <ul className="mt-2 space-y-2">{children}</ul>
    </section>
  )
}

function Item({ item, selected, checked, onToggle, post = false }) {
  const isSel = selected.has(item.id)
  let state = isSel ? 'selected' : 'idle'
  if (checked) {
    if (item.risky && isSel) state = 'hit'
    else if (item.risky) state = 'missed'
    else if (isSel) state = 'wrong'
    else state = 'safe'
  }

  const styles = {
    idle: 'bg-white ring-1 ring-stone-200 hover:ring-stone-400',
    selected: 'bg-red-50 ring-2 ring-red-500',
    hit: 'bg-emerald-50 ring-2 ring-emerald-600',
    missed: 'bg-amber-50 ring-2 ring-amber-500',
    wrong: 'bg-stone-100 ring-2 ring-stone-400',
    safe: 'bg-stone-50 ring-1 ring-stone-200',
  }[state]

  const verdict = {
    hit: '✅ Risk spotted',
    missed: '⚠️ Missed risk',
    wrong: 'This one is fine to share',
    safe: 'Safe to share',
  }[state]

  return (
    <li>
      <button
        type="button"
        onClick={() => onToggle(item.id)}
        disabled={checked}
        aria-pressed={isSel}
        className={`w-full rounded-2xl px-4 text-left text-stone-900 transition focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-teal-500 disabled:cursor-default ${post ? 'py-3' : 'py-2'} ${styles}`}
      >
        <span className="block">{item.text}</span>
        {!checked && isSel && <span className="mt-1 block text-xs font-semibold text-red-700">🔎 Flagged as a risk</span>}
        {checked && (
          <span className="mt-1.5 block text-sm">
            <span className="font-semibold">{verdict}.</span> <span className="text-stone-700">{item.why}</span>
          </span>
        )}
      </button>
    </li>
  )
}
