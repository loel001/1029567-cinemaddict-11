const descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`];

const getRandomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomRating = (min, max) => {
  return ((Math.random() * (max - min + 1)) + min). toPrecision(2);
};

const getNewArray = (ar) => {
  const array = [];
  const newLength = ar.length - 4;
  const j = getRandomInRange(0, newLength);
  for (let i = j; i <= j + getRandomInRange(0, 5); i++) {
    array.push(ar[i]);
  }
  return array;
};

const movieTitles = [`The Dance of Life`, `Sagebrush Trail`, `The Man with the Golden Arm`, `Santa Claus Conquers the Martians`, `Popeye the Sailor Meets Sindbad the Sailor`];
const ages = [`18`, `6`, `12`];
const directors = [`Anthony Mann`, `Heinz Herald`, `Richard Weil`];
const writers = [`Anne Wigton`, `Heinz Herald`, `Richard Weil`];
const actors = [`Erich von Stroheim`, `Mary Beth Hughes`, `Dan Duryea`];
const popupGenres = [`Drama`, `Film-Noir`, `Mystery`, `Drama`, `Film-Noir`, `Mystery`];
const posters = [`the-dance-of-life.jpg`, `sagebrush-trail.jpg`, `the-man-with-the-golden-arm.jpg`, `santa-claus-conquers-the-martians.jpg`, `popeye-meets-sinbad.png`];
const countries = [`USA`, `Russia`, `Australia`];
const comments = [{
  text: `Interesting setting and a good cast`,
  author: `Tim Macoveev`,
  emoji: `smile`,
  day: `2019/12/31 23:59`
}, {
  text: `Booooooooooring`,
  author: `John Doe`,
  emoji: `sleeping`,
  day: `2 days ago`
}, {
  text: `Very very old. Meh`,
  author: `John Doe`,
  emoji: `puke`,
  day: `2 days ago`
}, {
  text: `Almost two hours? Seriously?`,
  author: `John Doe`,
  emoji: `angry`,
  day: `Today`
}];

const startDate = new Date(1920, 1, 1).getTime();
const finalDate = new Date(2020, 3, 1).getTime();
const durations = [`1h 20m`, `2h 15m`, `1h 45m`];
const booleanValues = [`true`, `false`];

const generateFilmCard = () => {
  return {
    movieTitle: movieTitles[getRandomInRange(0, movieTitles.length - 1)],
    age: ages[getRandomInRange(0, ages.length - 1)],
    director: directors[getRandomInRange(0, directors.length - 1)],
    writers: getNewArray(writers).join(`, `).toString(),
    actors: getNewArray(actors).join(`, `).toString(),
    rating: getRandomRating(1, 9),
    date: new Date(getRandomInRange(startDate, finalDate)),
    genreNames: getNewArray(popupGenres),
    poster: posters[getRandomInRange(0, posters.length - 1)],
    description: getNewArray(descriptions).join(` `).toString(),
    country: countries[getRandomInRange(0, countries.length - 1)],
    comments: getNewArray(comments),
    isFavorite: booleanValues[getRandomInRange(0, booleanValues.length - 1)],
    isHistory: booleanValues[getRandomInRange(0, booleanValues.length - 1)],
    isWatchlist: booleanValues[getRandomInRange(0, booleanValues.length - 1)],
    duration: durations[getRandomInRange(0, durations.length - 1)],
  };
};

const generateFilmCards = (count) => {
  return Array.from({length: count}, generateFilmCard);
};

export {generateFilmCard, generateFilmCards};
