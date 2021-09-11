import PointEditView from '../view/point-edit.js';
import {remove, render, RenderPosition} from '../utils/render.js';
import {isEscapeEvent} from '../utils/common.js';
import {UserAction, UpdateType} from '../const.js';

export default class PointNew {
  constructor(listContainer, changeData, point, offersModel, destinationsModel) {
    this._listContainer = listContainer;
    this._changeData = changeData;
    this._point = point;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this._buttonNewPoint = document.querySelector('.trip-main__event-add-btn');

    this._pointEditComponent = null;
    this._resetCallback = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(callback) {
    if (this._pointEditComponent !== null) {
      return;
    }

    this._resetCallback = callback;
    this._buttonNewPoint.disabled = true;
    this._pointEditComponent = new PointEditView(this._point, this._offersModel, this._destinationsModel, true);
    this._pointEditComponent.setSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setDeleteClickHandler(this._handleCloseClick);

    render(this._listContainer, this._pointEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this._escKeyDownHandler);

    if (this._resetCallback !== null) {
      this._resetCallback;
    }
  }

  destroy() {
    if (this._pointEditComponent === null) {
      return;
    }

    remove(this._pointEditComponent);
    this._pointEditComponent = null;
    this._buttonNewPoint.disabled = false;
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  setSaving() {
    this._pointEditComponent.updateData({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._pointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this._pointEditComponent.shake(resetFormState);
  }

  _handleFormSubmit(point) {
    this._changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
  }

  _handleCloseClick(){
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (isEscapeEvent(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
