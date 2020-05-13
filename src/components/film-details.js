import AbstractSmartComponent from "./abstract-smart-component.js";
import {formatTime, formatPopupDate} from "../utils/common";

const createGenresMarkup = (genres) => {
  return genres
    .map((genre) => {
      return (
        `<span class="film-details__genre">${genre}</span>`
      );
    })
    .join(`\n`);
};

const createButtonMarkup = (name, content, isChecked) => {
  return (
    `<input type="checkbox" class="film-details__control-input film-details__control-input--${name} visually-hidden" id="${name}" name="${name}" ${isChecked ? `checked` : ``}>
      <label for="${name}" class="film-details__control-label film-details__control-label--${name}">${content}</label>`
  );
};

const createFilmDetailsTemplate = (film) => {
  const {poster, movieTitle, age, director, writers, actors, rating, date, duration, country, genreNames, description} = film;

  const genresMarkup = createGenresMarkup(genreNames);
  const genreTerm = genreNames.length > 1 ? `Genres` : `Genre`;
  const popupDate = formatPopupDate(date);
  const time = formatTime(duration);
  const watchlistButton = createButtonMarkup(`watchlist`, `Add-to-watchlist`, film.isWatchlist);
  const historyButton = createButtonMarkup(`watched`, `Already watched`, film.isHistory);
  const favoritesButton = createButtonMarkup(`favorite`, `Add to favorites`, film.isFavorite);

  return (
    `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/${poster}" alt="${movieTitle}">

          <p class="film-details__age">${age}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${movieTitle}</h3>
              <p class="film-details__title-original">Original: ${movieTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${popupDate}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${time}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${genreTerm}</td>
              <td class="film-details__cell">
                ${genresMarkup}
               </td>
            </tr>
          </table>

          <p class="film-details__film-description">
           ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        ${watchlistButton}
        ${historyButton}
        ${favoritesButton}
      </section>
    </div>

    <div class="form-details__bottom-container"></div>
  </form>
  </section>`
  );
};

export default class FilmDetails extends AbstractSmartComponent {
  constructor(film) {
    super();

    this._film = film;
    this._clickHandler = null;
    this._watchListHandler = null;
    this._historyHandler = null;
    this._favoritesHandler = null;

    // this._subscribeOnEvents();
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film);
  }

  get film() {
    return this._film;
  }

  getData() {
    const form = this.getElement().querySelector(`.film-details__inner`);
    const formData = new FormData(form);

    return {
      emoji: formData.get(`comment-emoji`),
      text: formData.get(`comment`)
    };
  }

  recoveryListeners() {
    this.closeButtonClickHandler(this._clickHandler);
    this.setWatchlistButtonClickHandler(this._watchListHandler);
    this.setHistoryButtonClickHandler(this._historyHandler);
    this.setFavoritesButtonClickHandler(this._favoritesHandler);
  }

  closeButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);

    this._clickHandler = handler;
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`input#watchlist`)
      .addEventListener(`click`, handler);
    this._watchListHandler = handler;
  }

  setHistoryButtonClickHandler(handler) {
    this.getElement().querySelector(`input#watched`)
      .addEventListener(`click`, handler);
    this._historyHandler = handler;
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`input#favorite`)
      .addEventListener(`click`, handler);
    this._favoritesHandler = handler;
  }

  getCommentsElement() {
    return this.getElement().querySelector(`.form-details__bottom-container`);
  }
}
