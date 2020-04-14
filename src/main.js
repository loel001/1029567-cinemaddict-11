import BasicMarkupComponent from "./components/basic-markup";
import SiteProfileComponent from "./components/site-profile";
import FilterComponent from "./components/filter";
import SortingComponent from "./components/sorting";
import FilmCardComponent from "./components/film-card";
import LoadMoreButtonComponent from "./components/load-more-button";
import FilmDetailsComponent from "./components/film-details";
import FilmCardsComponent from "./components/film-cards";
import {generateFilmCards} from "./mock/film-card";
import {render, RenderPosition} from "./utils";

const NUMBER_OF_FILMS = 17;
const TOTAL_NUMBER_OF_CARDS = 5;
const NUMBER_OF_CARDS = 2;

// const basementSite = document.querySelector(`.footer`);

const renderFilmCard = (filmListElement, film) => {
  const replaceFilmCardToDetails = () => {
    filmListElement.replaceChild(filmDetailsComponent.getElement(), filmCardComponent.getElement());
  };

  const replaceDetailsToFilmCard = () => {
    filmListElement.replaceChild(filmCardComponent.getElement(), filmDetailsComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceDetailsToFilmCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const filmCardComponent = new FilmCardComponent(film);
  const filmDetailsComponent = new FilmDetailsComponent(film);

  render(filmListElement, filmCardComponent.getElement(), RenderPosition.BEFOREEND);

  filmCardComponent._element.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    replaceFilmCardToDetails();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const detailsClose = filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`);
  detailsClose.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    replaceDetailsToFilmCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });
};

const renderBasicMarkup = (basicMarkupComponent, films) => {
  const filmWrapper = document.querySelector(`.films-list`);
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
