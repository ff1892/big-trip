import {render, RenderPosition} from '../utils/render.js';

import TripInfoView from '../view/trip-info.js';
import TotalCostView from '../view/total-cost.js';
import RouteView from '../view/route.js';
import MenuView from '../view/menu.js';
import FilterView from '../view/filters.js';


export default class TripInfo {
  constructor(container) {

    this._mainTrip = container.querySelector('.trip-main');
    this._tripMenu = this._mainTrip.querySelector('.trip-controls__navigation');
    this._tripFilters = this._mainTrip.querySelector('.trip-controls__filters');

    this._tripInfoComponent = new TripInfoView();
  }

  init(points) {
    this._points = points.slice();
    render(this._tripMenu, new MenuView(), RenderPosition.BEFOREEND);
    render(this._tripFilters, new FilterView(), RenderPosition.BEFOREEND);
    this._renderTripInfo();
  }

  _renderRoute() {
    render(this._tripInfoComponent, new RouteView(this._points), RenderPosition.BEFOREEND);
    console.log(this._points);
  }

  _renderTotalCost() {
    render(this._tripInfoComponent, new TotalCostView(this._points), RenderPosition.BEFOREEND);
  }

  _renderTripInfo() {
    if (!this._points.length) {
      return;
    }

    render(this._mainTrip, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
    this._renderRoute();
    this._renderTotalCost();
  }
}
