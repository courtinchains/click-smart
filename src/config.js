// ─────────────────────────────────────────────────────────────
// CLICK SMART campaign settings — edit these, nothing else needed.
// ─────────────────────────────────────────────────────────────

export const campaign = {
  name: 'CLICK SMART',
  tagline: 'Think Before You Click',
  hashtag: '#ClickSmartChallenge',
  fundraiser: 'Courtney Damon',

  // Organisation being supported. Only show the name once SOSA has approved
  // its use (see the launch checklist in README.md).
  organisation: 'SOSA',
  organisationApproved: true,

  // Paste your individual RallyUp page URL here once it exists
  // (created via SOSA's template → "Participate Here").
  // While this is empty, the Donate button shows "Donation link coming soon".
  rallyUpUrl: '',

  goalUSD: 300,

  // CONFIRMED donations only, taken from your RallyUp report/export.
  // A click on Donate is NOT a donation — never estimate this number.
  confirmedRaisedUSD: 0,
  confirmedDonations: 0,
  lastUpdated: '', // e.g. '2026-11-20'

  // Public site address, used in share messages. Set after deploying.
  siteUrl: '',

  // Support / reporting resources approved by SOSA. Leave empty until SOSA
  // supplies them; the footer then shows a generic "talk to someone you trust".
  supportLinks: [
    // { label: 'SOSA – get help', url: 'https://...' },
  ],
}

// True when the site may display the organisation's name.
export const showOrg = campaign.organisationApproved
