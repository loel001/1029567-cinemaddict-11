import BoardComponent from "./components/board";
import BoardController from "./controllers/board";
import FilterController from "./controllers/filter.js";
import FilmCardsModel from "./models/film-cards";
import FooterComponent from "./components/footer";
import {generateFilmCards} from "./mock/film-card";
import {render, RenderPosition} from "./utils/render";

const NUMBER_OF_FILMS = 17;
const films = generateFilmCards(NUMBER_OF_FILMS);

const filmCardsModel = new FilmCardsModel();
filmCardsModel.setFilms(films);
const siteMain = document.querySelector(`.main`);

// статистика(фильтры)
const filterController = new FilterController(siteMain, filmCardsModel);
filterController.render();

// основная разметка
const boardComponent = new BoardComponent(films);
const boardController = new BoardController(boardComponent, filmCardsModel);
render(siteMain, boardComponent, RenderPosition.BEFOREEND);
boardController.render(films);


const siteFooter = document.querySelector(`.footer__statistics`);
render(siteFooter, new FooterComponent(films), RenderPosition.BEFOREEND);
