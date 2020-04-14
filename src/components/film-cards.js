import {createElement} from "../utils.js";

const createFilmCardsTemplate = () => {
  return (
    `<div class="films-list__container"></div>`
  );
};


export default class FilmCards {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmCardsTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
