import {formatCommentDate} from "../utils/common";
import AbstractSmartComponent from "./abstract-smart-component";

const createCommentTemplate = (comment) => {
  const {emoji, text, author, day} = comment;
  const commentDate = formatCommentDate(day);
  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${commentDate}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

export default class Comment extends AbstractSmartComponent {
  constructor(comment) {
    super();

    this._comment = comment;
  }

  getTemplate() {
    return createCommentTemplate(this._comment);
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__comment-delete`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        handler();
      });
  }
}
