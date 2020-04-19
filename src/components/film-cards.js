import AbstractComponent from "./abstract-component.js";

const createFilmCardsTemplate = () => {
  return (
    `<div class="films-list__container"></div>`
  );
};


export default class FilmCards extends AbstractComponent {
  getTemplate() {
    return createFilmCardsTemplate();
  }
}
