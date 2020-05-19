import API from "./api.js";
import BoardComponent from "./components/board";
import BoardController from "./controllers/board";
import CommentsModel from "./models/comments";
import FilterController from "./controllers/filter.js";
import FilmCardsModel from "./models/film-cards";
import FooterComponent from "./components/footer";
import NavigationComponent from "./components/navigation";
import StatisticComponent from "./components/statistic";
import {NavigationItem} from "./const.js";
import {render} from "./utils/render";

const siteMain = document.querySelector(`.main`);
const AUTHORIZATION = `Basic ko0w110ik55555k`;
const api = new API(AUTHORIZATION);

// фильмы
const filmCardsModel = new FilmCardsModel();

// комментарии
const commentsModel = new CommentsModel();
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

api.getFilms()
  .then((films) => {
    filmCardsModel.setFilms(films);
    // boardController.render();
  })
  .then((comments) => {
    commentsModel.setComments(comments);
    // boardController.render();
  });
