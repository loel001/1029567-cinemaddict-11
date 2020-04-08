export const createFilmCardTemplate = () => {
  // const {} = film;

  const movieTitle = `The Dance of Life`;
  const rating = `8.3`;
  const year = `1929`;
  const duration = `1h 55m`;
  const genre = `genre`;
  const poster = `the-dance-of-life.jpg`;
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

  const array = [];
  const newLength = descriptions.length - 4;

  const getNewDescriptions = () => {
    let j = getRandomInRange(0, newLength);
    for (let i = j; i <= j + getRandomInRange(0, 5); i++) {
      array.push(descriptions[i]);
    }
    return array.join(` `).toString();
  };

  const comment = `5`;
  return (
    `<article class="film-card">
          <h3 class="film-card__title">${movieTitle}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${year}</span>
            <span class="film-card__duration">${duration}</span>
            <span class="film-card__genre">${genre}</span>
          </p>
          <img src="./images/posters/${poster}" alt="${movieTitle}" class="film-card__poster">
          <p class="film-card__description">${getNewDescriptions()}</p>
          <a class="film-card__comments">${comment} comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
          </form>
        </article>`
  );
};
