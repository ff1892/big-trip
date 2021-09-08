import {render, replace, remove, RenderPosition} from '../utils/render.js';

import TripInfoView from '../view/trip-info.js';
import {UpdateType} from '../const.js';
import {sortPointsByDayUp} from '../utils/sort-filter.js';


export default class TripInfo {
  constructor(container, pointsModel) {
    this._mainTrip = container.querySelector('.trip-main');
    this._tripInfoComponent = null;

    this._pointsModel = pointsModel;
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._pointsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._points = this._pointsModel.getPoints();
    this._sortedPoints = this._points.slice().sort(sortPointsByDayUp);

    if(!this._points.length) {
      remove(this._tripInfoComponent);
      this._tripInfoComponent = null;
      return;
    }

    this._renderTripInfoComponent();
  }

  _renderTripInfoComponent() {
    const prevTripInfoComponent = this._tripInfoComponent;
    this._tripInfoComponent = new TripInfoView(this._sortedPoints);

    if (prevTripInfoComponent === null) {
      render(this._mainTrip, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this._tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);
  }

  _handleModelEvent(update, data) {
    if (update !== UpdateType.PATCH) {
      data;
      this.init();
    }
  }
}
