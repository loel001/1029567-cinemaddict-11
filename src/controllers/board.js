import {remove, render, RenderPosition} from "../utils/render";
import NoFilmCards from "../components/no-film-cards";
import SortingComponent, {SortType} from "../components/sorting";
import FilmCardsComponent from "../components/film-cards";
import FilmCardController from "./film-card";
import LoadMoreButtonComponent from "../components/load-more-button";
import SiteProfileComponent from "../components/site-profile";

const TOTAL_NUMBER_OF_CARDS = 5;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;
const NUMBER_OF_CARDS = 2;
const siteHeader = document.querySelector(`.profile`);

const renderFilmCards = (filmListElement, films, comments, onDataChange, onViewChange) => {
  return films.map((film) => {
    const filmCardController = new FilmCardController(filmListElement, comments, onDataChange, onViewChange);

    filmCardController.render(film);

    return filmCardController;
  });
};

const getSortedFilms = (films, sortType, from, to) => {
  let sortedFilms = [];
  const showingFilms = films.slice();

  switch (sortType) {
    case SortType.DEFAULT:
      sortedFilms = showingFilms;
      break;
    case SortType.DATE_DOWN:
      sortedFilms = showingFilms.sort((a, b) => b.date - a.date);
      break;
    case SortType.RATING_DOWN:
      sortedFilms = showingFilms.sort((a, b) => b.rating - a.rating);
      break;
  }
  return sortedFilms.slice(from, to);
};

export default class BoardController {
  constructor(container, models) {
    this._container = container;
    this._filmCardsModel = models.filmCardsModel;
    this._commentsModel = models.commentsModel;

    this._showedFilmCardControllers = [];
    this._showingCards = TOTAL_NUMBER_OF_CARDS;
    this._noFilmCards = new NoFilmCards();
    this._sortingComponent = new SortingComponent();
    this._filmCardsComponent = new FilmCardsComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
    this._siteProfileComponent = new SiteProfileComponent(this._filmCardsModel.getFilmsAll());

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onLoadMoreButtonClick = this._onLoadMoreButtonClick.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._sortingComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._filmCardsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const container = this._container.getElement();
    const films = this._filmCardsModel.getFilms();
    const filmWrapper = container.querySelector(`.films-list`);

    if (this._filmCardsModel.getFilms().length === 0) {
      render(filmWrapper, this._noFilmCards, RenderPosition.BEFOREEND);
      return;
    }

    // профайл
    render(siteHeader, this._siteProfileComponent, RenderPosition.BEFOREBEGIN);

    // сортировка
    render(container, this._sortingComponent, RenderPosition.BEFOREBEGIN);

    render(filmWrapper, this._filmCardsComponent, RenderPosition.BEFOREEND);

    // карточки фильма
    this._renderFilmCards(films.slice(0, this._showingCards));
    this._renderSpecialFilmCards(films);
    this._renderLoadMoreButton();
  }

  _removeFilmCards() {
    this._showedFilmCardControllers.forEach((filmCardController) => filmCardController.destroy());
    this._showedFilmCardControllers = [];
  }

  _renderFilmCards(films) {
    const filmListElement = this._filmCardsComponent.getElement();
    const newFilmCards = renderFilmCards(filmListElement, films, this._commentsModel, this._onDataChange, this._onViewChange);
    this._showedFilmCardControllers = this._showedFilmCardControllers.concat(newFilmCards);
  }

  _renderFilterFilms(films) {
    this._renderFilmCards(films);

    this._showingCards = this._showedFilmCardControllers.length;
  }

  _renderSpecialFilmCards(films) {
    const container = this._container.getElement();
    const cardTopRatedWrappers = container.querySelectorAll(`.films-list--extra .films-list__container`);

    const topRatedFilms = films.slice(0).sort((a, b) => b.rating - a.rating).slice(0, NUMBER_OF_CARDS);
    const mostCommentedFilms = films.slice(0).sort((a, b) => b.commentsCount - a.commentsCount).slice(0, NUMBER_OF_CARDS);

    const topRatedFilmCards = renderFilmCards(cardTopRatedWrappers[0], topRatedFilms, this._commentsModel, this._onDataChange, this._onViewChange);
    this._showedFilmCardControllers = this._showedFilmCardControllers.concat(topRatedFilmCards);

    const mostCommentedFilmCards = renderFilmCards(cardTopRatedWrappers[1], mostCommentedFilms, this._commentsModel, this._onDataChange, this._onViewChange);
    this._showedFilmCardControllers = this._showedFilmCardControllers.concat(mostCommentedFilmCards);
  }

  _renderLoadMoreButton() {
    remove(this._loadMoreButtonComponent);
    if (this._showingCards >= this._filmCardsModel.getFilms().length) {
      return;
    }
    const container = this._container.getElement();
    // кнопка показать больше
    const filmWrapper = container.querySelector(`.films-list`);
    render(filmWrapper, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

    this._loadMoreButtonComponent.setClickHandler(this._onLoadMoreButtonClick);
  }

  _onDataChange(filmCardController, oldData, newData) {
    const isSuccess = this._filmCardsModel.updateFilm(oldData.id, newData);
    if (isSuccess) {
      if (document.querySelector(`body`).contains(document.querySelector(`.film-details`))) {
        filmCardController.render(newData);
        this._updateFilms(this._showingCards);
      } else {
        this._updateFilms(this._showingCards);
      }
      remove(this._siteProfileComponent);
      this._siteProfileComponent = new SiteProfileComponent(this._filmCardsModel.getFilmsAll());
      render(siteHeader, this._siteProfileComponent, RenderPosition.BEFOREBEGIN);
    }
  }

  _onViewChange() {
    this._showedFilmCardControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    this._showingCards = TOTAL_NUMBER_OF_CARDS;

    const sortedFilms = getSortedFilms(this._filmCardsModel.getFilms(), sortType, 0, this._showingCards);
    this._removeFilmCards();
    this._renderFilmCards(sortedFilms);
    this._renderSpecialFilmCards(this._filmCardsModel.getFilmsAll());
    this._renderLoadMoreButton();
  }

  _onLoadMoreButtonClick() {
    const prevCards = this._showingCards;
    const films = this._filmCardsModel.getFilms();

    this._showingCards = this._showingCards + SHOWING_CARDS_COUNT_BY_BUTTON;

    const sortedFilms = getSortedFilms(films, this._sortingComponent.getSortType(), prevCards, this._showingCards);
    this._renderFilmCards(sortedFilms);

    if (this._showingCards >= films.length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _onFilterChange() {
    this._removeFilmCards();
    const sortedFilms = getSortedFilms(this._filmCardsModel.getFilms(), this._sortingComponent.getSortType(), 0, TOTAL_NUMBER_OF_CARDS);
    this._renderFilterFilms(sortedFilms);
    this._renderSpecialFilmCards(this._filmCardsModel.getFilmsAll());
    this._renderLoadMoreButton();
  }

  _updateFilms(count) {
    this._removeFilmCards();
    const sortedFilms = getSortedFilms(this._filmCardsModel.getFilms(), this._sortingComponent.getSortType(), 0, count);
    this._renderFilmCards(sortedFilms);
    this._renderSpecialFilmCards(this._filmCardsModel.getFilmsAll());
    this._renderLoadMoreButton();
  }
}
