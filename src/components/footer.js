import AbstractComponent from "./abstract-component.js";

const createFooterTemplate = (films) => {
  return (
    `<p>${films.length} movies inside</p>`
  );
};

export default class Footer extends AbstractComponent {
  constructor(films) {
    super();

    this._films = films;
  }

  getTemplate() {
    return createFooterTemplate(this._films);
  }
}
