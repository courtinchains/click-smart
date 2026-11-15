import { useEffect, useState } from 'react'
import { campaign, showOrg } from '../config.js'
import { makeResultImage } from '../lib/resultImage.js'

// Share options for a finished game. Every link opens the chosen app in a new
// tab; this site sends nothing anywhere itself.
export default function ShareButton({ result }) {
  const [status, setStatus] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [imageFile, setImageFile] = useState(null)

  const url = campaign.siteUrl || window.location.origin
  const line = `I scored ${result.score}/${result.max} on ${result.game} and earned "${result.badge}" on ${campaign.name}. Think you can beat it?`
  const full = `${line} ${url} ${campaign.hashtag}`

  // Build the result image once, in the background.
  useEffect(() => {
    let revoke
    makeResultImage({ ...result, siteUrl: url, organisation: showOrg ? campaign.organisation : '' })
      .then((file) => {
        setImageFile(file)
        revoke = URL.createObjectURL(file)
        setImageUrl(revoke)
      })
      .catch(() => {})
    return () => revoke && URL.revokeObjectURL(revoke)
  }, [result.game, result.score, result.max, result.badge]) // eslint-disable-line react-hooks/exhaustive-deps

  const canNativeShare = typeof navigator !== 'undefined' && !!navigator.share
  const canShareImage =
    imageFile && typeof navigator !== 'undefined' && navigator.canShare?.({ files: [imageFile] })

  async function nativeShare() {
    try {
      const data = { title: `${campaign.name}: ${campaign.tagline}`, text: `${line} ${campaign.hashtag}`, url }
      if (canShareImage) data.files = [imageFile]
      await navigator.share(data)
    } catch (err) {
      if (err?.name === 'AbortError') return
      // Some apps reject files; retry with just the text and link.
      try {
        await navigator.share({ title: campaign.name, text: `${line} ${campaign.hashtag}`, url })
      } catch {
        /* user cancelled */
      }
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(full)
      setStatus('Copied your score and link. Paste it anywhere.')
    } catch {
      setStatus('Couldn’t copy automatically. Select the text below instead.')
    }
  }

  const enc = encodeURIComponent
  const links = [
    { label: 'WhatsApp', href: `https://wa.me/?text=${enc(full)}` },
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
    { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
    { label: 'X', href: `https://x.com/intent/post?text=${enc(`${line} ${campaign.hashtag}`)}&url=${enc(url)}` },
  ]

  const chip =
    'inline-flex items-center justify-center rounded-full px-4 py-2.5 font-bold ring-1 ring-line bg-surface hover:ring-2 hover:ring-signal'

  return (
    <div>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={`Your result card: ${result.badge}, ${result.score} out of ${result.max} points on ${result.game}.`}
          className="mb-5 w-full max-w-[240px] rounded-card ring-1 ring-line"
        />
      )}

      {canNativeShare && (
        <button type="button" onClick={nativeShare} className="mb-4 rounded-full bg-signal px-6 py-3 text-lg font-bold text-white hover:bg-deep">
          Share your result
        </button>
      )}

      <ul className="flex flex-wrap gap-2" aria-label="Share to">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} target="_blank" rel="noopener noreferrer" className={chip}>
              {l.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        ))}
        <li>
          <button type="button" onClick={copy} className={chip}>
            Copy link
          </button>
        </li>
        {imageUrl && (
          <li>
            <a href={imageUrl} download="click-smart-result.png" className={chip}>
              Save image
            </a>
          </li>
        )}
      </ul>

      <p className="mt-3 text-sm text-ink-soft">
        For Instagram, save the image and post it to your story or feed with {campaign.hashtag}.
      </p>
      <p role="status" className="mt-2 min-h-6 text-ink-soft">
        {status}
      </p>
      {status.startsWith('Couldn') && (
        <textarea readOnly value={full} className="mt-1 w-full rounded-card border border-line p-3" rows={3} />
      )}
    </div>
  )
}
