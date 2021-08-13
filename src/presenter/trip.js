import {render, RenderPosition, replace} from '../utils/util-render.js';
import {MessagesPointsAbsent} from '../utils/util-components.js';

import TripInfoView from '../view/trip-info.js';
import TotalCostView from '../view/total-cost.js';
import RouteView from '../view/route.js';
import MenuView from '../view/menu.js';
import FilterView from '../view/filters.js';
import SortingView from '../view/sorting.js';
import ListView from '../view/list.js';
import PointView from '../view/point.js';
import PointEditView from '../view/point-edit.js';
import PointsAbsentView from '../view/points-absent.js';

export default class Trip {
  constructor(page) {

    this._mainTrip = page.querySelector('.trip-main');
    this._tripMenu = this._mainTrip.querySelector('.trip-controls__navigation');
    this._tripFilters = this._mainTrip.querySelector('.trip-controls__filters');
    this._tripEventsSection = page.querySelector('.trip-events');

    this._tripInfoComponent = new TripInfoView();
    this._listComponent = new ListView();
    this._pointsAbsentEverything = new PointsAbsentView(MessagesPointsAbsent.EVERYTHING);
  }

  init(points) {
    this._points = points.slice();

    render(this._tripMenu, new MenuView(), RenderPosition.BEFOREEND);
    render(this._tripFilters, new FilterView(), RenderPosition.BEFOREEND);
    this._renderInfo();
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

  _renderPoint(list, point) {
    const pointComponent = new PointView(point);
    const pointEditComponent = new PointEditView(point);

    const replacePointToForm = () => {
    replace(pointEditComponent, pointComponent);
    };

    const replaceFormToPoint = () => {
    replace(pointComponent, pointEditComponent);
    };

    const onEscapeKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscapeKeyDown);
    }
    };

    pointComponent.setEditClickHandler(() => {
      replacePointToForm();
      document.addEventListener('keydown', onEscapeKeyDown);
    });

    pointEditComponent.setEditClickHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscapeKeyDown);
    });

    pointEditComponent.setSubmitHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscapeKeyDown);
    });

    render(list, pointComponent, RenderPosition.BEFOREEND);
    }


  _renderPoints() {
    render(this._tripEventsSection, this._listComponent, RenderPosition.BEFOREEND);
    for (let i = 0; i < this._points.length; i++) {
      this._renderPoint(this._listComponent, this._points[i]);
    }
  }

  _renderPointsAbsent() {
    render(this._tripEventsSection, this._pointsAbsentEverything, RenderPosition.BEFOREEND);
  }

  _renderInfo() {
    if (this._points.length === 0) {
      this._renderPointsAbsent();
      return;
    }

    this._renderTripInfo();
    this._renderSorting();
    this._renderPoints();
  }
}
