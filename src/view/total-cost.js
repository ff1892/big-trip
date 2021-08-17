import AbstractComponentView from './abstract-component.js';
import {getTotalPrice} from '../utils/components.js';

const createTotalCostTemplate = (points) => (
  `<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotalPrice(points)}</span>
  </p>`
);

export default class TotalCost extends AbstractComponentView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createTotalCostTemplate(this._points);
  }
}
