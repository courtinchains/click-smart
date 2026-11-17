// What Would You Do? — branching scenarios.
//
// DRAFT CONTENT: review with SOSA before launch. All situations are fictional.
// Each round plays ROUND_SIZE scenarios picked at random.
//
// Scenario: { id, title, setting, nodes }
// Node:     { text?, message?: { from, text }, choices: [Choice] }  — 'start' is first
// Choice:   { text, quality: 'best' | 'okay' | 'risky', feedback, next? }
//           next = the id of the following node; leave it out to end the scenario.

export const scenarios = [
  {
    id: 'group-photo',
    title: 'The group chat photo',
    setting: 'Your class group chat, 9pm',
    nodes: {
      start: {
        text: 'Someone posts an embarrassing photo of a classmate, Lebo, taken without her knowing. People are replying with laughing emojis.',
        choices: [
          { text: 'Send a laughing emoji too. Everyone else is.', quality: 'risky', feedback: 'Joining in makes the pile-on bigger, and Lebo will see who reacted.', next: 'spread' },
          { text: 'Say nothing and mute the chat.', quality: 'okay', feedback: 'Staying out of it is better than joining in, but the photo is still spreading.', next: 'spread' },
          { text: 'Reply “not cool, please delete it” and report the photo.', quality: 'best', feedback: 'Speaking up often stops a pile-on, and reporting gets the photo reviewed.', next: 'after' },
        ],
      },
      spread: {
        text: 'The next morning the photo has been shared to another group. Lebo didn’t come to school.',
        choices: [
          { text: 'Tell a teacher or another trusted adult what happened.', quality: 'best', feedback: 'Adults can help get it taken down and support Lebo. That isn’t snitching, it’s helping.' },
          { text: 'Message Lebo privately to check she’s OK.', quality: 'okay', feedback: 'Kind and worth doing. Telling an adult as well means someone can actually stop the photo spreading.' },
          { text: 'Leave it. It’ll blow over.', quality: 'risky', feedback: 'Photos can keep spreading for a long time. Someone needs to step in.' },
        ],
      },
      after: {
        message: { from: 'the person who posted it', text: 'relax, it’s just a joke 🙄' },
        choices: [
          { text: 'Reply that it isn’t funny for Lebo, and leave it there.', quality: 'best', feedback: 'Calm and clear. You don’t need to win an argument to do the right thing.' },
          { text: 'Delete your message to avoid drama.', quality: 'okay', feedback: 'Understandable, but your message helped. Make sure the report stays in.' },
          { text: 'Start roasting them in the group.', quality: 'risky', feedback: 'A public fight usually makes things worse for everyone, including Lebo.' },
        ],
      },
    },
  },
  {
    id: 'hacked',
    title: 'Your account is acting strange',
    setting: 'Your phone, after school',
    nodes: {
      start: {
        text: 'Friends say your account has been sending them a weird link. You also have an email: “Unusual sign-in detected. Click here to secure your account.”',
        choices: [
          { text: 'Click the link in the email.', quality: 'risky', feedback: 'Emails like this are often phishing. Open the app yourself instead of following links.', next: 'phished' },
          { text: 'Open the app directly and change your password.', quality: 'best', feedback: 'Going straight to the official app is the safe way to fix it.', next: 'secured' },
          { text: 'Ignore it. It’ll sort itself out.', quality: 'risky', feedback: 'Whoever has your account can keep messaging your friends.', next: 'phished' },
        ],
      },
      phished: {
        text: 'Now you can’t sign in at all. Your password has been changed.',
        choices: [
          { text: 'Use the app’s official account recovery.', quality: 'best', feedback: 'Official recovery is the right route. Add two-step verification once you’re back in.' },
          { text: 'Make a new account and forget the old one.', quality: 'okay', feedback: 'The old account can still be used to scam friends. Try to recover it, or report it.' },
          { text: 'Pay someone online who says they can get it back.', quality: 'risky', feedback: '“Recovery” services like this are usually scams. Use the platform’s official help.' },
        ],
      },
      secured: {
        text: 'You’re back in control of your account. What next?',
        choices: [
          { text: 'Turn on two-step verification and warn friends not to click the link.', quality: 'best', feedback: 'That locks the door and stops the scam spreading.' },
          { text: 'Just carry on as normal.', quality: 'okay', feedback: 'You’re safer now, but two-step verification would stop this happening again.' },
          { text: 'Use your new password on all your other accounts too.', quality: 'risky', feedback: 'If it leaks again, every account is open. Use a different password for each.' },
        ],
      },
    },
  },
  {
    id: 'private-app',
    title: 'Let’s talk somewhere else',
    setting: 'A gaming friend you’ve chatted with for a few weeks',
    nodes: {
      start: {
        message: { from: 'nova_22', text: 'you’re so easy to talk to. let’s move to another app, no one can see our chats there 🤫' },
        choices: [
          { text: 'Sure, sounds fun.', quality: 'risky', feedback: 'Being moved somewhere private, away from moderators, is a warning sign, especially with “no one can see”.', next: 'secret' },
          { text: 'I’d rather keep chatting here.', quality: 'best', feedback: 'You can always say no. Staying where there are safety tools is smart.', next: 'pushback' },
          { text: 'Not sure. Ask a friend what they think first.', quality: 'okay', feedback: 'Checking with someone is good. A trusted adult is even better for this one.', next: 'pushback' },
        ],
      },
      secret: {
        message: { from: 'nova_22', text: 'don’t tell your parents about me ok? they wouldn’t understand us' },
        choices: [
          { text: 'Agree to keep it secret.', quality: 'risky', feedback: 'Safe people don’t ask you to hide them from your family. That’s a big red flag.' },
          { text: 'Tell a trusted adult what they said.', quality: 'best', feedback: 'This is exactly the kind of secret to share. You won’t be in trouble.' },
          { text: 'Stop replying and block them.', quality: 'okay', feedback: 'Blocking helps. Telling a trusted adult too means someone can check others are safe.' },
        ],
      },
      pushback: {
        message: { from: 'nova_22', text: 'wow. i thought we were friends. fine, i’ll find someone who actually cares' },
        choices: [
          { text: 'Apologise and agree to switch apps.', quality: 'risky', feedback: 'Guilt-tripping is a pressure tactic. You did nothing wrong by saying no.' },
          { text: 'Block, report, and tell someone you trust.', quality: 'best', feedback: 'That protects you, and maybe other players too.' },
          { text: 'Ignore it and keep gaming.', quality: 'okay', feedback: 'Not engaging is fine. Reporting would help protect others as well.' },
        ],
      },
    },
  },
  {
    id: 'threat',
    title: 'A threat in your messages',
    setting: 'A message from an account you don’t know',
    nodes: {
      start: {
        message: { from: 'unknown account', text: 'I have an edited photo of you that looks really bad. Send me R500 or I post it to everyone you follow.' },
        choices: [
          { text: 'Pay so it goes away.', quality: 'risky', feedback: 'Paying usually leads to more demands. It rarely makes it stop.', next: 'more' },
          { text: 'Stop replying and take screenshots.', quality: 'best', feedback: 'Keeping evidence and not engaging is the right first step.', next: 'next-step' },
          { text: 'Beg them not to post it.', quality: 'okay', feedback: 'Panicking is natural, but replying shows them it’s working. Stop engaging.', next: 'next-step' },
        ],
      },
      more: {
        message: { from: 'unknown account', text: 'Thanks. Now send R1,000 more or I post it anyway.' },
        choices: [
          { text: 'Pay again.', quality: 'risky', feedback: 'It won’t stop. Stop paying and get help.' },
          { text: 'Tell a trusted adult everything, including that you paid.', quality: 'best', feedback: 'You’re not in trouble. This isn’t your fault, and an adult can help you report it.' },
          { text: 'Delete your account and hope it ends.', quality: 'okay', feedback: 'A break can help, but report it first and keep the evidence so it can be stopped.' },
        ],
      },
      'next-step': {
        text: 'You’ve stopped replying and have screenshots. What now?',
        choices: [
          { text: 'Tell a trusted adult and report the account.', quality: 'best', feedback: 'Reporting gets the account looked at, and an adult can help with next steps.' },
          { text: 'Block the account and move on.', quality: 'okay', feedback: 'Blocking helps, but report it too so the platform can act and others are protected.' },
          { text: 'Keep it to yourself so nobody finds out.', quality: 'risky', feedback: 'You don’t have to handle this alone. Threats like this are never your fault.' },
        ],
      },
    },
  },
  {
    id: 'free-coins',
    title: 'Free coins!',
    setting: 'An ad while you’re scrolling',
    nodes: {
      start: {
        text: 'An ad says: “FREE 10,000 game coins! Log in with your game account to claim. Offer ends in 5 minutes ⏰”',
        choices: [
          { text: 'Log in quickly before it ends.', quality: 'risky', feedback: 'The countdown is there to rush you. Fake login pages steal accounts.', next: 'stolen' },
          { text: 'Check the official game app for the offer.', quality: 'best', feedback: 'If an offer is real, it’ll be in the official app too.', next: 'checked' },
          { text: 'Share it with friends so they get coins too.', quality: 'risky', feedback: 'Sharing it spreads the scam to your friends.', next: 'stolen' },
        ],
      },
      stolen: {
        text: 'Your game account has been emptied and the password changed.',
        choices: [
          { text: 'Contact the game’s official support to recover it.', quality: 'best', feedback: 'Official support is the way back in. Then turn on two-step verification.' },
          { text: 'Warn friends about the fake site.', quality: 'okay', feedback: 'Good instinct. Contact official support to recover your account as well.' },
          { text: 'Message the scammer asking for it back.', quality: 'risky', feedback: 'They won’t return it and may try to get more from you.' },
        ],
      },
      checked: {
        text: 'The official app has no such offer. What now?',
        choices: [
          { text: 'Report the ad.', quality: 'best', feedback: 'Reporting helps get it taken down before others fall for it.' },
          { text: 'Just scroll past.', quality: 'okay', feedback: 'You stayed safe. Reporting it would protect others too.' },
          { text: 'Try the site with a spare account, just to see.', quality: 'risky', feedback: 'Fake sites can also try to install malware or collect other details. Leave it.' },
        ],
      },
    },
  },
  {
    id: 'location-tag',
    title: 'Tagged at home',
    setting: 'A friend’s story, Saturday afternoon',
    nodes: {
      start: {
        text: 'A friend posts a story from your house with a location sticker showing your street. Their account is public.',
        choices: [
          { text: 'Ask them to remove the location, and explain why.', quality: 'best', feedback: 'A quick, friendly ask usually works. Most people just don’t think about it.', next: 'fixed' },
          { text: 'Repost it. It’s a nice photo.', quality: 'risky', feedback: 'Reposting spreads your address to even more people.', next: 'spread' },
          { text: 'Say nothing. It’s only up for 24 hours.', quality: 'okay', feedback: 'Stories expire, but they can be screenshotted or saved in that time.', next: 'spread' },
        ],
      },
      fixed: {
        text: 'They take it down and say sorry. Anything else?',
        choices: [
          { text: 'Check your own location settings so your posts don’t do the same.', quality: 'best', feedback: 'Turning off location on posts protects you from your own accidents too.' },
          { text: 'Leave it there. It’s sorted.', quality: 'okay', feedback: 'Fine for now. A quick look at your own settings is worth it.' },
          { text: 'Post an angry story about them.', quality: 'risky', feedback: 'They fixed it. A public call-out makes things worse for no reason.' },
        ],
      },
      spread: {
        text: 'A stranger replies to the story: “oh nice, I live close to there 👀”.',
        choices: [
          { text: 'Ask your friend to remove it now, and tell a parent or carer.', quality: 'best', feedback: 'Getting it down quickly and letting an adult know is the safe move.' },
          { text: 'Reply asking who they are.', quality: 'risky', feedback: 'Engaging invites more contact. Don’t reply. Remove, block and tell someone.' },
          { text: 'Block the stranger.', quality: 'okay', feedback: 'Good, but the post still shows your street. Get it removed too.' },
        ],
      },
    },
  },
  {
    id: 'marketplace',
    title: 'A bargain online',
    setting: 'An online marketplace',
    nodes: {
      start: {
        message: { from: 'seller', text: 'Yes the phone is still available! Half price. Pay by bank transfer today and I’ll courier it. Don’t use the app checkout, it takes too long.' },
        choices: [
          { text: 'Insist on paying through the app’s checkout.', quality: 'best', feedback: 'Built-in checkout usually protects your money if the item never arrives.', next: 'refuse' },
          { text: 'Transfer the money. It’s a great deal.', quality: 'risky', feedback: 'Too-good prices plus paying outside the app is a classic scam.', next: 'gone' },
          { text: 'Ask for more photos first.', quality: 'okay', feedback: 'Sensible, but photos can be copied from anywhere. The payment method is the real issue.', next: 'refuse' },
        ],
      },
      refuse: {
        message: { from: 'seller', text: 'Other buyers are waiting. Transfer in the next 10 minutes or I sell it to someone else.' },
        choices: [
          { text: 'Walk away and report the listing.', quality: 'best', feedback: 'Pressure plus off-app payment means scam. Reporting protects other buyers.' },
          { text: 'Send a deposit to hold it.', quality: 'risky', feedback: 'A deposit is still money you won’t see again.' },
          { text: 'Just stop replying.', quality: 'okay', feedback: 'You’re safe. A report would help get the listing removed.' },
        ],
      },
      gone: {
        text: 'Two days later there’s no phone, and the seller has blocked you.',
        choices: [
          { text: 'Tell a trusted adult, contact your bank and report the seller.', quality: 'best', feedback: 'Acting quickly gives the best chance of getting money back and stopping them.' },
          { text: 'Keep quiet. It’s embarrassing.', quality: 'risky', feedback: 'Scammers fool adults every day. Telling someone is how it gets fixed.' },
          { text: 'Leave a warning review.', quality: 'okay', feedback: 'Helpful for others. Report it to the app and your bank too.' },
        ],
      },
    },
  },
  {
    id: 'anon-messages',
    title: 'Anonymous messages',
    setting: 'An anonymous Q&A link on your profile',
    nodes: {
      start: {
        text: 'You get several anonymous messages saying cruel things about how you look.',
        choices: [
          { text: 'Screenshot them, then block and report.', quality: 'best', feedback: 'Evidence plus reporting means something can be done about it.', next: 'support' },
          { text: 'Post the messages with an angry reply.', quality: 'risky', feedback: 'It often brings more attention and more messages. Don’t feed it.', next: 'worse' },
          { text: 'Delete the app and tell no one.', quality: 'okay', feedback: 'Stepping away can help, but you don’t have to carry this alone.', next: 'support' },
        ],
      },
      support: {
        text: 'It’s still bothering you a few days later.',
        choices: [
          { text: 'Talk to a friend, a family member or a teacher about how you feel.', quality: 'best', feedback: 'Saying it out loud to someone who cares makes it lighter. What they said isn’t true.' },
          { text: 'Keep checking to see if more arrived.', quality: 'risky', feedback: 'Checking keeps the hurt going. Give yourself a break from it.' },
          { text: 'Distract yourself and hope it fades.', quality: 'okay', feedback: 'Doing things you enjoy helps. Talking to someone helps even more.' },
        ],
      },
      worse: {
        text: 'Now even more people are commenting, and some are joining in.',
        choices: [
          { text: 'Delete the post, report the comments and tell a trusted adult.', quality: 'best', feedback: 'Taking the stage away and getting support is the strong move.' },
          { text: 'Reply to every comment.', quality: 'risky', feedback: 'Each reply keeps it going longer.' },
          { text: 'Turn off comments.', quality: 'okay', feedback: 'That helps stop the pile-on. Report it and talk to someone too.' },
        ],
      },
    },
  },
  {
    id: 'fake-video',
    title: 'The shocking video',
    setting: 'A video going around the school chats',
    nodes: {
      start: {
        text: 'A video shows a teacher saying something awful. A few people say it looks edited, maybe made with AI.',
        choices: [
          { text: 'Don’t share it until you know it’s real.', quality: 'best', feedback: 'Fake videos can be very convincing. Sharing spreads harm even if you add “not sure if real”.', next: 'check' },
          { text: 'Share it. Everyone else is.', quality: 'risky', feedback: 'If it’s fake, you’ve helped spread a lie about a real person.', next: 'fallout' },
          { text: 'Ask in the chat if anyone knows if it’s real.', quality: 'okay', feedback: 'Good to question it, but the chat is where rumours grow. Look for a reliable source.', next: 'check' },
        ],
      },
      check: {
        text: 'It turns out the video was made with AI. It’s still spreading.',
        choices: [
          { text: 'Report it on the platform and let a teacher know.', quality: 'best', feedback: 'That helps get it removed and protects the person targeted.' },
          { text: 'Post that it’s fake, but keep the video in your post.', quality: 'okay', feedback: 'The correction helps, but reposting the video still spreads it.' },
          { text: 'Make a joke version of your own.', quality: 'risky', feedback: 'Making fake content about real people can seriously hurt them and get you in real trouble.' },
        ],
      },
      fallout: {
        text: 'The school says the video was fake and was made to hurt the teacher.',
        choices: [
          { text: 'Delete your share and say it was fake.', quality: 'best', feedback: 'Owning it and correcting it is the right thing to do.' },
          { text: 'Leave it up. It’s already everywhere.', quality: 'risky', feedback: 'Every copy that stays up keeps hurting someone.' },
          { text: 'Delete it quietly.', quality: 'okay', feedback: 'Better than leaving it. A short correction helps undo the damage.' },
        ],
      },
    },
  },
  {
    id: 'password-share',
    title: 'Keep my streak going',
    setting: 'Your best friend, before a family trip',
    nodes: {
      start: {
        message: { from: 'your best friend', text: 'I’m away with no signal for a week 😭 can I give you my password so you keep my streaks going?' },
        choices: [
          { text: 'Say no, nicely. Streaks aren’t worth sharing passwords.', quality: 'best', feedback: 'Passwords stay private, even with close friends. Friendships change, accounts get misused.', next: 'pushback' },
          { text: 'Agree, and give them yours too so it’s fair.', quality: 'risky', feedback: 'Now two accounts are exposed. Swapping passwords is never a good trade.', next: 'later' },
          { text: 'Agree to log in just this once.', quality: 'okay', feedback: 'Kind, but they’ll need to change their password after. Better not to start.', next: 'later' },
        ],
      },
      pushback: {
        message: { from: 'your best friend', text: 'wow ok, I thought you trusted me' },
        choices: [
          { text: 'Explain it’s not about trust, it’s just a safety rule you keep.', quality: 'best', feedback: 'Calm and honest. A good friend will get it.' },
          { text: 'Give in so they’re not upset.', quality: 'risky', feedback: 'Saying yes to stop someone being upset is how pressure works. Your no was fine.' },
          { text: 'Change the subject.', quality: 'okay', feedback: 'Fine, though a quick explanation clears it up for good.' },
        ],
      },
      later: {
        text: 'A month later you’ve fallen out, and they still know your password.',
        choices: [
          { text: 'Change your password and turn on two-step verification.', quality: 'best', feedback: 'That locks them out for good, whatever happens between you.' },
          { text: 'Trust that they won’t use it.', quality: 'risky', feedback: 'You can’t control what someone does with access. Change it.' },
          { text: 'Ask them to promise not to log in.', quality: 'okay', feedback: 'A promise isn’t a lock. Change the password as well.' },
        ],
      },
    },
  },
  {
    id: 'challenge',
    title: 'The viral challenge',
    setting: 'A trend everyone’s posting',
    nodes: {
      start: {
        text: 'Friends dare you to film yourself doing a viral challenge. People online call it “risky but hilarious”, and some have ended up in hospital.',
        choices: [
          { text: 'Say no. It isn’t worth getting hurt for views.', quality: 'best', feedback: 'Some trends are genuinely dangerous. Saying no takes more courage than joining in.', next: 'pressure' },
          { text: 'Do it, but only for a few seconds.', quality: 'risky', feedback: 'Dangerous challenges can cause serious harm very quickly. There’s no safe version.', next: 'pressure' },
          { text: 'Watch other people’s videos first to decide.', quality: 'okay', feedback: 'Videos only show the ones that went fine, not the people who got hurt.', next: 'pressure' },
        ],
      },
      pressure: {
        message: { from: 'group chat', text: 'come onnn everyone else did it, don’t be boring' },
        choices: [
          { text: 'Stick with no, and tell an adult the challenge is going around.', quality: 'best', feedback: 'Adults can warn others before someone gets hurt. That’s looking out for your friends.' },
          { text: 'Do it to stop the teasing.', quality: 'risky', feedback: 'Teasing passes. An injury might not. You don’t owe anyone a video.' },
          { text: 'Leave the chat for a while.', quality: 'okay', feedback: 'Taking yourself out of the pressure works. Letting an adult know could protect others.' },
        ],
      },
    },
  },
  {
    id: 'screenshot',
    title: 'Your private message, shared',
    setting: 'A group you’re not in',
    nodes: {
      start: {
        text: 'You find out a friend screenshotted something private you told them and shared it in another group.',
        choices: [
          { text: 'Talk to them directly and ask them to delete it.', quality: 'best', feedback: 'Going straight to them gives the best chance of fixing it quickly.', next: 'reply' },
          { text: 'Share one of their private messages back.', quality: 'risky', feedback: 'Revenge makes two people hurt instead of one, and it can escalate fast.', next: 'reply' },
          { text: 'Pretend you didn’t see it.', quality: 'okay', feedback: 'Understandable, but it’s OK to stand up for your privacy.', next: 'reply' },
        ],
      },
      reply: {
        message: { from: 'your friend', text: 'it was just a joke, stop being so sensitive' },
        choices: [
          { text: 'Explain that sharing private things without asking isn’t OK, and tell a trusted adult if it carries on.', quality: 'best', feedback: 'Consent applies to messages too. You’re allowed to set that boundary.' },
          { text: 'Apologise for overreacting.', quality: 'risky', feedback: 'You didn’t overreact. Your private messages are yours to share, not theirs.' },
          { text: 'Mute them for a while.', quality: 'okay', feedback: 'Space can help. Think about who you share private things with going forward.' },
        ],
      },
    },
  },
]

export const ROUND_SIZE = 3
export const POINTS = { best: 10, okay: 5, risky: 0 }
export const STEPS_PER_SCENARIO = 2
