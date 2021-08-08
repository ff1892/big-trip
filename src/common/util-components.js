const POINTS_TO_SHOW = 3;

export const getLastWordFromString = (string)=> string.split(' ').slice(-1);

export const createDestinationsTemplate = (points) => {
  const firstDestination = points[0].name;
  const lastDestination = points[points.length - 1].name;
  const uniquePoints = [...new Set(points.map((point) => point.name))];

  if (uniquePoints.length === 2 && lastDestination === firstDestination) {
    uniquePoints.push(lastDestination);
    return uniquePoints.join(' &mdash; ');
  }

  if (uniquePoints.length <= POINTS_TO_SHOW) {
    return uniquePoints.join(' &mdash; ');
  }

  return `${firstDestination} &mdash; ... &mdash; ${lastDestination}`;
};

const getPointPrice = (point) => {
  const {offers, price} = point;
  const offersPrice = offers.reduce((initialPrice, offer) => initialPrice + offer.price, 0);
  return offersPrice + price;
};

export const getTotalPrice = (points) => points.reduce((initialTotal, point) => initialTotal + getPointPrice(point), 0);
