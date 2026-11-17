// Digital Safety Escape Room — rooms and puzzles.
//
// DRAFT CONTENT: review with SOSA before launch.
// Rooms are played in order. Each room has several puzzle variants; every game
// deals one per room (shuffled-deck style, so variants don't repeat until all
// have been seen). Each solved room reveals one digit of a random exit code.
//
// type 'choice':   pick the one correct option; wrong picks explain why.
// type 'settings': switch every setting to its safe position, then try the door.
//                  `safe` is the position (on = true / off = false) that's safe.

export const rooms = [
  {
    id: 'vault',
    name: 'The Password Vault',
    type: 'choice',
    variants: [
      {
        id: 'strongest-1',
        intro: 'A heavy door with a keypad. A note on it reads: “Only the strongest password opens me.”',
        prompt: 'Which password is strongest?',
        options: [
          { text: 'password123', correct: false, why: 'One of the most common passwords in the world. It would be guessed in seconds.' },
          { text: 'Biscuit2011', correct: false, why: 'A pet’s name and a birth year are easy to find on social media.' },
          { text: 'Qwerty!', correct: false, why: 'Keyboard patterns are among the first things attackers try, and it’s short.' },
          { text: 'purple-kettle-river-82', correct: true, why: 'Several random words make a long passphrase that’s easy to remember and hard to crack.' },
        ],
      },
      {
        id: 'strongest-2',
        intro: 'The vault’s screen flashes: “Choose wisely. Weak passwords set off the alarm.”',
        prompt: 'Which password is strongest?',
        options: [
          { text: 'Sipho2009!', correct: false, why: 'A name plus a birth year is guessable, even with an exclamation mark on the end.' },
          { text: '123456789', correct: false, why: 'A number sequence is one of the first things attackers try.' },
          { text: 'football', correct: false, why: 'A single common word is cracked almost instantly.' },
          { text: 'lamp-orbit-honey-tiger', correct: true, why: 'Four unrelated words make a long passphrase. Length beats tricky symbols.' },
        ],
      },
      {
        id: 'storage',
        intro: 'Inside the vault is a desk covered in passwords. A sign says: “Store them safely to open the next door.”',
        prompt: 'What’s the safest way to keep track of your passwords?',
        options: [
          { text: 'A sticky note on your screen', correct: false, why: 'Anyone who walks past, or sees a photo of your desk, can read it.' },
          { text: 'One password for everything, so there’s nothing to remember', correct: false, why: 'If one site leaks it, every account is open.' },
          { text: 'A note on your phone called “passwords”', correct: false, why: 'That’s the first place someone would look if they got into your phone.' },
          { text: 'A password manager app', correct: true, why: 'It creates and remembers strong, different passwords, locked behind one main password.' },
        ],
      },
      {
        id: 'extra-lock',
        intro: 'The vault has an empty slot labelled “extra lock”. Pick the right one to fit.',
        prompt: 'Which setting adds the most protection to your account?',
        options: [
          { text: 'Two-step verification', correct: true, why: 'Even with your password, someone would also need the code from your phone.' },
          { text: '“Remember me” on a shared computer', correct: false, why: 'The next person on that computer gets straight into your account.' },
          { text: 'A password hint: “my dog’s name”', correct: false, why: 'Hints like this give away the answer to anyone who knows you, or reads your posts.' },
          { text: 'Showing your password as you type', correct: false, why: 'Handy in private, but it doesn’t protect your account at all.' },
        ],
      },
    ],
  },
  {
    id: 'inbox',
    name: 'The Inbox',
    type: 'choice',
    variants: [
      {
        id: 'chatapp-link',
        intro: 'A screen shows four links, all claiming to be the ChatApp login page. Only one is real.',
        prompt: 'Which link really goes to chatapp.com?',
        hint: 'Look at the part just before the first single “/”. That’s the real website.',
        mono: true,
        options: [
          { text: 'chatapp.com.account-verify.net/login', correct: false, why: 'The real website here is account-verify.net. “chatapp.com” at the start is a disguise.' },
          { text: 'chatapp-support.co/login', correct: false, why: 'An extra word and a different ending (.co) make this a different website entirely.' },
          { text: 'chatäpp.com/login', correct: false, why: 'Look closely: “ä” isn’t “a”. Lookalike letters are a common trick.' },
          { text: 'chatapp.com/settings/security', correct: true, why: 'The website is exactly chatapp.com. Everything after the slash is just a page on it.' },
        ],
      },
      {
        id: 'picshare-link',
        intro: 'A message says your PicShare account will be deleted unless you reset your password. Four reset links sit on the screen.',
        prompt: 'Which link really goes to picshare.net?',
        hint: 'Find the website name just before the first single “/”.',
        mono: true,
        options: [
          { text: 'picshare.net.reset-help.com/password', correct: false, why: 'The real website here is reset-help.com. The “picshare.net” part is just decoration.' },
          { text: 'pic-share.net/password', correct: false, why: 'One extra dash makes it a completely different website.' },
          { text: 'picshare.net-secure.info/password', correct: false, why: 'This website is “picshare.net-secure.info”, not picshare.net.' },
          { text: 'picshare.net/account/password', correct: true, why: 'The website is exactly picshare.net. The rest is a page on that site.' },
        ],
      },
      {
        id: 'sender',
        intro: 'Four emails all say they’re from GameVault support and ask you to confirm your account.',
        prompt: 'Which email address is really from gamevault.com?',
        hint: 'Check everything after the “@” very carefully.',
        mono: true,
        options: [
          { text: 'gamevault.support@freemail.com', correct: false, why: 'Real companies email from their own domain, not a free email service.' },
          { text: 'support@gamevau1t.com', correct: false, why: 'Look closely: that’s the number 1, not the letter l.' },
          { text: 'help@gamevault-rewards.net', correct: false, why: 'gamevault-rewards.net is a different website from gamevault.com.' },
          { text: 'support@gamevault.com', correct: true, why: 'The domain after the @ is exactly gamevault.com. Even then, use the app instead of email links.' },
        ],
      },
      {
        id: 'sms-scam',
        intro: 'A text says it’s from your phone network: “Your account is suspended. Confirm your PIN here: netw0rk-help.co”.',
        prompt: 'Which detail proves this text is a scam?',
        options: [
          { text: 'It mentions the name of your network', correct: false, why: 'Scammers copy real company names, so a name proves nothing either way.' },
          { text: 'It was sent in the afternoon', correct: false, why: 'The time a message arrives tells you nothing about whether it’s real.' },
          { text: 'It asks you to confirm your PIN through a link', correct: true, why: 'Real companies never ask for your PIN or password by text or link.' },
          { text: 'It’s short', correct: false, why: 'Real texts are short too. Look at what it asks you to do.' },
        ],
      },
    ],
  },
  {
    id: 'settings',
    name: 'The Settings Panel',
    type: 'settings',
    variants: [
      {
        id: 'social',
        intro: 'The door is wired to a social media privacy panel. It only opens when every setting is safe.',
        prompt: 'Switch each setting to the safer option, then try the door.',
        settings: [
          { id: 'location', label: 'Share my location on posts', safe: false, why: 'Location on posts can show where you live, study or spend time.' },
          { id: 'private', label: 'Private account', safe: true, why: 'Only people you approve can see your posts.' },
          { id: 'dms', label: 'Anyone can message me', safe: false, why: 'Limiting messages to people you follow cuts out most strangers and spam.' },
          { id: 'tags', label: 'Review tags before they appear', safe: true, why: 'You decide which photos of you show up on your profile.' },
        ],
      },
      {
        id: 'app-permissions',
        intro: 'A phone on the wall shows app permissions. The door opens when each app only has what it needs.',
        prompt: 'Switch each permission to the safer option, then try the door.',
        settings: [
          { id: 'torch-contacts', label: 'Torch app can read your contacts', safe: false, why: 'A torch doesn’t need your contacts. Apps asking for more than they need are a warning sign.' },
          { id: 'game-location', label: 'Puzzle game can see your exact location', safe: false, why: 'A puzzle game has no reason to know where you are.' },
          { id: 'auto-updates', label: 'Install app updates automatically', safe: true, why: 'Updates fix security holes. Keeping them on keeps you protected.' },
          { id: 'lock', label: 'Screen lock with a PIN or fingerprint', safe: true, why: 'If your phone is lost, a screen lock keeps your accounts and photos private.' },
        ],
      },
      {
        id: 'gaming',
        intro: 'A games console blocks the doorway. Fix its online settings to get past.',
        prompt: 'Switch each setting to the safer option, then try the door.',
        settings: [
          { id: 'voice', label: 'Voice chat with anyone', safe: false, why: 'Limiting voice chat to friends keeps strangers out of your headset.' },
          { id: 'real-name', label: 'Show my real name on my profile', safe: false, why: 'A gamer tag is enough. Your real name makes you easier to find offline.' },
          { id: 'friend-requests', label: 'Only friends of friends can send requests', safe: true, why: 'It cuts out most random requests from strangers.' },
          { id: 'two-step', label: 'Two-step verification', safe: true, why: 'Stops someone taking over your account and your in-game items.' },
        ],
      },
      {
        id: 'messaging',
        intro: 'The lock is a messaging app’s privacy screen. Make it safe to open the door.',
        prompt: 'Switch each setting to the safer option, then try the door.',
        settings: [
          { id: 'groups', label: 'Anyone can add me to groups', safe: false, why: 'Strangers can add you to scam or spam groups. Limit it to your contacts.' },
          { id: 'number', label: 'Show my phone number to everyone', safe: false, why: 'Your number is personal. Share it only with people you know.' },
          { id: 'app-lock', label: 'Lock this app with my fingerprint or PIN', safe: true, why: 'Keeps your chats private if someone else picks up your phone.' },
          { id: 'unknown', label: 'Silence calls from unknown numbers', safe: true, why: 'Cuts down scam calls. People you know can still reach you.' },
        ],
      },
    ],
  },
  {
    id: 'message',
    name: 'The Last Message',
    type: 'choice',
    variants: [
      {
        id: 'code',
        intro: 'One door left. A phone buzzes with a message from your friend Sam’s account: “hey I got locked out, I sent a code to your phone, can you send it to me? urgent!!”',
        prompt: 'What do you do?',
        options: [
          { text: 'Send the code. Sam needs help.', correct: false, why: 'That code is for your account. Sam’s account has probably been hacked, and this is how yours gets taken next.' },
          { text: 'Ask “is this really you?” in the chat.', correct: false, why: 'If the account is hacked, the hacker is the one who answers.' },
          { text: 'Send half the code to be safe.', correct: false, why: 'Any part of the code helps. Codes are never meant to be shared.' },
          { text: 'Call or text Sam another way to check.', correct: true, why: 'Checking outside the app shows whether it’s really Sam. And never share login codes.' },
        ],
      },
      {
        id: 'new-number',
        intro: 'One door left. A message from an unknown number: “Hi it’s Mom, my phone broke so this is my new number. Can you send me R300 airtime? It’s urgent, don’t call, I can’t talk.”',
        prompt: 'What do you do?',
        options: [
          { text: 'Send the airtime. She said it’s urgent.', correct: false, why: '“New number, urgent, don’t call” is one of the most common scams there is.' },
          { text: 'Reply asking what her middle name is.', correct: false, why: 'Scammers can often find details like that online. Check outside this chat.' },
          { text: 'Call Mom on her old number, or ask another family member.', correct: true, why: 'Checking another way takes a minute and stops the scam cold.' },
          { text: 'Send half now and half later.', correct: false, why: 'Any amount sent to a scammer is gone.' },
        ],
      },
      {
        id: 'exam-link',
        intro: 'One door left. A message from your teacher’s account says: “Exam answers leaked 😱 click quick before they delete it!” with a link.',
        prompt: 'What do you do?',
        options: [
          { text: 'Click it. It’s from the teacher’s account.', correct: false, why: 'A teacher wouldn’t send this. Their account has almost certainly been hacked.' },
          { text: 'Forward it to the class group.', correct: false, why: 'That spreads the scam link to everyone you know.' },
          { text: 'Don’t click, and tell the teacher another way that their account was hacked.', correct: true, why: 'You stay safe, and they can lock their account before more people fall for it.' },
          { text: 'Open it on a friend’s phone instead.', correct: false, why: 'Then your friend’s phone and accounts are at risk instead.' },
        ],
      },
      {
        id: 'trust-swap',
        intro: 'One door left. A friend you met online messages: “let’s swap passwords, it proves we really trust each other 💕”',
        prompt: 'What do you do?',
        options: [
          { text: 'Swap. It’s only fair if you both do it.', correct: false, why: 'Swapping means both accounts are exposed. Trust doesn’t need passwords.' },
          { text: 'Say no. Passwords stay private, whoever is asking.', correct: true, why: 'Real friends don’t need your password to trust you. Pressure to prove trust is a red flag.' },
          { text: 'Give them an old password instead.', correct: false, why: 'Old passwords are often reused or close to your current one.' },
          { text: 'Send it, then change it straight after.', correct: false, why: 'Someone can do a lot in a few minutes, like changing your recovery email.' },
        ],
      },
    ],
  },
]

export const START_POINTS = 100
export const PENALTY = 10
export const MIN_POINTS = 30
