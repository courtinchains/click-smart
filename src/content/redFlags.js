// Spot the Red Flags — scenario content.
//
// DRAFT CONTENT: every scenario and explanation here must be reviewed and
// approved by SOSA before launch. Keep scenarios fictional and non-graphic,
// and keep explanations focused on what to do (pause, tell someone you trust,
// block, report) rather than on how manipulation works.
//
// Each message: { from: 'them' | 'you', text, flag?: { label, why } }
// Messages with a `flag` are the red flags players should find.

export const scenarios = [
  {
    id: 'gaming-friend',
    title: 'The new teammate',
    setting: 'In-game chat, after a few matches together',
    contact: 'NovaStrike_22',
    messages: [
      { from: 'them', text: 'gg! you were carrying that whole match 🔥' },
      { from: 'you', text: 'haha thanks, you were good too' },
      {
        from: 'them',
        text: 'this chat is so laggy. add me on another app? here is my username',
        flag: {
          label: 'Moving to another platform',
          why: 'Being pushed off a platform with safety tools and moderators onto a private app is a common warning sign. You can say no and keep chatting where you are — or not at all.',
        },
      },
      { from: 'you', text: 'maybe later' },
      {
        from: 'them',
        text: 'which school do you go to? i bet we live close',
        flag: {
          label: 'Asking for identifying details',
          why: 'Your school, area or routine can be used to find you offline. Someone you only know online does not need them.',
        },
      },
      {
        from: 'them',
        text: "don't tell anyone we talk ok? they wouldn't get it",
        flag: {
          label: 'Asking you to keep it secret',
          why: 'Safe people do not ask you to hide a friendship from the people you trust. A request for secrecy is a strong signal to talk to someone you trust.',
        },
      },
    ],
  },
  {
    id: 'prize',
    title: 'You have won!',
    setting: 'Direct message from an account you do not follow',
    contact: 'Official_Giveaways',
    messages: [
      { from: 'them', text: 'Congratulations 🎉 You were selected as this week’s winner of a new phone!' },
      {
        from: 'them',
        text: 'Claim within 10 minutes or the prize goes to someone else.',
        flag: {
          label: 'Rushing you',
          why: 'Fake deadlines are designed to stop you from thinking or checking with someone. Real organisations give you time.',
        },
      },
      {
        from: 'them',
        text: 'We just sent a 6-digit code to your phone. Reply with it to verify you are the winner.',
        flag: {
          label: 'Asking for a login code',
          why: 'That code is the key to your account. Nobody legitimate will ever ask you to send it to them.',
        },
      },
      { from: 'you', text: 'I never entered a giveaway though?' },
      { from: 'them', text: 'Winners are chosen automatically from active users 😊' },
    ],
  },
  {
    id: 'gift',
    title: 'A generous offer',
    setting: 'Comments on your video, then a direct message',
    contact: 'jay.creates',
    messages: [
      { from: 'them', text: 'love your videos, you are honestly so talented' },
      { from: 'you', text: 'aw thank you!' },
      {
        from: 'them',
        text: 'i want to send you a gift card to help with your channel. just need your home address and phone number',
        flag: {
          label: 'Gifts in exchange for personal information',
          why: 'Gifts or favours from someone you do not know offline can create a feeling that you owe them. Your address and number are private — you can say no.',
        },
      },
      { from: 'you', text: 'I would rather not share that' },
      {
        from: 'them',
        text: 'wow ok. i thought you were different. after everything i offered',
        flag: {
          label: 'Guilt and pressure after you say no',
          why: 'Making you feel bad for setting a boundary is a pressure tactic. A boundary is never rude. Block, report and tell someone you trust if it continues.',
        },
      },
    ],
  },
  {
    id: 'only-one',
    title: 'The one who "gets" you',
    setting: 'A friend-of-a-friend you met in a group chat',
    contact: 'river.m',
    messages: [
      { from: 'them', text: 'that was a rough day you described. you can always talk to me' },
      { from: 'you', text: 'thanks, it was a lot' },
      {
        from: 'them',
        text: "honestly your friends don't seem to care about you like i do",
        flag: {
          label: 'Driving a wedge between you and others',
          why: 'Trying to make you feel that only they understand you can isolate you from the people who can help. Stay connected to friends, family and other trusted adults.',
        },
      },
      { from: 'them', text: 'anyway what music are you into lately?' },
      { from: 'you', text: 'mostly indie stuff' },
    ],
  },
]

// Points: +10 per red flag found, −5 per message wrongly flagged (minimum 0).
export const POINTS_CORRECT = 10
export const POINTS_WRONG = 5
