import AbstractComponent from "./abstract-component.js";
import {emojiNames} from "../const";

const createGenresMarkup = (genres) => {
  return genres
    .map((genre) => {
      return (
        `<span class="film-details__genre">${genre}</span>`
      );
    })
    .join(`\n`);
};

const createCommentsMarkup = (comments) => {
  return comments
    .map((comment) => {
      return (
        `<li class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src="./images/emoji/${comment.emoji}.png" width="55" height="55" alt="emoji-${comment.emoji}">
          </span>
          <div>
            <p class="film-details__comment-text">${comment.text}</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">${comment.author}</span>
              <span class="film-details__comment-day">${comment.day}</span>
              <button class="film-details__comment-delete">Delete</button>
            </p>
          </div>
        </li>`
      );
    })
    .join(`\n`);
};

const createEmojiListMarkup = (names) => {
  return names
    .map((emojiName) => {
      return (
        `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emojiName}" value="${emojiName}">
          <label class="film-details__emoji-label" for="emoji-${emojiName}">
            <img src="./images/emoji/${emojiName}.png" width="30" height="30" alt="emoji">
          </label>`
      );
    })
    .join(`\n`);
};

const createCommentsWrapMarkup = (comments, commentsMarkup, emojiListMarkup) => {
  return (
    `<section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">
          ${commentsMarkup}
        </ul>

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            ${emojiListMarkup}
          </div>
        </div>
      </section>`
  );
};

const createFilmDetailsTemplate = (film) => {
  const {poster, movieTitle, age, director, writers, actors, rating, date, duration, country, genreNames, description, comments} = film;

  const commentsMarkup = createCommentsMarkup(comments);
  const genresMarkup = createGenresMarkup(genreNames);
  const emojiListMarkup = createEmojiListMarkup(emojiNames);
  const commentsWrapMarkup = createCommentsWrapMarkup(comments, commentsMarkup, emojiListMarkup);
  const genreTerm = genreNames.length > 1 ? `Genres` : `Genre`;

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
              <td class="film-details__cell">${date.getDate()} ${date.getMonth()} ${date.getFullYear()}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${duration}</td>
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
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="form-details__bottom-container">
      ${commentsWrapMarkup}
    </div>
  </form>
  </section>`
  );
};

export default class FilmDetails extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film);
  }

  setEditButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);
  }
}
