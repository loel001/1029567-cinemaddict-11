export default class Comments {
  constructor() {
    this._comments = [];

    this._dataChangeHandlers = [];
  }

  setComments(comments) {
    this._comments = this._comments.concat(...comments);
  }

  getComments(film) {
    return this._comments.filter((comment) => comment.filmId === film.id);
  }

  removeComment(id) {
    const index = this._comments.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._comments = [].concat(this._comments.slice(0, index), this._comments.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  updateComments(comments, filmId) {
    this._comments = this._comments.filter((comment) => comment.filmId !== filmId);
    this._comments = [].concat(this._comments, comments);
    this._callHandlers(this._dataChangeHandlers);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
