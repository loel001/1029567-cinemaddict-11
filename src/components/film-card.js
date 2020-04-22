import AbstractComponent from "./abstract-component.js";

const createButtonMarkup = (name, isActive) => {
  return (
    `<button
      type="button"
      class="film-card__controls-item button film-card__controls-item--${name} ${isActive ? `film-card__controls-item--active` : ``}"
    >
      ${name}
    </button>`
  );
};

const createFilmCardTemplate = (film) => {
  const {movieTitle, rating, date, duration, genreNames, poster, description, comments} = film;
  const year = date.getFullYear();

  const watchlistButton = createButtonMarkup(`add-to-watchlist`, film.isWatchlist);
  const historyButton = createButtonMarkup(`mark-as-watched`, film.isHistory);
  const favoritesButton = createButtonMarkup(`favorite`, film.isFavorite);
  return (
    `<article class="film-card">
          <h3 class="film-card__title">${movieTitle}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${year}</span>
            <span class="film-card__duration">${duration}</span>
            <span class="film-card__genre">${genreNames[0]}</span>
          </p>
          <img src="./images/posters/${poster}" alt="${movieTitle}" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <a class="film-card__comments">${comments.length} comments</a>
          <form class="film-card__controls">
            ${watchlistButton}
            ${historyButton}
            ${favoritesButton}
          </form>
        </article>`
  );
};

export default class FilmCard extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  setEditButtonsClickHandler(handler) {
    this.getElement().querySelectorAll(`.film-card__poster, .film-card__title, .film-card__comments`)
      .forEach((element) => {
        element.addEventListener(`click`, handler);
      });
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setHistoryButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }
}
