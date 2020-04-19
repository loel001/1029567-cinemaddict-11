import AbstractComponent from "./abstract-component.js";

const createNoFilmCardsTemplate = () => {
  return (
    `<h2 class="films-list__title">There are no movies in our database</h2>`
  );
};


export default class NoFilmCards extends AbstractComponent {
  getTemplate() {
    return createNoFilmCardsTemplate();
  }
}
