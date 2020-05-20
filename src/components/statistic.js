import AbstractSmartComponent from "./abstract-smart-component";
import {isSelectedType, getDuration} from "../utils/common";
import {StatisticFilterType, StatisticFilterTypes} from "../const";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const BAR_HEIGHT = 50;

const getCurrentType = (filterType) => {
  switch (filterType) {
    case StatisticFilterType.TODAY:
      return `days`;
    case StatisticFilterType.WEEK:
      return `weeks`;
    case StatisticFilterType.MONTH:
      return `months`;
    case StatisticFilterType.YEAR:
      return `years`;
    default:
      return null;
  }
};

const getWatchedStatistic = (films, filterType) => {
  const watchedFilms = films.filter((film) => {
    return film.isHistory && isSelectedType(film.watchingDate, new Date(), getCurrentType(filterType));
  });

  const totalDuration = watchedFilms.reduce((fundedDuration, film) => {
    return fundedDuration + film.duration;
  }, 0);

  const genres = watchedFilms.reduce((fundedDuration, film) => {
    film.genreNames.forEach((genre) => {
      if (!fundedDuration[genre]) {
        fundedDuration[genre] = 0;
      }
      fundedDuration[genre]++;
    });
    return fundedDuration;
  }, {});

  const sortedGenres = Object.entries(genres).sort((a, b) => b[1] - a[1]);

  return {watchedCount: watchedFilms.length, totalDuration, genres: sortedGenres};
};

const getGenres = (genres, idx) => {
  return Object.values(genres).map((value) => value[idx]);
};

const getNewStr = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const renderChart = (statisticCtx, genres) => {
  if (genres.length === 0) {
    return null;
  }

  statisticCtx.height = BAR_HEIGHT * genres.length;

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: getGenres(genres, 0),
      datasets: [{
        data: getGenres(genres, 1),
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`,
        barThickness: 20
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

const createTypeFilterMarkup = (type, currentType) => {
  const typeName = getNewStr(type).replace(`-`, ` `);
  return (
    `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${type}" value="${type}" ${type === currentType ? `checked` : ``}>
    <label for="statistic-${type}" class="statistic__filters-label">${typeName}</label>`
  );
};

const createStatisticsTemplate = (statistic, currentType) => {
  const {watchedCount, totalDuration, genres} = statistic;
  const durationFilm = getDuration(totalDuration);
  let topGenre = ``;
  if (genres.length > 0) {
    topGenre = genres[0][0];
  }

  const filterTypesMarkup = StatisticFilterTypes.map((type) => createTypeFilterMarkup(type, currentType)).join(`\n`);

  // const userName = document.querySelector(`.profile__rating`).textContent;

  return (
    `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${1}</span>
      </p>
      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>
        ${filterTypesMarkup}
      </form>
      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${watchedCount} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${durationFilm.hours()} <span class="statistic__item-description">h</span> ${durationFilm.minutes()} <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${topGenre}</p>
        </li>
      </ul>
      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>
    </section>`
  );
};

export default class Statistic extends AbstractSmartComponent {
  constructor(model) {
    super();
    this._model = model;
    this._currentType = StatisticFilterType.ALL_TIME;
    this._chart = null;
    this._statistic = {watchedCount: 0, time: 0, genres: []};

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createStatisticsTemplate(this._statistic, this._currentType);
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  rerender() {
    this._statistic = getWatchedStatistic(this._model.getFilmsAll(), this._currentType);
    super.rerender();
    this._renderChart();
  }

  show() {
    super.show();
    this.rerender();
  }

  _renderChart() {
    const ctx = this.getElement().querySelector(`.statistic__chart`);
    this._resetChart();
    this._chart = renderChart(ctx, this._statistic.genres);
  }

  _resetChart() {
    if (this._chart) {
      this._chart.destroy();
      this._chart = null;
    }
  }

  _subscribeOnEvents() {
    this.getElement().querySelector(`.statistic__filters`)
      .addEventListener(`change`, (evt) => {
        this._currentType = evt.target.value;
        this.rerender();
      });
  }
}
