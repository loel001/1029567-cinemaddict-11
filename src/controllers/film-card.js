import FilmCardComponent from "../components/film-card";
import FilmDetailsComponent from "../components/film-details";
import {render, replace, remove, RenderPosition} from "../utils/render";

const bodySite = document.querySelector(`body`);

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class FilmCardController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
    this._filmCardComponent = null;
    this._filmDetailsComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(film) {
    const oldFilmDetailsComponent = this._filmDetailsComponent;
    const oldFilmCardComponent = this._filmCardComponent;
    this._filmCardComponent = new FilmCardComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film);

    this._filmCardComponent.setEditButtonsClickHandler(() => {
      this._onViewChange();
      bodySite.appendChild(this._filmDetailsComponent.getElement());
      document.addEventListener(`keydown`, this._onEscKeyDown);
      this._mode = Mode.EDIT;
      const popup = document.querySelectorAll(`.film-details`);
      if (popup.length > 1) {
        bodySite.removeChild(popup[0]);
      }
    });

    this._filmCardComponent.setWatchlistButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatchlist: !film.isWatchlist,
      }));
    });

    this._filmCardComponent.setHistoryButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isHistory: !film.isHistory,
      }));
    });

    this._filmCardComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite,
      }));
    });

    this._filmDetailsComponent.setWatchlistButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatchlist: !film.isWatchlist,
      }));
    });

    this._filmDetailsComponent.setHistoryButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isHistory: !film.isHistory,
      }));
    });

    this._filmDetailsComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite,
      }));
    });

    this._filmDetailsComponent.closeButtonClickHandler((evt) => {
      evt.preventDefault();
      this._closeFilmCard();
    });

    if (oldFilmDetailsComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
      document.addEventListener(`keydown`, this._onEscKeyDown);
    } else {
      render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closeFilmCard();
    }
  }

  destroy() {
    remove(this._filmCardComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _closeFilmCard() {
    bodySite.removeChild(this._filmDetailsComponent.getElement());
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._closeFilmCard();
    }
  }
}
