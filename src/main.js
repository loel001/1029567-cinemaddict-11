import BoardComponent from "./components/board";
import BoardController from "./controllers/board";
import FilterController from "./controllers/filter.js";
import FilmCardsModel from "./models/film-cards";
import CommentsModel from "./models/comments";
import FooterComponent from "./components/footer";
import StatisticComponent from "./components/statistic";
import {generateFilmCards} from "./mock/film-card";
import {render} from "./utils/render";
import {NavigationItem} from "./const.js";
import NavigationComponent from "./components/navigation";

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

const navigationComponent = new NavigationComponent();
render(siteMain, navigationComponent);

// фильтры
const filterController = new FilterController(navigationComponent, filmCardsModel);
filterController.render();

// основная разметка
const boardComponent = new BoardComponent(films);
const boardController = new BoardController(boardComponent, models);
render(siteMain, boardComponent);
boardController.render(films);

// подвал
const siteFooter = document.querySelector(`.footer__statistics`);
render(siteFooter, new FooterComponent(films));

// статистика
const statisticComponent = new StatisticComponent(filmCardsModel);
render(siteMain, statisticComponent);
statisticComponent.hide();

// переключения
navigationComponent.setClickHandler((item) => {
  if (item === NavigationItem.FILTER) {
    boardController.show();
    boardController.resetSortType();
    statisticComponent.hide();
  } else {
    boardController.hide();
    statisticComponent.show();
  }
});
