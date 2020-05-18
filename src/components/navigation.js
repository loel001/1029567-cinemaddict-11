import AbstractComponent from "./abstract-component.js";
import {NavigationItem} from "../const.js";

const createNavigationTemplate = () => {
  return (
    `<nav class="main-navigation">
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class Navigation extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createNavigationTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      if (evt.target.tagName !== `A`) {
        return;
      }
      const item = evt.target.dataset.filter ? NavigationItem.FILTER : NavigationItem.STATISTIC;
      handler(item);
    });
  }
}
