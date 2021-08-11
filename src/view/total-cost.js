import AbstractComponentView from './abstract-component.js';
import {getTotalPrice} from '../utils/util-components.js';
import {pointsByDate} from '../mock/point-data.js';

const createTotalCostTemplate = () => (
  `<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotalPrice(pointsByDate)}</span>
  </p>`
);

export default class TotalCost extends AbstractComponentView {
  getTemplate() {
    return createTotalCostTemplate();
  }
}
