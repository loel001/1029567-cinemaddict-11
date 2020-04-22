import FilmCardComponent from "../components/film-card";
import FilmDetailsComponent from "../components/film-details";
import {remove, render, RenderPosition} from "../utils/render";

export default class FilmCardController {
  constructor(container) {
    this._container = container;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(film) {
    this._filmCardComponent = new FilmCardComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film);
    const bodySite = document.querySelector(`body`);

    render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);

    this._filmCardComponent.setEditButtonsClickHandler(() => {
      bodySite.appendChild(this._filmDetailsComponent.getElement());
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._filmCardComponent.setWatchlistButtonClickHandler(() => {
    });

    this._filmCardComponent.setHistoryButtonClickHandler(() => {
    });

    this._filmCardComponent.setFavoritesButtonClickHandler(() => {
    });

    // this._filmDetailsComponent.setWatchlistButtonClickHandler(() => {
    // });
    //
    // this._filmDetailsComponent.setHistoryButtonClickHandler(() => {
    // });
    //
    // this._filmDetailsComponent.setFavoritesButtonClickHandler(() => {
    // });

    this._filmDetailsComponent.closeButtonClickHandler(() => {
      this._closeFilmCard();
    });
  }

  _closeFilmCard() {
    remove(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._closeFilmCard();
    }
  }
}
