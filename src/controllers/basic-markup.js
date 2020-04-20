import FilmCardComponent from "../components/film-card";
import FilmDetailsComponent from "../components/film-details";
import {remove, render, RenderPosition} from "../utils/render";
import NoFilmCards from "../components/no-film-cards";
import SortingComponent, {SortType} from "../components/sorting";
import FilmCardsComponent from "../components/film-cards";
import LoadMoreButtonComponent from "../components/load-more-button";

const TOTAL_NUMBER_OF_CARDS = 5;
const NUMBER_OF_CARDS = 2;

const renderFilmCard = (filmListElement, film) => {
  const bodySite = document.querySelector(`body`);
  const closeFilmCard = () => {
    remove(filmDetailsComponent);
    document.removeEventListener(`keydown`, onEscKeyDown);
  };
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      closeFilmCard();
    }
  };

  const filmCardComponent = new FilmCardComponent(film);
  const filmDetailsComponent = new FilmDetailsComponent(film);

  render(filmListElement, filmCardComponent, RenderPosition.BEFOREEND);

  filmCardComponent.setEditButtonsClickHandler(() => {
    bodySite.appendChild(filmDetailsComponent.getElement());
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  filmDetailsComponent.closeButtonClickHandler(() => {
    closeFilmCard();
  });
};

const renderFilmCards = (filmListElement, films) => {
  films.forEach((film) => {
    renderFilmCard(filmListElement, film);
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

export default class BasicMarkupController {
  constructor(container) {
    this._container = container;

    this._noFilmCards = new NoFilmCards();
    this._filmCardsComponent = new FilmCardsComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
    this._sortingComponent = new SortingComponent();
  }

  render(films) {
    const renderLoadMoreButton = () => {
      if (showingCards >= films.length) {
        return;
      }
      // кнопка показать больше
      remove(this._loadMoreButtonComponent);
      render(filmWrapper, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);
      // показ карточек фильма по нажатию на кнопку показать больше
      this._loadMoreButtonComponent.setClickHandler(() => {
        const prevCards = showingCards;
        showingCards = showingCards + TOTAL_NUMBER_OF_CARDS;

        const sortedFilms = getSortedFilms(films, this._sortingComponent.getSortType(), prevCards, showingCards);

        renderFilmCards(filmListElement, sortedFilms);

        if (showingCards >= films.length) {
          remove(this._loadMoreButtonComponent);
        }
      });
    };

    const container = this._container.getElement();

    const isAllTasksArchived = films.every((film) => film.isArchive);
    const filmWrapper = container.querySelector(`.films-list`);

    if (isAllTasksArchived) {
      render(filmWrapper, this._noFilmCards, RenderPosition.BEFOREEND);
      return;
    }

    // сортировка
    render(container, this._sortingComponent, RenderPosition.BEFOREBEGIN);
    render(filmWrapper, this._filmCardsComponent, RenderPosition.BEFOREEND);

    const filmListElement = container.querySelector(`.films-list .films-list__container`);
    // карточка фильма
    let showingCards = TOTAL_NUMBER_OF_CARDS;
    renderFilmCards(filmListElement, films.slice(0, showingCards));

    renderLoadMoreButton();

    this._sortingComponent.setSortTypeChangeHandler((sortType) => {
      showingCards = TOTAL_NUMBER_OF_CARDS;

      const sortedFilms = getSortedFilms(films, sortType, 0, 5);

      filmListElement.innerHTML = ``;

      renderFilmCards(filmListElement, sortedFilms);
      renderLoadMoreButton();
    });

    const cardTopRatedWrappers = container.querySelectorAll(`.films-list--extra .films-list__container`);
    // Карточки фильма в блоке «Top rated»
    // Карточки фильма в блоке «Most commented»
    for (let i = 0; i < NUMBER_OF_CARDS; i++) {
      render(cardTopRatedWrappers[0], new FilmCardComponent(films[i]), RenderPosition.BEFOREEND);
      render(cardTopRatedWrappers[1], new FilmCardComponent(films[i]), RenderPosition.BEFOREEND);
    }
  }
}
