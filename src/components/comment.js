import {formatCommentDate} from "../utils/common";
import AbstractSmartComponent from "./abstract-smart-component";

const DefaultData = {
  deleteButtonText: `Delete`
};

const createCommentTemplate = (comment, options) => {
  const {emoji, text, author, day} = comment;
  const {externalData} = options;
  const deleteButtonText = externalData.deleteButtonText;
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
          <button class="film-details__comment-delete">${deleteButtonText}</button>
        </p>
      </div>
    </li>`
  );
};

export default class Comment extends AbstractSmartComponent {
  constructor(comment) {
    super();

    this._comment = comment;
    this._externalData = DefaultData;
  }

  getTemplate() {
    return createCommentTemplate(this._comment, {
      externalData: this._externalData,
    });
  }

  recoveryListeners() {
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
  }

  setDeleteButtonClickHandler(handler) {
    this.getDeleteButton()
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        handler();
      });

    this._deleteButtonClickHandler = handler;
  }

  rerender() {
    super.rerender();
  }

  setData(data) {
    this._externalData = Object.assign({}, DefaultData, data);
    this.rerender();
  }

  getDeleteButton() {
    return this.getElement().querySelector(`.film-details__comment-delete`);
  }
}
