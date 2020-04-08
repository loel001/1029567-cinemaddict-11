import {createBasicMarkupTemplate} from "./components/basic-markup";
import {createSiteProfileTemplate} from "./components/site-profile";
import {createStatisticsTemplate} from "./components/statistics";
import {createSortingTemplate} from "./components/sorting";
import {createFilmCardTemplate} from "./components/film-card";
import {createLoadMoreButtonTemplate} from "./components/load-more-button";
import {createTopRatedFilmCardTemplate} from "./components/top-rated-film-card";
import {createMostCommentedFilmCardTemplate} from "./components/most-commented-film-card";
import {createMovieDetailsFilmTemplate} from "./components/movie-details-film";

const TOTAL_NUMBER_OF_CARDS = 5;
const NUMBER_OF_CARDS = 2;
const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);
const basementSite = document.querySelector(`.footer`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// профайл
render(siteHeader, createSiteProfileTemplate(), `beforeend`);

// статистика
render(siteMain, createStatisticsTemplate(), `beforeend`);

// сортировка (фильтры)
render(siteMain, createSortingTemplate(), `beforeend`);

// основная разметка
render(siteMain, createBasicMarkupTemplate(), `beforeend`);

const cardWrapper = document.querySelector(`.films-list .films-list__container`);
// карточка фильма
for (let i = 0; i < TOTAL_NUMBER_OF_CARDS; i++) {
  render(cardWrapper, createFilmCardTemplate(), `beforeend`);
}

const filmWrapper = document.querySelector(`.films-list`);
// кнопка показать больше
render(filmWrapper, createLoadMoreButtonTemplate(), `beforeend`);

const cardTopRatedWrappers = document.querySelectorAll(`.films-list--extra .films-list__container`);
// Карточки фильма в блоке «Top rated»
// Карточки фильма в блоке «Most commented»
for (let i = 0; i < NUMBER_OF_CARDS; i++) {
  render(cardTopRatedWrappers[0], createTopRatedFilmCardTemplate(), `beforeend`);
  render(cardTopRatedWrappers[1], createMostCommentedFilmCardTemplate(), `beforeend`);
}

// временная вставка попапа---
render(basementSite, createMovieDetailsFilmTemplate(), `afterend`);
