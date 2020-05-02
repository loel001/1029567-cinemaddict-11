import AbstractComponent from "./abstract-component.js";
import {getHistoryFilms} from "../utils/filter";

const getUserName = (films) => {
  const count = getHistoryFilms(films).length;
  switch (true) {
    case count >= 1 && count <= 10:
      return `Novice`;
    case count >= 11 && count <= 20:
      return `Fan`;
    case count > 21:
      return `Movie Buff`;
  }
  return ``;
};

const createSiteProfileTemplate = (films) => {
  return (
    `<section class="header__profile profile">
    <p class="profile__rating">${getUserName(films)}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
  );
};

export default class SiteProfile extends AbstractComponent {
  constructor(films) {
    super();

    this._films = films;
  }

  getTemplate() {
    return createSiteProfileTemplate(this._films);
  }
}
