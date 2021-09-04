import {remove, render, RenderPosition, replace} from '../utils/render.js';
import {UserAction, UpdateType} from '../const.js';

import PointView from '../view/point.js';
import PointEditView from '../view/point-edit.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class Point {
  constructor(listComponent, changeData, changeMode, offersModel, destinationsModel) {
    this._listComponent = listComponent;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;

    this._pointComponent = null;
    this._pointEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handlePointEditClick = this._handlePointEditClick.bind(this);
    this._handleFormEditClick = this._handleFormEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormDelete = this._handleFormDelete.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(point) {
    this._point = point;

    const prevPointComponent = this._pointComponent;
    const prevPointEditComponent = this._pointEditComponent;

    this._pointComponent = new PointView(point);
    this._pointEditComponent = new PointEditView(point, this._offersModel, this._destinationsModel, false);

    this._pointComponent.setEditClickHandler(this._handlePointEditClick);
    this._pointComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._pointEditComponent.setEditClickHandler(this._handleFormEditClick);
    this._pointEditComponent.setSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setDeleteClickHandler(this._handleFormDelete);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this._listComponent, this._pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToPoint();
    }
  }

  _replacePointToForm() {
    replace(this._pointEditComponent, this._pointComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToPoint() {
    replace(this._pointComponent, this._pointEditComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._pointEditComponent.reset(this._point);
      this._replaceFormToPoint();
    }
  }

  _handlePointEditClick() {
    this._replacePointToForm();
  }

  _handleFormEditClick() {
    this._pointEditComponent.reset(this._point);
    this._replaceFormToPoint();
  }

  _handleFormSubmit(point) {
    this._changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      point,
    );
    this._replaceFormToPoint();
  }

  _handleFormDelete(point) {
    this._changeData(
      UserAction.DELETE_POINT,
      UpdateType.MAJOR,
      point,
    );
  }

  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._point,
        {
          isFavorite: !this._point.isFavorite,
        },
      ),
    );
  }
}
