import BoardComponent from "./components/board";
import BoardController from "./controllers/board";
import FilterController from "./controllers/filter.js";
import FilmCardsModel from "./models/film-cards";
import CommentsModel from "./models/comments";
import FooterComponent from "./components/footer";
import {generateFilmCards} from "./mock/film-card";
import {render, RenderPosition} from "./utils/render";

const siteMain = document.querySelector(`.main`);

const NUMBER_OF_FILMS = 17;
const films = generateFilmCards(NUMBER_OF_FILMS);

// фильмы
const filmCardsModel = new FilmCardsModel();
filmCardsModel.setFilms(films);

// комментарии
const commentsModel = new CommentsModel();
commentsModel.setComments(films);
const models = {filmCardsModel, commentsModel};

// фильтры
const filterController = new FilterController(siteMain, filmCardsModel);
// const filterController = new FilterController(siteMain, models);
filterController.render();

// основная разметка
const boardComponent = new BoardComponent(films);
const boardController = new BoardController(boardComponent, models);
render(siteMain, boardComponent, RenderPosition.BEFOREEND);
boardController.render(films);

// Подвал сайта
const siteFooter = document.querySelector(`.footer__statistics`);
render(siteFooter, new FooterComponent(films), RenderPosition.BEFOREEND);
