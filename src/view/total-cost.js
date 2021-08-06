import {pointsSortedByDate} from '../mock/point-data.js';
import {getTotalPrice} from '../util.js';

export const createTotalCostTemplate = () => (
  `<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotalPrice(pointsSortedByDate)}</span>
  </p>`
);
