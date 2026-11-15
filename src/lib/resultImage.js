// Draws a shareable result card (1080×1350, Instagram portrait) in the browser.
// Nothing is uploaded: the image is created on the visitor's device.

const C = {
  deep: '#123c55',
  deeper: '#0c2a3d',
  onDeep: '#c3d2e0',
  cream: '#fbf8f4',
  pop: '#74e46e',
  ink: '#17252a',
  jade: '#2a7099',
  sand: '#dce4f3',
  alert: '#8c2f4c',
  alertBg: '#f7d9e0',
}
const SERIF = '"Source Serif 4 Variable", "Source Serif 4", Georgia, serif'
const SANS = '"Libre Franklin Variable", "Libre Franklin", Helvetica, Arial, sans-serif'
const MONO = '"IBM Plex Mono", ui-monospace, Menlo, monospace'

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, r)
  ctx.fill()
}

function wrap(ctx, text, maxWidth) {
  const words = text.split(' ')
  const lines = []
  let line = ''
  for (const w of words) {
    const test = line ? `${line} ${w}` : w
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line)
      line = w
    } else line = test
  }
  if (line) lines.push(line)
  return lines
}

export async function makeResultImage({ game, badge, score, max, found, total, foundLabel = 'found', siteUrl, organisation }) {
  if (document.fonts?.ready) await document.fonts.ready

  const W = 1080
  const H = 1350
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')

  // Background and top strip
  ctx.fillStyle = C.deep
  ctx.fillRect(0, 0, W, H)
  ctx.fillStyle = C.deeper
  ctx.fillRect(0, 0, W, 76)
  ctx.fillStyle = C.onDeep
  ctx.font = `400 26px ${MONO}`
  ctx.textAlign = 'center'
  ctx.fillText('#CLICKSMARTCHALLENGE', W / 2, 48)
  ctx.textAlign = 'left'

  // Logo
  const lx = 90
  const ly = 150
  ctx.fillStyle = C.cream
  roundRect(ctx, lx, ly, 72, 72, 18)
  ctx.fillStyle = C.deep
  ctx.beginPath()
  ctx.moveTo(lx + 22, ly + 17)
  ctx.lineTo(lx + 51, ly + 38)
  ctx.lineTo(lx + 39, ly + 40)
  ctx.lineTo(lx + 46, ly + 55)
  ctx.lineTo(lx + 40, ly + 58)
  ctx.lineTo(lx + 33, ly + 43)
  ctx.lineTo(lx + 23, ly + 52)
  ctx.closePath()
  ctx.fill()
  ctx.fillStyle = C.pop
  ctx.beginPath()
  ctx.arc(lx + 54, ly + 18, 7, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = C.cream
  ctx.font = `600 46px ${SERIF}`
  ctx.fillText('click smart', lx + 96, ly + 52)

  // Game and badge
  ctx.fillStyle = C.onDeep
  ctx.font = `400 40px ${SANS}`
  ctx.fillText(game, 90, 360)

  ctx.fillStyle = '#ffffff'
  ctx.font = `400 128px ${SERIF}`
  const badgeLines = wrap(ctx, badge, W - 180)
  badgeLines.forEach((l, i) => ctx.fillText(l, 84, 490 + i * 132))
  let y = 490 + (badgeLines.length - 1) * 132

  // Score
  y += 210
  ctx.fillStyle = C.pop
  ctx.font = `400 150px ${SERIF}`
  const scoreText = String(score)
  ctx.fillText(scoreText, 84, y)
  const sw = ctx.measureText(scoreText).width
  ctx.fillStyle = C.onDeep
  ctx.font = `400 48px ${SANS}`
  ctx.fillText(`/ ${max} points`, 84 + sw + 20, y)
  ctx.font = `400 38px ${SANS}`
  ctx.fillText(`${found} of ${total} ${foundLabel}`, 90, y + 70)

  // Little chat motif with a flagged message
  const cx = 90
  let cy = H - 200 - 210
  ctx.fillStyle = C.sand
  roundRect(ctx, cx, cy, 380, 54, 27)
  ctx.fillStyle = C.jade
  roundRect(ctx, cx + 470, cy, 280, 54, 27)
  cy += 74
  ctx.fillStyle = C.alertBg
  roundRect(ctx, cx, cy, 520, 64, 32)
  ctx.strokeStyle = C.alert
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.roundRect(cx, cy, 520, 64, 32)
  ctx.stroke()
  ctx.fillStyle = C.alert
  ctx.fillRect(cx + 30, cy + 16, 4, 34)
  ctx.beginPath()
  ctx.moveTo(cx + 34, cy + 17)
  ctx.lineTo(cx + 58, cy + 17)
  ctx.lineTo(cx + 51, cy + 27)
  ctx.lineTo(cx + 58, cy + 37)
  ctx.lineTo(cx + 34, cy + 37)
  ctx.fill()
  ctx.font = `600 30px ${SANS}`
  ctx.fillText('Red flag spotted', cx + 74, cy + 43)

  // Call to action
  ctx.fillStyle = C.cream
  ctx.fillRect(0, H - 200, W, 200)
  ctx.fillStyle = C.ink
  ctx.font = `400 54px ${SERIF}`
  ctx.fillText('Think you can beat it?', 90, H - 118)
  ctx.fillStyle = C.jade
  ctx.font = `600 34px ${SANS}`
  const host = (siteUrl || '').replace(/^https?:\/\//, '').replace(/\/$/, '')
  ctx.fillText(host, 90, H - 62)
  if (organisation) {
    ctx.fillStyle = '#4b5c5b'
    ctx.font = `400 30px ${SANS}`
    ctx.textAlign = 'right'
    ctx.fillText(`Fundraising for ${organisation}`, W - 90, H - 62)
    ctx.textAlign = 'left'
  }

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
  return new File([blob], 'click-smart-result.png', { type: 'image/png' })
}
