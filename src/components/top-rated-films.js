import AbstractComponent from "./abstract-component";

const createTopRatedFilmsTemplate = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>

      <div class="films-list__container"></div>
    </section>`
  );
};

export default class TopRatedFilms extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createTopRatedFilmsTemplate();
  }
}
