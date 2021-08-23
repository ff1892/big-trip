import {remove, render, RenderPosition} from '../utils/render.js';
import {updateItem} from '../utils/common.js';
import {MessagesPointsAbsent} from '../utils/components.js';
import {sortPointsByTimeDown, sortPointsByPriceDown} from '../utils/sort-filter.js';
import {SortingType} from '../const.js';


import SortingView from '../view/sorting.js';
import ListView from '../view/list.js';
import PointsAbsentView from '../view/points-absent.js';

import PointPresenter from './point.js';

export default class Trip {
  constructor(container) {
    this._tripEventsSection = container.querySelector('.trip-events');

    this._sortingComponent = new SortingView();
    this._listComponent = new ListView();
    this._pointsAbsentEverything = new PointsAbsentView(MessagesPointsAbsent.EVERYTHING);

    this._handleSortingTypeChange = this._handleSortingTypeChange.bind(this);
    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);

    this._pointPresenter = new Map();
  }

  init(points, offerData, destinationData) {
    this._points = points.slice();
    this._sourcedPoints = points.slice();
    this._offerData = offerData;
    this._destinationData = destinationData;

    this._renderInfo();
  }

  _sortPoints(sortingType) {
    switch(sortingType){
      case SortingType.TIME:
        this._points.sort(sortPointsByTimeDown);
        break;
      case SortingType.PRICE:
        this._points.sort(sortPointsByPriceDown);
        break;
      default:
        this._points = this._sourcedPoints.slice();
    }
  }

  _handleSortingTypeChange(sortingType) {
    this._sortPoints(sortingType);
    this._clearPoints();
    this._renderPoints();
  }

  _handlePointChange(updatedPoint) {
    this._points = updateItem(this._points, updatedPoint);
    this._sourcedPoints = updateItem(this._sourcedPoints, updatedPoint);
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
    this._points.forEach((point) => this._renderPoint(point));
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
    if (!this._points.length) {
      this._renderPointsAbsentEvery();
      return;
    }

    this._renderSorting();
    this._renderPoints();
  }
}
