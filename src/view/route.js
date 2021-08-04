import {isInSameMonth, isInSameDay, getHumanizedDate, getDayfromDate} from '../util';
import {pointsSortedByDate, startTime, endTime} from '../mock/point-data';

const createDestinationsTemplate = (points) => {
  const destinations = new Array(points.length).fill().map((value, index) => points[index].name);
  const firstDestination = destinations[0];
  const lastDestination = destinations[destinations.length - 1];
  const divider = '&mdash;';
  const uniqueDestinations = new Set(destinations);

  const getAnotherDestination = (destinationsCount = 2) => {
    uniqueDestinations.delete(firstDestination);

    if (destinationsCount === 3) {
      uniqueDestinations.delete(lastDestination);
    }
    const middleDestination = Array.from(uniqueDestinations);
    return middleDestination[0];
  };

  switch (uniqueDestinations.size) {
    case 1:
      return firstDestination;
    case 2:
      if (firstDestination !== lastDestination) {
        return `${firstDestination} ${divider} ${lastDestination}`;
      }
      return `${firstDestination} ${divider} ${getAnotherDestination()} ${divider} ${lastDestination}`;
    case 3:
      if (firstDestination !== lastDestination) {
        return `${firstDestination} ${divider} ${getAnotherDestination(3)} ${divider} ${lastDestination}`;
      }
      return `${firstDestination} ${divider} ... ${divider} ${lastDestination}`;
    default:
      return `${firstDestination} ${divider} ... ${divider} ${lastDestination}`;
  }
};

const createDurationTemplate = (firstDate, secondDate) => {
  if (isInSameDay(firstDate, secondDate)) {
    return `${firstDate}`;
  }
  if (isInSameMonth(firstDate, secondDate)) {
    return `${getHumanizedDate(firstDate)} &mdash; ${getDayfromDate(secondDate)}`;
  }

  return `${getHumanizedDate(firstDate)} &mdash; ${getHumanizedDate(secondDate)}`;
};

const route = createDestinationsTemplate(pointsSortedByDate);
const duration = createDurationTemplate(startTime, endTime);

export const createRouteTemplate = () => (
  `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${route}</h1>
      <p class="trip-info__dates">${duration}</p>
    </div>
  </section>`
);
