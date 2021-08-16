import AbstractComponentView from './abstract-component.js';
import {createDestinationsTemplate} from '../utils/components.js';
import {createDurationTemplate} from '../utils/time.js';

export const createRouteTemplate = (points) => (
  `<div class="trip-info__main">
      <h1 class="trip-info__title">${createDestinationsTemplate(points)}</h1>
      <p class="trip-info__dates">${createDurationTemplate(points)}</p>
    </div>`
);

export default class Route extends AbstractComponentView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createRouteTemplate(this._points);
  }
}
