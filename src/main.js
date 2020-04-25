import BasicMarkupComponent from "./components/basic-markup";
import BasicMarkupController from "./controllers/basic-markup";
import SiteProfileComponent from "./components/site-profile";
import FilterComponent from "./components/filter";
import {generateFilmCards} from "./mock/film-card";
import {render, RenderPosition} from "./utils/render";

const NUMBER_OF_FILMS = 7;
const films = generateFilmCards(NUMBER_OF_FILMS);
const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);

// профайл
render(siteHeader, new SiteProfileComponent(), RenderPosition.BEFOREEND);

// статистика(фильтры)
render(siteMain, new FilterComponent(films), RenderPosition.BEFOREEND);

// основная разметка
const basicMarkupComponent = new BasicMarkupComponent();
const basicMarkupController = new BasicMarkupController(basicMarkupComponent);
render(siteMain, basicMarkupComponent, RenderPosition.BEFOREEND);
basicMarkupController.render(films);
