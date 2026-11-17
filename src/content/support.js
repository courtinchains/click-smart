// Help and emergency contacts shown in the footer ("Find support").
// Check these every few months: numbers do change. Last checked: November 2026.
//
// Each entry: { label, number?, tel?, url?, note }
// `tel` is what the phone dials (digits only); `number` is how it's displayed.

export const supportRegion = 'South Africa'

export const supportContacts = [
  {
    label: 'Any emergency from a cellphone',
    number: '112',
    tel: '112',
    note: 'Free from any cellphone, even without airtime.',
  },
  {
    label: 'Police emergency (SAPS)',
    number: '10111',
    tel: '10111',
    note: 'Crime in progress or someone in danger.',
  },
  {
    label: 'Ambulance and fire',
    number: '10177',
    tel: '10177',
    note: 'Medical emergencies and fires.',
  },
  {
    label: 'Childline South Africa',
    number: '116',
    tel: '116',
    note: 'Free, 24 hours a day. For children, and for anyone worried about a child.',
  },
  {
    label: 'Report online child sexual abuse material',
    url: 'https://www.fpb.org.za/child-protection/',
    linkText: 'Film and Publication Board hotline',
    note: 'Don’t save, share or screenshot the material. Just report where you saw it.',
  },
]
