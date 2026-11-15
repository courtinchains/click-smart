export default function GameHeader({ title, step, steps, score, onHome }) {
  return (
    <div>
      <button
        type="button"
        onClick={onHome}
        className="text-sm font-semibold text-teal-800 hover:underline"
      >
        ← All games
      </button>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-stone-900">{title}</h1>
          {steps > 1 && (
            <p className="mt-1 text-stone-600">
              Round {step} of {steps}
            </p>
          )}
        </div>
        <p className="rounded-full bg-white px-4 py-2 font-semibold text-stone-900 ring-1 ring-stone-200" aria-live="polite">
          Score: {score}
        </p>
      </div>
      {steps > 1 && (
        <div className="mt-3 flex gap-1.5" aria-hidden="true">
          {Array.from({ length: steps }, (_, i) => (
            <span key={i} className={`h-1.5 flex-1 rounded-full ${i < step ? 'bg-teal-700' : 'bg-stone-200'}`} />
          ))}
        </div>
      )}
    </div>
  )
}
