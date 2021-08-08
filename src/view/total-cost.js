import {createElement} from '../common/utils-render';
import {pointsByDate} from '../mock/point-data.js';
import {getTotalPrice} from '../util.js';

const createTotalCostTemplate = () => (
  `<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotalPrice(pointsByDate)}</span>
  </p>`
);

export default class TotalCost {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTotalCostTemplate();
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
