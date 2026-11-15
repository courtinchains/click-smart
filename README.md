# CLICK SMART – Think Before You Click

A free, interactive online-safety website with mini-games and an optional
donation link to a RallyUp fundraiser. Built with React, Vite and Tailwind CSS,
ready to deploy on Vercel.

- **No backend, no accounts, no cookies, no analytics.** Game answers live in
  the browser and disappear when the visitor leaves.
- **No payments on this site.** The Donate button opens your RallyUp page in a
  new tab.

## Run it locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build
```

## The one file you edit for the campaign: `src/config.js`

| Setting | What to put there |
| --- | --- |
| `rallyUpUrl` | Your individual RallyUp page URL. Until it's set, the Donate button reads "Donation link coming soon". |
| `organisationApproved` | Set to `true` only after SOSA approves use of its name. This shows "for SOSA" in the header and text, and removes the "Preview" banner. |
| `confirmedRaisedUSD`, `confirmedDonations`, `lastUpdated` | Copy these from your RallyUp report. Only use confirmed donations. A click on Donate is not a donation. |
| `siteUrl` | Your live address (for example `https://clicksmart.vercel.app`), used in share messages. |
| `supportLinks` | Help and reporting links that SOSA approves. They appear in the footer. |

To update the progress bar, change the numbers, commit and push. Vercel then
redeploys automatically.

## Editing game content

The game content is kept apart from the code, so SOSA can review it as plain text:

- `src/content/redFlags.js`: eight fictional chats. Each round deals four of
  them at random (`ROUND_SIZE`). Any message with a `flag: { label, why }`
  counts as a red flag.
- `src/content/privacyProfile.js`: eight fictional profiles. Each round shows
  one at random. Each item is marked `risky: true/false` and has a `why`
  explanation.

- `src/content/mythOrFact.js`: eighteen statements, each marked
  `answer: 'myth' | 'fact'` with a `why`. Each round deals eight (`ROUND_SIZE`).

Rounds are dealt like a shuffled deck (`src/lib/pick.js`): players see every
chat or profile once before any of them repeats.

Scoring: +10 for each correct find and −5 for each wrong pick, never below 0.
Scenarios, items and explanations can be added or removed freely; the totals
recalculate on their own.

**All content is a draft until SOSA has reviewed it.** Keep scenarios fictional
and non-graphic. Explanations should focus on what to do (pause, tell someone
you trust, block, report) rather than on how manipulation works.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. On vercel.com choose **Add New → Project** and import the repository.
3. Vercel detects Vite automatically: build command `npm run build`, output `dist`.
4. Deploy, then copy the URL into `siteUrl` in `src/config.js` and push again.

## Project structure

```
src/
  config.js                  campaign settings (RallyUp link, goal, totals)
  App.jsx                    layout, header and a small hash router (#/red-flags, #/privacy)
  content/                   game content, kept apart for SOSA review
  games/
    SpotTheRedFlags.jsx
    PrivacyDetective.jsx
    MythOrFact.jsx
  components/
    Home.jsx                 landing page
    ResultCard.jsx           score, badge, share and donate prompt
    ShareButton.jsx          Web Share API with copy-to-clipboard fallback
    DonateButton.jsx         links to RallyUp, disabled until a URL is set
    ProgressBar.jsx          confirmed total against the goal
    GameHeader.jsx, Footer.jsx
```

Each game has its own address: `/#/red-flags`, `/#/privacy` and `/#/myth-or-fact`, so you can link
straight to one in a social post.

## Launch checklist

- [ ] SOSA approves the concept and the use of its name. Then set `organisationApproved: true`.
- [ ] SOSA reviews and approves every scenario and explanation in `src/content/`.
- [ ] SOSA supplies support and reporting links. Add them to `supportLinks`.
- [ ] Create the individual RallyUp page ("Participate Here") and paste the URL into `rallyUpUrl`.
- [ ] Confirm attribution, receipt wording and reporting with SOSA.
- [ ] Read SOSA's full WhatsApp and digital-safety policies before promoting the site.
- [ ] Test on a phone and a desktop, and check that the Donate link opens the right page.
- [ ] Set `siteUrl` after the first deploy.

## Adding the next game

Create `src/games/WhatWouldYouDo.jsx` and put its content in `src/content/`.
Add the route name to `ROUTES` in `App.jsx` (plus a line choosing the page),
and a `<GameLink>` card in `Home.jsx`. Reuse `GameHeader`, `ResultCard` and
`pickFresh` from `src/lib/pick.js` for a matching look and random rounds.
