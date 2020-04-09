import {createBasicMarkupTemplate} from "./components/basic-markup";
import {createSiteProfileTemplate} from "./components/site-profile";
import {createFilterTemplate} from "./components/filter";
import {createSortingTemplate} from "./components/sorting";
import {createFilmCardTemplate} from "./components/film-card";
import {createLoadMoreButtonTemplate} from "./components/load-more-button";
import {createMovieDetailsFilmTemplate} from "./components/movie-details-film";
import {generateFilters} from "./mock/filter";
import {generateFilmCards} from "./mock/film-card";

const NUMBER_OF_FILMS = 17;
const TOTAL_NUMBER_OF_CARDS = 5;
const NUMBER_OF_CARDS = 2;
const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);
const basementSite = document.querySelector(`.footer`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const filters = generateFilters();
const films = generateFilmCards(NUMBER_OF_FILMS);

// профайл
render(siteHeader, createSiteProfileTemplate(), `beforeend`);

// статистика(фильтры)
render(siteMain, createFilterTemplate(filters), `beforeend`);

// сортировка (фильтры)
render(siteMain, createSortingTemplate(), `beforeend`);

// основная разметка
render(siteMain, createBasicMarkupTemplate(), `beforeend`);

const cardWrapper = document.querySelector(`.films-list .films-list__container`);
// карточка фильма
let showingCards = TOTAL_NUMBER_OF_CARDS;
for (let i = 0; i < showingCards; i++) {
  render(cardWrapper, createFilmCardTemplate(films[i]), `beforeend`);
}

const filmWrapper = document.querySelector(`.films-list`);
// кнопка показать больше
render(filmWrapper, createLoadMoreButtonTemplate(), `beforeend`);

const cardTopRatedWrappers = document.querySelectorAll(`.films-list--extra .films-list__container`);
// Карточки фильма в блоке «Top rated»
// Карточки фильма в блоке «Most commented»
for (let i = 0; i < NUMBER_OF_CARDS; i++) {
  render(cardTopRatedWrappers[0], createFilmCardTemplate(films[i]), `beforeend`);
  render(cardTopRatedWrappers[1], createFilmCardTemplate(films[i]), `beforeend`);
}

// показ карточек фильма по нажатию на кнопку показать больше
const loadMoreButton = siteMain.querySelector(`.films-list__show-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevCards = showingCards;
  showingCards = showingCards + TOTAL_NUMBER_OF_CARDS;

  films.slice(prevCards, showingCards)
    .forEach((film) => render(cardWrapper, createFilmCardTemplate(film), `beforeend`));

  if (showingCards >= films.length) {
    loadMoreButton.remove();
  }
});

// временная вставка попапа
render(basementSite, createMovieDetailsFilmTemplate(films[0]), `afterend`);
