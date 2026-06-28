// Edit your letter here — paste your words when you're ready.
export const letter = {
  recipient: "Her name",
  greeting: "My dearest,",
  paragraphs: [
    "I wish I could hand you this letter in person today — sit across from you, watch your smile as you open it, and tell you how proud I am out loud.",
    "But even oceans apart, my heart is right there with you. Every late-night study session you pushed through, every doubt you overcame, every small victory you barely celebrated — I saw all of it, even from far away.",
    "Today you graduate, and that is not just a ceremony. It is proof of who you are: brave, brilliant, and more capable than you sometimes let yourself believe.",
    "So when you walk across that stage, know that somewhere else in the world, someone is cheering for you so loudly the universe might hear it.",
    "I love you. Congratulations — this is only the beginning.",
  ],
  closing: "Forever yours,",
  signature: "Your name",
  date: new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
};
