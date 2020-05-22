import {FilterType} from "../const.js";

const getWatchlistFilms = (films) => {
  return films.filter((film) => film.isWatchlist);
};

const getHistoryFilms = (films) => {
  return films.filter((film) => film.isHistory);
};

const getFavoriteFilms = (films) => {
  return films.filter((film) => film.isFavorite);
};

const getFilmsByFilter = (films, filterType) => {

  switch (filterType) {
    case FilterType.ALL:
      return films;
    case FilterType.WATCHLIST:
      return getWatchlistFilms(films);
    case FilterType.HISTORY:
      return getHistoryFilms(films);
    case FilterType.FAVORITES:
      return getFavoriteFilms(films);
  }

  return films;
};

export {getWatchlistFilms, getHistoryFilms, getFavoriteFilms, getFilmsByFilter};
