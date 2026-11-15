import { useState } from 'react'
import { profiles, POINTS_CORRECT, POINTS_WRONG } from '../content/privacyProfile.js'
import { pickFresh } from '../lib/pick.js'
import ResultCard from '../components/ResultCard.jsx'
import GameHeader from '../components/GameHeader.jsx'

const newProfile = () => pickFresh('privacy', profiles, 1)[0]

const TIPS = [
  'Set your account to private and review who follows you.',
  'Leave out your school, address, phone number and full birthday.',
  'Post locations and trips after you’ve left, not while you’re there.',
  'Check photo backgrounds for uniforms, street signs and house numbers.',
  'Use passwords nobody could guess from your posts — a password manager helps.',
]

export default function PrivacyDetective({ onHome }) {
  const [profile, setProfile] = useState(newProfile)
  const RISKY_TOTAL = profile.items.filter((i) => i.risky).length
  const MAX_SCORE = RISKY_TOTAL * POINTS_CORRECT
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
    setProfile(newProfile())
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
        replayLabel="Investigate a new profile"
        onHome={onHome}
      />
    )
  }

  const byKind = (kind) => profile.items.filter((i) => i.kind === kind)

  return (
    <div>
      <GameHeader title="Privacy Detective" step={1} steps={1} score={score} onHome={onHome} />

      <p className="mt-4 text-ink">
        {checked
          ? 'Case closed! Green means you caught it, a dashed red outline means you missed it, and grey is safe to share.'
          : `This is a fictional profile. Tap everything on this profile that could put someone’s privacy or safety at risk. There are ${RISKY_TOTAL} to find.`}
      </p>

      <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_18rem]">
        {/* Fictional profile */}
        <div className="overflow-hidden rounded-card bg-surface shadow-sm ring-1 ring-line">
          <div className="h-24" style={{ background: `linear-gradient(90deg, ${profile.banner[0]}, ${profile.banner[1]})` }} aria-hidden="true" />
          <div className="px-5 pb-6 sm:px-6">
            <div className="-mt-10 flex h-20 w-20 items-center justify-center rounded-full bg-deep font-display text-2xl text-white ring-4 ring-surface" aria-hidden="true">
              {profile.avatarInitials}
            </div>
            <p className="mt-3 text-2xl font-bold">{profile.displayName}</p>
            <p className="text-ink-soft">{profile.handle}</p>
            <p className="mt-3 text-sm text-ink-soft">
              <strong className="text-ink">{profile.followers}</strong> followers ·{' '}
              <strong className="text-ink">{profile.following}</strong> following
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
          <div className="rounded-card bg-surface p-5 shadow-sm ring-1 ring-line">
            <p className="text-sm text-ink-soft" aria-live="polite">
              {checked ? (
                <>
                  You found <strong className="text-ink">{correct} of {RISKY_TOTAL}</strong> risks
                  {wrong > 0 && ` and flagged ${wrong} safe item${wrong === 1 ? '' : 's'}`}.
                </>
              ) : (
                <>
                  <strong className="text-ink">{selected.size}</strong> item{selected.size === 1 ? '' : 's'} flagged
                </>
              )}
            </p>
            {checked ? (
              <button type="button" onClick={() => { setDone(true); window.scrollTo({ top: 0 }) }} className="mt-4 w-full rounded-full bg-signal px-6 py-3 font-bold text-white hover:bg-deep">
                See my result
              </button>
            ) : (
              <button type="button" onClick={() => setChecked(true)} className="mt-4 w-full rounded-full bg-signal px-6 py-3 font-bold text-white hover:bg-deep">
                Check my answers
              </button>
            )}
          </div>
          {checked && (
            <div className="rounded-card bg-safe-tint p-5">
              <h2 className="font-semibold text-ink">Safer sharing checklist</h2>
              <ul className="mt-2 space-y-2 text-sm text-ink">
                {TIPS.map((t) => (
                  <li key={t} className="flex gap-2">
                    <span aria-hidden="true" className="font-bold text-safe">✓</span>
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
      <h2 className="text-sm font-bold text-ink-soft">{label}</h2>
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
    idle: 'bg-surface ring-1 ring-line hover:ring-2 hover:ring-signal/40',
    selected: 'bg-flag-tint ring-2 ring-flag',
    hit: 'bg-safe-tint ring-2 ring-safe',
    missed: 'bg-surface outline-2 outline-dashed outline-flag',
    wrong: 'bg-bubble ring-2 ring-ink-soft/40',
    safe: 'bg-paper ring-1 ring-line',
  }[state]

  const verdict = {
    hit: 'Risk spotted',
    missed: 'Missed risk',
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
        className={`w-full rounded-2xl px-4 text-left text-ink transition disabled:cursor-default ${post ? 'py-3' : 'py-2'} ${styles}`}
      >
        <span className="block">{item.text}</span>
        {!checked && isSel && <span className="mt-1 block text-sm font-bold text-flag">Flagged as a risk</span>}
        {checked && (
          <span className="mt-1.5 block text-sm">
            <span className="font-semibold">{verdict}.</span> <span className="text-ink">{item.why}</span>
          </span>
        )}
      </button>
    </li>
  )
}
