import { useState } from 'react'
import { campaign } from '../config.js'

export default function ShareButton({ text, label = 'Share your result' }) {
  const [status, setStatus] = useState('')
  const url = campaign.siteUrl || window.location.origin
  const message = `${text} Think you can beat it? ${url} ${campaign.hashtag}`

  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({ title: `${campaign.name}: ${campaign.tagline}`, text: message })
        return
      }
      await navigator.clipboard.writeText(message)
      setStatus('Copied. Paste it anywhere to challenge your friends.')
    } catch (err) {
      if (err?.name === 'AbortError') return
      setStatus('Couldn’t copy automatically. Select the text below instead.')
    }
  }

  return (
    <div>
      <button type="button" onClick={share} className="rounded-full bg-signal px-6 py-3 text-lg font-bold text-white hover:bg-deep">
        {label}
      </button>
      <p role="status" className="mt-2 min-h-6 text-ink-soft">
        {status}
      </p>
      {status.startsWith('Couldn') && (
        <textarea readOnly value={message} className="mt-1 w-full rounded-xl border border-line p-3" rows={3} />
      )}
    </div>
  )
}
