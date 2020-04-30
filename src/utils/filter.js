import {FilterType} from "../const.js";

export const getWatchlistFilms = (films) => {
  return films.filter((film) => film.isWatchlist);
};

export const getHistoryFilms = (films) => {
  return films.filter((film) => film.isHistory);
};

export const getFavoriteFilms = (films) => {
  return films.filter((film) => film.isFavorite);
};

export const getFilmsByFilter = (films, filterType) => {

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
