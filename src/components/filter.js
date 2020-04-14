import {createElement} from "../utils.js";
import {filterNames, cardfilters} from "../const";

const getNameFilter = (array, name) => {
  return array.filter((element) => {
    return element[name] === true;
  });
};

const createFilterMarkup = (filters, films) => {
  return filters
    .map((name, index) => {
      return (
        `<a href="#${name}" class="main-navigation__item">${name} <span class="main-navigation__item-count">${getNameFilter(films, cardfilters[index]).length}</span></a>`
      );
    })
    .join(`\n`);
};

const createFilterTemplate = (films) => {
  const filtersMarkup = createFilterMarkup(filterNames, films);
  return (
    `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${filtersMarkup}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
  );
};

export default class Filter {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate(this._films);
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
