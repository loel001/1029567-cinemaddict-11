import BoardComponent from "./components/board";
import BoardController from "./controllers/board";
import SiteProfileComponent from "./components/site-profile";
import FilterComponent from "./components/filter";
import FilmCardsModel from "./models/film-cards";
import {generateFilmCards} from "./mock/film-card";
import {render, RenderPosition} from "./utils/render";

const NUMBER_OF_FILMS = 17;
const films = generateFilmCards(NUMBER_OF_FILMS);

const filmCardsModel = new FilmCardsModel();
filmCardsModel.setFilms(films);
const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);

// профайл
render(siteHeader, new SiteProfileComponent(), RenderPosition.BEFOREEND);

// статистика(фильтры)
render(siteMain, new FilterComponent(films), RenderPosition.BEFOREEND);

// основная разметка
const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent, filmCardsModel);
render(siteMain, boardComponent, RenderPosition.BEFOREEND);
boardController.render(films);
