import { useState } from 'react'
import { campaign } from '../config.js'

export default function ShareButton({ text, label = 'Share your result' }) {
  const [status, setStatus] = useState('')
  const url = campaign.siteUrl || window.location.origin
  const message = `${text} Think you can beat it? ${url} ${campaign.hashtag}`

  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({ title: `${campaign.name} – ${campaign.tagline}`, text: message })
        return
      }
      await navigator.clipboard.writeText(message)
      setStatus('Copied! Paste it anywhere to challenge your friends.')
    } catch (err) {
      if (err?.name === 'AbortError') return
      setStatus('Could not copy automatically — select the text below.')
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={share}
        className="inline-flex items-center gap-2 rounded-full bg-teal-700 px-5 py-3 font-semibold text-white transition hover:bg-teal-800 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
      >
        {label}
      </button>
      <p role="status" className="mt-2 min-h-5 text-sm text-stone-600">
        {status}
      </p>
      {status.startsWith('Could not') && (
        <textarea readOnly value={message} className="mt-1 w-full rounded-lg border border-stone-300 p-2 text-sm" rows={3} />
      )}
    </div>
  )
}
