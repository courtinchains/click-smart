export default function GameHeader({ title, step, steps, score, onHome }) {
  return (
    <div>
      <button type="button" onClick={onHome} className="font-bold text-signal underline-offset-4 hover:underline">
        All games
      </button>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[clamp(2.25rem,5vw,3.25rem)] leading-none font-extrabold tracking-tight">{title}</h1>
          {steps > 1 && (
            <p className="mt-2 text-lg text-ink-soft">
              Chat {step} of {steps}
            </p>
          )}
        </div>
        <p className="font-display text-2xl font-extrabold" aria-live="polite">
          {score} <span className="font-sans text-base font-normal text-ink-soft">points</span>
        </p>
      </div>
      {steps > 1 && (
        <div className="mt-4 flex gap-1.5" aria-hidden="true">
          {Array.from({ length: steps }, (_, i) => (
            <span key={i} className={`h-1.5 flex-1 rounded-full ${i < step ? 'bg-signal' : 'bg-line'}`} />
          ))}
        </div>
      )}
    </div>
  )
}
