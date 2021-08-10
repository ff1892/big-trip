import {createElement} from '../utils/util-render.js';
import {createDestinationsTemplate} from '../utils/util-components.js';
import {createDurationTemplate} from '../utils/util-time.js';
import {pointsByDate, startTime, endTime} from '../mock/point-data';

export const createRouteTemplate = () => (
  `<div class="trip-info__main">
      <h1 class="trip-info__title">${createDestinationsTemplate(pointsByDate)}</h1>
      <p class="trip-info__dates">${createDurationTemplate(startTime, endTime)}</p>
    </div>`
);

export default class Route {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createRouteTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
