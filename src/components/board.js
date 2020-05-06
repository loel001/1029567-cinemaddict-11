import AbstractComponent from "./abstract-component.js";

const createBoardTemplate = (films) => {
  return (
    `<section class="films">
    <section class="films-list">
      ${films.length === 0 ? `` : `<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>`}

    </section>
    <section class="films-list--extra">
      ${films.length === 0 ? `` : `<h2 class="films-list__title">Top rated</h2>`}

      <div class="films-list__container"></div>
    </section>
    <section class="films-list--extra">
      ${films.length === 0 ? `` : `<h2 class="films-list__title">Most commented</h2>`}

      <div class="films-list__container"></div>
    </section>
  </section>`
  );
};

export default class Board extends AbstractComponent {
  constructor(films) {
    super();

    this._films = films;
  }

  getTemplate() {
    return createBoardTemplate(this._films);
  }
}
