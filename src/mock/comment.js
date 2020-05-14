const getRandomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const startDateComment = new Date(2020, 1, 5).getTime();
const finalDate = new Date(2020, 3, 27).getTime();

const COMMENTS = [{
  text: `Interesting setting and a good cast`,
  author: `Tim Macoveev`,
  emoji: `smile`,
  day: new Date(getRandomInRange(startDateComment, finalDate))
}, {
  text: `Booooooooooring`,
  author: `John Doe`,
  emoji: `sleeping`,
  day: new Date(getRandomInRange(startDateComment, finalDate))
}, {
  text: `Very very old. Meh`,
  author: `John Doe`,
  emoji: `puke`,
  day: new Date(getRandomInRange(startDateComment, finalDate))
}, {
  text: `Almost two hours? Seriously?`,
  author: `John Doe`,
  emoji: `angry`,
  day: new Date(getRandomInRange(startDateComment, finalDate))
}];

const generateComments = (count) => {
  return COMMENTS.slice().slice(0, count);
};

export {generateComments};
