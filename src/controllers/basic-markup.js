import FilmCardComponent from "../components/film-card";
import FilmDetailsComponent from "../components/film-details";
import {remove, render, RenderPosition} from "../utils/render";
import NoFilmCards from "../components/no-film-cards";
import FilmCardsComponent from "../components/film-cards";
import LoadMoreButtonComponent from "../components/load-more-button";

const TOTAL_NUMBER_OF_CARDS = 5;
const NUMBER_OF_CARDS = 2;

const renderFilmCard = (filmListElement, film) => {
  const bodySite = document.querySelector(`body`);
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      bodySite.removeChild(filmDetailsComponent.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const filmCardComponent = new FilmCardComponent(film);
  const filmDetailsComponent = new FilmDetailsComponent(film);

  render(filmListElement, filmCardComponent, RenderPosition.BEFOREEND);

  filmCardComponent.setEditButtonsClickHandler(() => {
    bodySite.appendChild(filmDetailsComponent.getElement());
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  filmDetailsComponent.setEditButtonClickHandler(() => {
    bodySite.removeChild(filmDetailsComponent.getElement());
    document.removeEventListener(`keydown`, onEscKeyDown);
  });
};

export default class BasicMarkupController {
  constructor(container) {
    this._container = container;

    this._noFilmCards = new NoFilmCards();
    this._filmCardsComponent = new FilmCardsComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
  }

  render(films) {
    const container = this._container.getElement();

    const isAllTasksArchived = films.every((film) => film.isArchive);
    const filmWrapper = container.querySelector(`.films-list`);

    if (isAllTasksArchived) {
      render(filmWrapper, this._noFilmCards, RenderPosition.BEFOREEND);
      return;
    }

    render(filmWrapper, this._filmCardsComponent, RenderPosition.BEFOREEND);

    const filmListElement = container.querySelector(`.films-list .films-list__container`);
    // карточка фильма
    let showingCards = TOTAL_NUMBER_OF_CARDS;
    films.slice(0, showingCards)
      .forEach((film) => {
        renderFilmCard(filmListElement, film);
      });

    // кнопка показать больше
    render(filmWrapper, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

    // показ карточек фильма по нажатию на кнопку показать больше
    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevCards = showingCards;
      showingCards = showingCards + TOTAL_NUMBER_OF_CARDS;

      films.slice(prevCards, showingCards)
        .forEach((film) => {
          renderFilmCard(filmListElement, film);
        });

      if (showingCards >= films.length) {
        remove(this._loadMoreButtonComponent);
      }
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
