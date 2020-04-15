import BasicMarkupComponent from "./components/basic-markup";
import SiteProfileComponent from "./components/site-profile";
import FilterComponent from "./components/filter";
import SortingComponent from "./components/sorting";
import FilmCardComponent from "./components/film-card";
import LoadMoreButtonComponent from "./components/load-more-button";
import FilmDetailsComponent from "./components/film-details";
import FilmCardsComponent from "./components/film-cards";
import NoFilmCards from "./components/no-film-cards";
import {generateFilmCards} from "./mock/film-card";
import {render, RenderPosition} from "./utils";

const NUMBER_OF_FILMS = 17;
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

  const onHandlerClick = (element) => {
    element.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      bodySite.appendChild(filmDetailsComponent.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });
  };

  const filmCardComponent = new FilmCardComponent(film);
  const filmDetailsComponent = new FilmDetailsComponent(film);

  render(filmListElement, filmCardComponent.getElement(), RenderPosition.BEFOREEND);

  const poster = filmCardComponent.getElement().querySelector(`.film-card__poster`);
  const name = filmCardComponent.getElement().querySelector(`.film-card__title`);
  const comment = filmCardComponent.getElement().querySelector(`.film-card__comments`);

  onHandlerClick(poster);
  onHandlerClick(name);
  onHandlerClick(comment);

  const detailsClose = filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`);
  detailsClose.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    bodySite.removeChild(filmDetailsComponent.getElement());
    document.removeEventListener(`keydown`, onEscKeyDown);
  });
};

const renderBasicMarkup = (basicMarkupComponent, films) => {
  const isAllTasksArchived = films.every((film) => film.isArchive);
  const filmWrapper = document.querySelector(`.films-list`);

  if (isAllTasksArchived) {
    render(filmWrapper, new NoFilmCards().getElement(), RenderPosition.BEFOREEND);
    return;
  }

  render(filmWrapper, new FilmCardsComponent().getElement(), RenderPosition.BEFOREEND);

  const filmListElement = basicMarkupComponent.getElement().querySelector(`.films-list .films-list__container`);
  // карточка фильма
  let showingCards = TOTAL_NUMBER_OF_CARDS;
  films.slice(0, showingCards)
    .forEach((film) => {
      renderFilmCard(filmListElement, film);
    });

  // кнопка показать больше
  const loadMoreButtonComponent = new LoadMoreButtonComponent();
  render(filmWrapper, loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  // показ карточек фильма по нажатию на кнопку показать больше
  loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
    const prevCards = showingCards;
    showingCards = showingCards + TOTAL_NUMBER_OF_CARDS;

    films.slice(prevCards, showingCards)
      .forEach((film) => {
        renderFilmCard(filmListElement, film);
      });

    if (showingCards >= films.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });

  const cardTopRatedWrappers = document.querySelectorAll(`.films-list--extra .films-list__container`);
  // Карточки фильма в блоке «Top rated»
  // Карточки фильма в блоке «Most commented»
  for (let i = 0; i < NUMBER_OF_CARDS; i++) {
    render(cardTopRatedWrappers[0], new FilmCardComponent(films[i]).getElement(), RenderPosition.BEFOREEND);
    render(cardTopRatedWrappers[1], new FilmCardComponent(films[i]).getElement(), RenderPosition.BEFOREEND);
  }
};

const films = generateFilmCards(NUMBER_OF_FILMS);
const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);

// профайл
render(siteHeader, new SiteProfileComponent().getElement(), RenderPosition.BEFOREEND);

// статистика(фильтры)
render(siteMain, new FilterComponent(films).getElement(), RenderPosition.BEFOREEND);

// сортировка
render(siteMain, new SortingComponent().getElement(), RenderPosition.BEFOREEND);

// основная разметка
const basicMarkupComponent = new BasicMarkupComponent();
render(siteMain, basicMarkupComponent.getElement(), RenderPosition.BEFOREEND);
renderBasicMarkup(basicMarkupComponent, films);
