import AbstractComponentView from './abstract-component.js';
import {getTotalPrice} from '../utils/components.js';
import {createDestinationsTemplate} from '../utils/components.js';
import {createDurationTemplate} from '../utils/time.js';

const createTripInfoTemplate = (points) => `<section class="trip-main__trip-info trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${createDestinationsTemplate(points)}</h1>
      <p class="trip-info__dates">${createDurationTemplate(points)}</p>
    </div>
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotalPrice(points)}</span>
    </p>
</section>`;

export default class TripInfo extends AbstractComponentView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createTripInfoTemplate(this._points);
  }
}
