import FilmCardComponent from "../components/film-card";
import FilmDetailsComponent from "../components/film-details";
import FilmCardModel from "../models/film-card";
import {render, replace, remove} from "../utils/render";
import CommentsController from "./comments";

const bodySite = document.querySelector(`body`);

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class FilmCardController {
  constructor(container, commentsModel, onDataChange, onViewChange) {
    this._container = container;
    this._commentsModel = commentsModel;
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
      this._renderComments();
      const popup = document.querySelectorAll(`.film-details`);
      if (popup.length > 1) {
        bodySite.removeChild(popup[0]);
      }
      document.addEventListener(`keydown`, this._onEscKeyDown);
      this._mode = Mode.EDIT;
    });

    this._filmCardComponent.setWatchlistButtonClickHandler(() => {
      const newFilmCard = FilmCardModel.clone(film);
      newFilmCard.isWatchlist = !newFilmCard.isWatchlist;

      this._onDataChange(this, film, newFilmCard);
    });

    this._filmCardComponent.setHistoryButtonClickHandler(() => {
      const newFilmCard = FilmCardModel.clone(film);
      newFilmCard.isHistory = !newFilmCard.isHistory;
      newFilmCard.watchingDate = newFilmCard.watchingDate ? null : new Date();

      this._onDataChange(this, film, newFilmCard);
    });

    this._filmCardComponent.setFavoritesButtonClickHandler(() => {
      const newFilmCard = FilmCardModel.clone(film);
      newFilmCard.isFavorite = !newFilmCard.isFavorite;

      this._onDataChange(this, film, newFilmCard);
    });

    this._filmDetailsComponent.setWatchlistButtonClickHandler(() => {
      const newFilmCard = FilmCardModel.clone(film);
      newFilmCard.isWatchlist = !newFilmCard.isWatchlist;

      this._onDataChange(this, film, newFilmCard);
    });

    this._filmDetailsComponent.setHistoryButtonClickHandler(() => {
      const newFilmCard = FilmCardModel.clone(film);
      newFilmCard.isHistory = !newFilmCard.isHistory;
      newFilmCard.watchingDate = newFilmCard.watchingDate ? null : new Date();

      this._onDataChange(this, film, newFilmCard);
    });

    this._filmDetailsComponent.setFavoritesButtonClickHandler(() => {
      const newFilmCard = FilmCardModel.clone(film);
      newFilmCard.isFavorite = !newFilmCard.isFavorite;

      this._onDataChange(this, film, newFilmCard);
    });

    this._filmDetailsComponent.closeButtonClickHandler((evt) => {
      evt.preventDefault();
      this._closeFilmCard();
    });

    if (oldFilmDetailsComponent && oldFilmCardComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
      if (this._mode === Mode.EDIT) {
        this._renderComments();
      }
      document.addEventListener(`keydown`, this._onEscKeyDown);
    } else {
      render(this._container, this._filmCardComponent);
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

  _renderComments() {
    new CommentsController(this._filmDetailsComponent, this._commentsModel, this._onDataChange.bind(this, this)).render();
  }
}
