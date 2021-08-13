import {render, RenderPosition, replace} from '../utils/util-render.js';

import PointView from '../view/point.js';
import PointEditView from '../view/point-edit.js';

export default class Point {
  constructor(listContainer) {
    this._listContainer = listContainer;

    this._pointComponent = null;
    this._pointEditComponent = null;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(point) {
    this._point = point;

    this._pointComponent = new PointView(point);
    this._pointEditComponent = new PointEditView(point);

    render(this._listContainer, this._pointComponent, RenderPosition.BEFOREEND);
  }

  _escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceFormToPoint();
    }
  };

  _replacePointToForm() {
    replace(this._pointEditComponent, this._pointComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _replaceFormToPoint() {
    replace(this._pointComponent, this._pointEditComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }



}
