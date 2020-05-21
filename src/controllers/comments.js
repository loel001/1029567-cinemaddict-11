import {render} from "../utils/render.js";
import CommentsComponent from "../components/comments";
import CommentController from "../controllers/comment";
import CommentModel from "../models/comment";
import FilmCardModel from "../models/film-card";

const parseFormData = (formData) => {
  return new CommentModel({
    "id": null,
    "author": null,
    "comment": formData.get(`comment`),
    "emotion": formData.get(`comment-emoji`),
    "date": new Date().toISOString(),
  }, null);
};

export default class CommentsController {
  constructor(container, api, commentsModel, onDataChange) {
    this._container = container;
    this._api = api;
    this._commentsModel = commentsModel;
    this._onDataChange = onDataChange;

    this._commentsComponent = null;

    this._onCommentDataChange = this._onCommentDataChange.bind(this);
  }

  render() {
    this._commentsComponent = new CommentsComponent(this._container.film);

    this._commentsComponent.setCtrlEnterKeyDownHandler((evt) => {
      if ((evt.key === `Enter`) && (evt.ctrlKey || evt.metaKey)) {
        const commentModel = parseFormData(this._container.getData());
        this._onCommentDataChange(this, null, commentModel);
      }
    });
    render(this._container.getCommentsElement(), this._commentsComponent);
    this._renderComments();
  }

  _renderComments() {
    const film = this._container.film;
    console.log(film);
    console.log(this._commentsModel);
    this._commentsModel.getComments(film).forEach((comment) => {
      new CommentController(this._commentsComponent, this._onCommentDataChange).render(comment);
    });
  }

  _onCommentDataChange(oldData, newData) {
    const film = this._container.film;
    const newFilmCard = FilmCardModel.clone(film);
    if (newData === null) {
      this._api.deleteComment(oldData.id)
        .then(() => {
          if (this._commentsModel.removeComment(oldData.id)) {
            newFilmCard.removeComment(oldData.id);
            this._onDataChange(film, newFilmCard);
          }
        });
    } else if (oldData === null) {
      this._api.createComment(newData, film.id)
        .then((result) => {
          this._commentsModel.updateComments(result.models, film.id);
          newFilmCard.comments = result.ids;
          this._onDataChange(film, newFilmCard);
        });
    }
  }
}
