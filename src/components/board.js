import AbstractComponent from "./abstract-component.js";

const createBoardTemplate = () => {
  return (
    `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    </section>
  </section>`
  );
};

export default class Board extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createBoardTemplate();
  }
}
