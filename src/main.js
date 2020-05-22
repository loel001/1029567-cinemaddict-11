import API from "./api.js";
import BoardComponent from "./components/board";
import BoardController from "./controllers/board";
import CommentsModel from "./models/comments";
import FilterController from "./controllers/filter.js";
import FilmCardsModel from "./models/film-cards";
import FooterComponent from "./components/footer";
import LoadingComponent from "./components/loading";
import NavigationComponent from "./components/navigation";
import StatisticComponent from "./components/statistic";
import {NavigationItem} from "./const.js";
import {render, remove} from "./utils/render";

const siteMain = document.querySelector(`.main`);
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;
const AUTHORIZATION = `Basic 600g59aaa30303a=`;
const api = new API(END_POINT, AUTHORIZATION);

const filmCardsModel = new FilmCardsModel();

const commentsModel = new CommentsModel();
const models = {filmCardsModel, commentsModel};

const navigationComponent = new NavigationComponent();
render(siteMain, navigationComponent);

const filterController = new FilterController(navigationComponent, filmCardsModel);
filterController.render();

const loadingComponent = new LoadingComponent();
render(siteMain, loadingComponent);


const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent, models, api);

const siteFooter = document.querySelector(`.footer__statistics`);

api.getFilms()
  .then((films) => {
    filmCardsModel.setFilms(films);
    render(siteFooter, new FooterComponent(films));
    return Promise.all(filmCardsModel.getFilmsAll().map((film) => api.getComments(film)));
  })
  .then((comments) => {
    commentsModel.setComments(comments);
  })
  .finally(() => {
    remove(loadingComponent);
    render(siteMain, boardComponent);
    boardController.render();
    const statisticComponent = new StatisticComponent(filmCardsModel);
    render(siteMain, statisticComponent);
    statisticComponent.hide();

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
  });
