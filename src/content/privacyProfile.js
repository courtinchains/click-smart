// Privacy Detective — fictional profile content.
//
// DRAFT CONTENT: review with SOSA before launch. The profile is fictional.
// Each item: { id, kind, text, risky, why }
// kind: 'bio' | 'detail' | 'post' — controls where it appears on the profile.

export const profile = {
  displayName: 'Alex Morgan',
  handle: '@alex.makes.things',
  followers: '1,204',
  following: '388',
  avatarInitials: 'AM',
  items: [
    {
      id: 'school',
      kind: 'bio',
      text: '🏫 Year 10 @ Hillcrest High · Room 14',
      risky: true,
      why: 'Naming your school (and even your classroom) tells strangers exactly where to find you on weekdays.',
    },
    {
      id: 'hobby',
      kind: 'bio',
      text: '🎨 Drawing · 🎸 Learning guitar',
      risky: false,
      why: 'Sharing hobbies is generally fine — it does not reveal where you are or how to contact you.',
    },
    {
      id: 'phone',
      kind: 'detail',
      text: '📱 Text me: 071 555 0142',
      risky: true,
      why: 'A public phone number lets anyone contact you privately, outside the app’s safety and blocking tools.',
    },
    {
      id: 'birthday',
      kind: 'detail',
      text: '🎂 Born 14 March 2011',
      risky: true,
      why: 'A full date of birth is often used to verify identity and can help someone guess passwords or impersonate you.',
    },
    {
      id: 'live-location',
      kind: 'post',
      text: 'Home alone all weekend, parents away 🙌 📍 12 Oak Lane',
      risky: true,
      why: 'This combines your street address with the fact that you are alone. Share plans and locations after the fact, and only with people you know.',
    },
    {
      id: 'sunset',
      kind: 'post',
      text: 'Sunset sketch I finished today 🌅',
      risky: false,
      why: 'Your own artwork with no location, school or contact details attached is a safe thing to share.',
    },
    {
      id: 'uniform',
      kind: 'post',
      text: '📸 Selfie in school uniform at the bus stop — same time every day lol',
      risky: true,
      why: 'Uniforms show your school, and a regular time and place reveals your routine. Check the background of photos before posting.',
    },
    {
      id: 'holiday',
      kind: 'post',
      text: 'Throwback to last year’s holiday 🏖️',
      risky: false,
      why: 'Posting holiday photos after you are back home is a safer habit than announcing it while you are away.',
    },
    {
      id: 'password-hint',
      kind: 'post',
      text: 'My dog Biscuit turns 5 today! He’s literally in all my passwords 😂',
      risky: true,
      why: 'Pet names are common passwords and security answers. Joking about it publicly gives people a head start on getting into your accounts.',
    },
    {
      id: 'public',
      kind: 'detail',
      text: '🌍 Account: Public',
      risky: true,
      why: 'A public account means anyone can see everything above. Setting it to private and reviewing follower requests limits who can see your posts.',
    },
  ],
}

export const POINTS_CORRECT = 10
export const POINTS_WRONG = 5
