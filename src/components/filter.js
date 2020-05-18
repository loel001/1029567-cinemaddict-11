import AbstractComponent from "./abstract-component.js";
import {FilterType} from "../const";

const createFilterMarkup = (filter, isChecked) => {
  const {name, count} = filter;
  return (
    `<a href="#${name}" data-filter="${name}" class="main-navigation__item ${isChecked ? `main-navigation__item--active` : ``}">${name} ${name === FilterType.ALL ? `movies` : `<span class="main-navigation__item-count">${count}</span>`}</a>`
  );
};

const createFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((it) => createFilterMarkup(it, it.checked)).join(`\n`);
  return (
    `<div class="main-navigation__items">${filtersMarkup}</div>`
  );
};

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().querySelectorAll(`.main-navigation__item`)
      .forEach((element) => {
        element.addEventListener(`click`, (evt) => {
          evt.preventDefault();
          this.getElement().querySelector(`.main-navigation__item--active`).classList.remove(`main-navigation__item--active`);
          evt.target.classList.add(`main-navigation__item--active`);
          handler(evt.target.dataset.filter);
        });
      });
  }
}
