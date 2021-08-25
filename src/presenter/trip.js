import {remove, render, RenderPosition} from '../utils/render.js';
import {MessagesPointsAbsent} from '../utils/components.js';
import {sortPointsByTimeDown, sortPointsByPriceDown, sortPointsByDayUp} from '../utils/sort-filter.js';
import {SortingType} from '../const.js';


import SortingView from '../view/sorting.js';
import ListView from '../view/list.js';
import PointsAbsentView from '../view/points-absent.js';

import PointPresenter from './point.js';

export default class Trip {
  constructor(container, pointsModel) {
    this._tripEventsSection = container.querySelector('.trip-events');
    this._pointsModel = pointsModel;

    this._sortingComponent = new SortingView();
    this._listComponent = new ListView();
    this._pointsAbsentEverything = new PointsAbsentView(MessagesPointsAbsent.EVERYTHING);

    this._handleSortingTypeChange = this._handleSortingTypeChange.bind(this);
    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);

    this._pointPresenter = new Map();
  }

  init(offerData, destinationData) {
    this._offerData = offerData;
    this._destinationData = destinationData;

    this._renderInfo();
  }

  _getPoints() {
    switch(this._currentSortingType) {
      case SortingType.TIME:
        return this._pointsModel.getPoints().slice().sort(sortPointsByTimeDown);
      case SortingType.PRICE:
        return this._pointsModel.getPoints().slice().sort(sortPointsByPriceDown);
      default:
        return this._pointsModel.getPoints().slice().sort(sortPointsByDayUp);
    }
  }

  _handleSortingTypeChange(sortingType) {
    this._currentSortingType = sortingType;
    this._clearPoints();
    this._renderPoints();
  }

  _handlePointChange(updatedPoint) {
    this._pointPresenter.get(updatedPoint.id).init(updatedPoint, this._offerData, this._destinationData);
  }

  _handleModeChange() {
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  _renderSorting() {
    render(this._tripEventsSection, this._sortingComponent, RenderPosition.BEFOREEND);
    this._sortingComponent.setSortingTypeChangeHandler(this._handleSortingTypeChange);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._listComponent, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point, this._offerData, this._destinationData);
    this._pointPresenter.set(point.id, pointPresenter);
  }

  _renderPoints() {
    render(this._tripEventsSection, this._listComponent, RenderPosition.BEFOREEND);
    this._getPoints().forEach((point) => this._renderPoint(point));
  }

  _clearPoints() {
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();
    remove(this._listComponent);
  }

  _renderPointsAbsentEvery() {
    render(this._tripEventsSection, this._pointsAbsentEverything, RenderPosition.BEFOREEND);
  }

  _renderInfo() {
    if (!this._getPoints().length) {
      this._renderPointsAbsentEvery();
      return;
    }

    this._renderSorting();
    this._renderPoints();
  }
}
