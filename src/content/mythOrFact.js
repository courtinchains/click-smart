// Myth or Fact — statements.
//
// DRAFT CONTENT: review with SOSA before launch.
// Each round deals ROUND_SIZE statements at random. Add as many as you like.
// Statement: { id, text, answer: 'myth' | 'fact', why }

export const statements = [
  {
    id: 'delete',
    text: 'Once you delete a photo or message you sent, it’s gone for good.',
    answer: 'myth',
    why: 'The other person may already have saved it, screenshotted it or backed it up. Think before you send, not after.',
  },
  {
    id: 'disappearing',
    text: 'Disappearing messages can still be saved by the person you send them to.',
    answer: 'fact',
    why: 'A screenshot or a photo taken with another phone keeps a copy, whatever the app promises.',
  },
  {
    id: 'followers',
    text: 'An account with thousands of followers must be a real person.',
    answer: 'myth',
    why: 'Followers can be bought and fake accounts can look very convincing. How someone behaves matters more than their numbers.',
  },
  {
    id: 'photo-location',
    text: 'Photos can carry hidden information about where they were taken.',
    answer: 'fact',
    why: 'Many phones save location in the photo file. Some apps remove it when you upload, but not all do. Check your camera’s location setting.',
  },
  {
    id: 'your-fault',
    text: 'If someone tricks you online, it’s your fault for falling for it.',
    answer: 'myth',
    why: 'The person who lies or pressures you is responsible, not you. Telling someone you trust is the right next step, and you won’t be in trouble for it.',
  },
  {
    id: 'threats',
    text: 'If someone threatens to share a private photo of you, doing what they ask will make it stop.',
    answer: 'myth',
    why: 'Giving in usually leads to more demands. Stop replying, don’t pay or send anything, keep screenshots, and tell a trusted adult. It can be reported.',
  },
  {
    id: 'same-password',
    text: 'Using one strong password for all your accounts is fine.',
    answer: 'myth',
    why: 'If one site leaks it, every account is open. Use a different password for each, and a password manager to remember them.',
  },
  {
    id: 'two-step',
    text: 'Two-step verification makes your account much harder to break into.',
    answer: 'fact',
    why: 'Even with your password, someone would also need the code from your phone or app. Turn it on for email and social media first.',
  },
  {
    id: 'friend-link',
    text: 'A link is safe if a friend sent it.',
    answer: 'myth',
    why: 'Friends’ accounts get hacked and used to spread scam links. If a message seems odd for them, check with them another way first.',
  },
  {
    id: 'report-anon',
    text: 'On most platforms, the person you report isn’t told who reported them.',
    answer: 'fact',
    why: 'Reporting is designed to be safe to use. Block, report and tell someone you trust if something feels wrong.',
  },
  {
    id: 'forever',
    text: 'Something you post today could be found by people years from now.',
    answer: 'fact',
    why: 'Posts get shared, saved and archived. A good test: would you be OK with a teacher or future employer seeing it?',
  },
  {
    id: 'profile-photo',
    text: 'If someone’s profile photo shows a teenager, they’re definitely a teenager.',
    answer: 'myth',
    why: 'Photos can be copied from someone else or made up entirely. You can’t confirm who someone is from their pictures.',
  },
  {
    id: 'password-email',
    text: 'Real companies sometimes email you to ask for your password.',
    answer: 'myth',
    why: 'Legitimate companies never ask for your password. Messages that do are phishing. Go to the official app or website yourself instead.',
  },
  {
    id: 'tell-adult',
    text: 'Telling a trusted adult about something online can help, even if you broke a rule to get there.',
    answer: 'fact',
    why: 'Getting you safe matters far more than the rule. Hiding a problem usually makes it harder to fix.',
  },
  {
    id: 'quizzes',
    text: 'Fun quizzes asking for your first pet or your mum’s maiden name are harmless.',
    answer: 'myth',
    why: 'Those are common security questions. Answering in public can help someone reset your passwords.',
  },
  {
    id: 'private-account',
    text: 'Setting your account to private means only people you approve can see your posts.',
    answer: 'fact',
    why: 'It’s a good protection, but approved followers can still screenshot and share. Only accept people you know.',
  },
  {
    id: 'strangers-only',
    text: 'Only strangers can make you feel unsafe online.',
    answer: 'myth',
    why: 'Sometimes it’s someone you know. If anyone pressures you, asks for secrets or makes you uncomfortable, it’s OK to say no and tell someone.',
  },
  {
    id: 'public-wifi',
    text: 'Free public Wi-Fi is just as safe as your home network for logging in to accounts.',
    answer: 'myth',
    why: 'Open networks can be watched or faked. Avoid banking and important logins on them, or use your mobile data instead.',
  },
]

export const ROUND_SIZE = 8
export const POINTS_CORRECT = 10
