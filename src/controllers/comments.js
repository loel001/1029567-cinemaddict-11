import {render} from "../utils/render.js";
import CommentsComponent from "../components/comments";
import CommentController from "../controllers/comment";


export default class CommentsController {
  constructor(container, commentsModel, onDataChange) {
    this._container = container;
    this._commentsModel = commentsModel;
    this._onDataChange = onDataChange;

    this._commentsComponent = null;

    this._onCommentDataChange = this._onCommentDataChange.bind(this);
  }

  render() {
    this._commentsComponent = new CommentsComponent(this._container.film);

    this._commentsComponent.setCtrlEnterKeyDownHandler((evt) => {
      if ((evt.key === `Enter`) && (evt.ctrlKey || evt.metaKey)) {
        this._onCommentDataChange(null, this._container.getData());
      }
    });
    render(this._container.getCommentsElement(), this._commentsComponent);
    this._renderComments();
  }

  _renderComments() {
    const film = this._container.film;
    this._commentsModel.getComments(film).map((comment) => {
      new CommentController(this._commentsComponent, this._onCommentDataChange).render(comment);
    });
  }

  _onCommentDataChange(oldData, newData) {
    const film = this._container.film;
    if (newData === null) {
      if (!this._commentsModel.removeComment(oldData.id)) {
        return;
      }
    } else if (oldData === null) {
      this._commentsModel.addComment(Object.assign(newData, {filmId: film.id}));
    } else {
      return;
    }

    this._onDataChange(film, Object.assign({}, film, {commentsCount: this._commentsModel.getComments(film).length}));
  }
}
