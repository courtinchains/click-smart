// Deals items like a shuffled deck: everything is seen once before anything
// repeats, and each reshuffle mixes up the combinations. Kept in memory for
// this visit only, never stored.

const decks = new Map() // pool name → ids still to be dealt

function shuffle(list) {
  const a = [...list]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function pickFresh(pool, items, count) {
  const n = Math.min(count, items.length)
  let deck = (decks.get(pool) ?? []).filter((id) => items.some((x) => x.id === id))
  const picked = deck.slice(0, n)
  deck = deck.slice(n)

  if (picked.length < n) {
    // Reshuffle everything not already in this hand and top up.
    const rest = shuffle(items.map((x) => x.id).filter((id) => !picked.includes(id)))
    picked.push(...rest.slice(0, n - picked.length))
    deck = rest.filter((id) => !picked.includes(id))
  }

  decks.set(pool, deck)
  return shuffle(picked).map((id) => items.find((x) => x.id === id))
}
