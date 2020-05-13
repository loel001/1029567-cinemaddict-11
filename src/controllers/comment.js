import {render} from "../utils/render.js";
import CommentComponent from "../components/comment";

export default class CommentController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
  }

  render(comment) {
    this._commentComponent = new CommentComponent(comment);
    this._commentComponent.setDeleteButtonClickHandler(() => this._onDataChange(comment, null));

    const containerElement = this._container.getCommentsListElement();
    render(containerElement, this._commentComponent);
  }
}
