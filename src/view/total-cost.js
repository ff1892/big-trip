import {pointsSortedByDate} from '../mock/point-data.js';

const getPointPrice = (point) => {
  const {offers, price} = point;
  const offersPrice = offers.reduce((initialPrice, offer) => initialPrice + offer.price, 0);
  return offersPrice + price;
};

const getTotalPrice = (points) => points.reduce((initialTotal, point) => initialTotal + getPointPrice(point), 0);
const totalPrice = getTotalPrice(pointsSortedByDate);

export const createTotalCostTemplate = () => (
  `<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
  </p>`
);
