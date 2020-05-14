import {generateComments} from "./comment.js";

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

const getNewArrayDescription = (ar) => {
  const array = [];
  const newLength = ar.length - 4;
  const j = getRandomInRange(0, newLength);
  for (let i = j; i <= j + getRandomInRange(0, 5); i++) {
    array.push(ar[i]);
  }
  return array;
};

const getNewArray = (ar) => {
  const array = [];
  const newLength = ar.length - 1;
  for (let i = 0; i <= getRandomInRange(0, newLength); i++) {
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
const startDate = new Date(1920, 3, 5).getTime();
const finalDate = new Date(2020, 3, 27).getTime();

const getId = () => {
  return Number(Date.now()) + Math.random();
};

const generateFilmCard = () => {
  const comments = generateComments(getRandomInRange(0, 3)).map((comment) => Object.assign({}, comment, {id: getId()}));
  return {
    id: getId(),
    movieTitle: movieTitles[getRandomInRange(0, movieTitles.length - 1)],
    age: ages[getRandomInRange(0, ages.length - 1)],
    director: directors[getRandomInRange(0, directors.length - 1)],
    writers: getNewArray(writers).join(`, `),
    actors: getNewArray(actors).join(`, `),
    rating: getRandomRating(1, 9),
    date: new Date(getRandomInRange(startDate, finalDate)),
    genreNames: getNewArray(popupGenres),
    poster: posters[getRandomInRange(0, posters.length - 1)],
    currentDescription: getNewArrayDescription(descriptions).join(` `),
    country: countries[getRandomInRange(0, countries.length - 1)],
    comments,
    isFavorite: Math.random() > 0.5,
    isHistory: Math.random() > 0.5,
    isWatchlist: Math.random() > 0.5,
    duration: getRandomInRange(60, 180),
  };
};

const generateFilmCards = (count) => {
  return Array.from({length: count}, generateFilmCard);
};

export {generateFilmCard, generateFilmCards};
