import {emojiNames} from "../const";
import AbstractComponent from "./abstract-component.js";

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

const createFilmDetailsTemplate = (film) => {
  const emojiListMarkup = createEmojiListMarkup(emojiNames);
  return (
    `<section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${film.comments.length}</span></h3>

        <ul class="film-details__comments-list"></ul>

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

export default class FilmDetails extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film);
  }

  getCommentsListElement() {
    return this.getElement().querySelector(`.film-details__comments-list`);
  }

  getNewCommentElement() {
    return this.getElement().querySelector(`.film-details__new-comment`);
  }

  getCommentTextElement() {
    return this.getElement().querySelector(`.film-details__comment-input`);
  }

  setCtrlEnterKeyDownHandler(handler) {
    this.getElement().querySelector(`.film-details__comment-input`)
      .addEventListener(`keydown`, handler);
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    const emojiElement = element.querySelector(`.film-details__add-emoji-label`);
    element.querySelectorAll(`.film-details__emoji-label`)
      .forEach((elem) => {
        elem.addEventListener(`click`, () => {
          const link = elem.querySelector(`img`).src;
          emojiElement.innerHTML = `<img src=${link} width="55" height="55" alt="emoji">`;
        });
      });
  }
}
