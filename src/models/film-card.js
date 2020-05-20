export default class FilmCard {
  constructor(data) {
    const filmInfo = data[`film_info`];
    const userDetails = data[`user_details`];

    this.id = data[`id`];
    this.comments = [...data[`comments`]];
    this.movieTitle = filmInfo[`title`];
    this.alternativeTitle = filmInfo[`alternative_title`];
    this.rating = filmInfo[`total_rating`];
    this.poster = filmInfo[`poster`];
    this.age = filmInfo[`age_rating`];
    this.director = filmInfo[`director`];
    this.writers = [...filmInfo[`writers`]];
    this.actors = [...filmInfo[`actors`]];
    this.date = new Date(filmInfo[`release`][`date`]);
    this.country = filmInfo[`release`][`release_country`];
    this.duration = filmInfo[`runtime`];
    this.genreNames = [...filmInfo[`genre`]];
    this.currentDescription = filmInfo[`description`] || ``;
    this.isWatchlist = Boolean(userDetails[`watchlist`]);
    this.isHistory = Boolean(userDetails[`already_watched`]);
    this.isFavorite = Boolean(userDetails[`favorite`]);
    this.watchingDate = userDetails[`watching_date`] ? new Date(userDetails[`watching_date`]) : null;
  }

  toRAW() {
    return {
      "id": this.id,
      "comments": [...this.comments],
      "film_info": {
        "title": this.movieTitle,
        "alternative_title": this.alternativeTitle,
        "total_rating": this.rating,
        "poster": this.poster,
        "age_rating": this.age,
        "director": this.director,
        "writers": [...this.writers],
        "actors": [...this.actors],
        "release": {
          "date": this.date.toISOString(),
          "release_country": this.country
        },
        "runtime": this.duration,
        "genre": [...this.genreNames],
        "description": this.duration
      },
      "user_details": {
        "watchlist": this.isWatchlist,
        "already_watched": this.isHistory,
        "watching_date": this.watchingDate ? this.watchingDate.toISOString() : null,
        "favorite": this.isFavorite
      }
    };
  }

  static parseFilmCard(data) {
    return new FilmCard(data);
  }

  static parseFilmCards(data) {
    return data.map(FilmCard.parseFilmCard);
  }

  static clone(data) {
    return new FilmCard(data.toRAW());
  }

  removeComment(id) {
    this.comments = this.comments.filter((it) => it !== id);
  }
}
