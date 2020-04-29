import {remove, render, RenderPosition} from "../utils/render";
import NoFilmCards from "../components/no-film-cards";
import SortingComponent, {SortType} from "../components/sorting";
import FilmCardsComponent from "../components/film-cards";
import FilmCardController from "./film-card";
import LoadMoreButtonComponent from "../components/load-more-button";

const TOTAL_NUMBER_OF_CARDS = 5;
const SHOWING_TASKS_COUNT_BY_BUTTON = 5;
const NUMBER_OF_CARDS = 2;

const renderFilmCards = (filmListElement, films, onDataChange, onViewChange) => {
  return films.map((film) => {
    const filmCardController = new FilmCardController(filmListElement, onDataChange, onViewChange);

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
  constructor(container, filmCardsModel) {
    this._container = container;
    this._filmCardsModel = filmCardsModel;

    this._showedFilmCardControllers = [];
    this._showingCards = TOTAL_NUMBER_OF_CARDS;
    this._noFilmCards = new NoFilmCards();
    this._sortingComponent = new SortingComponent();
    this._filmCardsComponent = new FilmCardsComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
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

    // сортировка
    render(container, this._sortingComponent, RenderPosition.BEFOREBEGIN);
    render(filmWrapper, this._filmCardsComponent, RenderPosition.BEFOREEND);
    // const filmListElement = container.querySelector(`.films-list .films-list__container`);

    // карточка фильма
    this._renderFilmCards(films.slice(0, this._showingCards));
    this._renderLoadMoreButton();

    // Карточки фильма в блоке «Top rated»
    // Карточки фильма в блоке «Most commented»
    // const cardTopRatedWrappers = container.querySelectorAll(`.films-list--extra .films-list__container`);
    // const TopRatedFilmCards = renderFilmCards(cardTopRatedWrappers[0], this._films.slice(0, NUMBER_OF_CARDS), this._onDataChange, this._onViewChange);
    // this._showedFilmCardControllers = this._showedFilmCardControllers.concat(TopRatedFilmCards);
    // const MostCommentedFilmCards = renderFilmCards(cardTopRatedWrappers[1], this._films.slice(0, NUMBER_OF_CARDS), this._onDataChange, this._onViewChange);
    // this._showedFilmCardControllers = this._showedFilmCardControllers.concat(MostCommentedFilmCards);
  }

  _removeFilmCards() {
    this._showedFilmCardControllers.forEach((filmCardController) => filmCardController.destroy());
    this._showedFilmCardControllers = [];
  }

  _renderFilmCards(films) {
    const filmListElement = this._filmCardsComponent.getElement();

    // карточка фильма
    const newFilmCards = renderFilmCards(filmListElement, films, this._onDataChange, this._onViewChange);
    this._showedFilmCardControllers = this._showedFilmCardControllers.concat(newFilmCards);

    this._showingCards = this._showedFilmCardControllers.length;
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

    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevCards = this._showingCards;
      const films = this._filmCardsModel.getFilms();
      const filmListElement = this._filmCardsComponent.getElement();
      this._showingCards = this._showingCards + SHOWING_TASKS_COUNT_BY_BUTTON;

      const sortedFilms = getSortedFilms(films, this._sortingComponent.getSortType(), prevCards, this._showingCards);
      const newFilmCards = renderFilmCards(filmListElement, sortedFilms, this._onDataChange, this._onViewChange);

      this._showedFilmCardControllers = this._showedFilmCardControllers.concat(newFilmCards);
    });
  }

  _updateTasks(count) {
    this._removeFilmCards();
    this._renderFilmCards(this._filmCardsModel.getFilms().slice(0, count));
    this._renderLoadMoreButton();
  }

  _onDataChange(filmCardController, oldData, newData) {
    const isSuccess = this._filmCardsModel.updateFilm(oldData.id, newData);

    if (isSuccess) {
      filmCardController.render(newData);
    }
  }

  _onViewChange() {
    this._showedFilmCardControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    this._showingCards = TOTAL_NUMBER_OF_CARDS;

    const sortedFilms = getSortedFilms(this._filmCardsModel.getFilms(), sortType, 0, this._showingCards);
    const filmListElement = this._filmCardsComponent.getElement();

    filmListElement.innerHTML = ``;

    const newFilmCards = renderFilmCards(filmListElement, sortedFilms, this._onDataChange, this._onViewChange);
    this._showedFilmCardControllers = newFilmCards;
    this._renderLoadMoreButton();
  }

  _onFilterChange() {
    this._updateTasks(TOTAL_NUMBER_OF_CARDS);
  }
}
