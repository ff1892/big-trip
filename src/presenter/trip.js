import {remove, render, RenderPosition} from '../utils/render.js';
import {MessagesNoPoints} from '../utils/components.js';
import {filter} from '../utils/sort-filter.js';
import {sortPointsByTimeDown, sortPointsByPriceDown, sortPointsByDayUp} from '../utils/sort-filter.js';
import {SortingType, UserAction, UpdateType, FilterType} from '../const.js';
import {POINT_BLANK} from '../const.js';
import PointNewPresenter from './point-new.js';


import SortingView from '../view/sorting.js';
import ListView from '../view/list.js';
import NoPointsView from '../view/points-absent.js';

import PointPresenter from './point.js';

export default class Trip {
  constructor(container, pointsModel, filterModel) {
    this._tripEventsSection = container.querySelector('.trip-events');
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;

    this._currentSortingType = SortingType.DEFAULT;

    this._listComponent = new ListView();

    this._sortingComponent = null;
    this._noPointsComponent = null;
    this._filerType = FilterType.EVERYTHING;

    this._handleSortingTypeChange = this._handleSortingTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);

    this._pointNewPresenter = new PointNewPresenter(this._listComponent, this._handleViewAction);
    this._pointPresenter = new Map();
  }

  init(offerData, destinationData) {
    this._offerData = offerData;
    this._destinationData = destinationData;

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderBoard();
  }

  destroy(){
    this._clearBoard({resetSortingType: true});

    this._pointsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createPoint(callback) {
    this._currentSortingType = SortingType.DEFAULT;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    if (!this._getPoints().length) {
      remove(this._noPointsComponent);
      render(this._tripEventsSection, this._listComponent, RenderPosition.BEFOREEND);
    }
    this._pointNewPresenter.init(POINT_BLANK, this._offerData, this._destinationData, callback);
  }

  _getPoints() {
    this._filerType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filteredPoints = filter[this._filerType](points);

    switch(this._currentSortingType) {
      case SortingType.TIME:
        return filteredPoints.sort(sortPointsByTimeDown);
      case SortingType.PRICE:
        return filteredPoints.sort(sortPointsByPriceDown);
      default:
        return filteredPoints.sort(sortPointsByDayUp);
    }
  }

  _handleViewAction(actionType, updateType, update) {
    switch(actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch(updateType) {
      case UpdateType.PATCH:
        this._pointPresenter.get(data.id).init(data, this._offerData, this._destinationData);
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetSortingType: true});
        this._renderBoard();
        break;
    }
  }

  _renderBoard() {
    if (!this._getPoints().length) {
      this._renderNoPoints();
      return;
    }

    this._renderSorting();
    this._renderPoints();
  }

  _clearBoard({resetSortingType = false} = {}) {
    this._clearPoints();
    remove(this._sortingComponent);
    remove(this._noPointsComponent);
    this._pointNewPresenter.destroy();

    if (resetSortingType) {
      this._currentSortingType = SortingType.DEFAULT;
    }
  }

  _handleSortingTypeChange(sortingType) {
    this._currentSortingType = sortingType;
    this._clearPoints();
    this._renderPoints();
  }

  _handleModeChange() {
    this._pointNewPresenter.destroy();
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  _renderSorting() {
    if (this._sortingComponent !== null) {
      this._sortingComponent = null;
    }

    this._sortingComponent = new SortingView(this._currentSortingType);
    this._sortingComponent.setSortingTypeChangeHandler(this._handleSortingTypeChange);
    render(this._tripEventsSection, this._sortingComponent, RenderPosition.BEFOREEND);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._listComponent, this._handleViewAction, this._handleModeChange);
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

  _renderNoPoints() {
    if (this._noPointsComponent !== null) {
      this._noPointsComponent = null;
    }
    this._noPointsComponent = new NoPointsView(MessagesNoPoints[this._filerType]);
    render(this._tripEventsSection, this._noPointsComponent, RenderPosition.BEFOREEND);
  }
}
