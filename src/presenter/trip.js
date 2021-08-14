import {remove, render, RenderPosition} from '../utils/util-render.js';
import {updateItem} from '../utils/util-common.js';
import {MessagesPointsAbsent} from '../utils/util-components.js';

import TripInfoView from '../view/trip-info.js';
import TotalCostView from '../view/total-cost.js';
import RouteView from '../view/route.js';
import MenuView from '../view/menu.js';
import FilterView from '../view/filters.js';
import SortingView from '../view/sorting.js';
import ListView from '../view/list.js';
import PointsAbsentView from '../view/points-absent.js';

import PointPresenter from './point.js';

export default class Trip {
  constructor(page) {

    this._mainTrip = page.querySelector('.trip-main');
    this._tripMenu = this._mainTrip.querySelector('.trip-controls__navigation');
    this._tripFilters = this._mainTrip.querySelector('.trip-controls__filters');
    this._tripEventsSection = page.querySelector('.trip-events');

    this._tripInfoComponent = new TripInfoView();
    this._listComponent = new ListView();
    this._pointsAbsentEverything = new PointsAbsentView(MessagesPointsAbsent.EVERYTHING);

    this._handlePointChange = this._handlePointChange.bind(this);

    this._pointPresenter = new Map();
  }

  init(points) {
    this._points = points.slice();

    render(this._tripMenu, new MenuView(), RenderPosition.BEFOREEND);
    render(this._tripFilters, new FilterView(), RenderPosition.BEFOREEND);
    this._renderInfo();
  }

  _handlePointChange(updatedPoint) {
    this._points = updateItem(this._points, updatedPoint);
    this._pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  _renderRoute() {
    render(this._tripInfoComponent, new RouteView(), RenderPosition.BEFOREEND);
  }

  _renderTotalCost() {
    render(this._tripInfoComponent, new TotalCostView(), RenderPosition.BEFOREEND);
  }

  _renderTripInfo() {
    render(this._mainTrip, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
    this._renderRoute();
    this._renderTotalCost();
  }

  _renderSorting() {
    render(this._tripEventsSection, new SortingView(), RenderPosition.BEFOREEND);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._listComponent, this._handlePointChange);
    pointPresenter.init(point);
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

    this._renderTripInfo();
    this._renderSorting();
    this._renderPoints();
  }
}
