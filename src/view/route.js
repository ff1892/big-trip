import {isInSameMonth, isInSameDay, getHumanizedDate, getDayfromDate} from '../util';
import {pointsSortedByDate, startTime, endTime} from '../mock/point-data';
import { createDestinationsTemplate } from './createDestinationsTemplate';

const createDurationTemplate = (firstDate, secondDate) => {
  if (isInSameDay(firstDate, secondDate)) {
    return `${firstDate}`;
  }
  if (isInSameMonth(firstDate, secondDate)) {
    return `${getHumanizedDate(firstDate)} &mdash; ${getDayfromDate(secondDate)}`;
  }

  return `${getHumanizedDate(firstDate)} &mdash; ${getHumanizedDate(secondDate)}`;
};


const duration = createDurationTemplate(startTime, endTime);

export const createRouteTemplate = () => (
  `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">'N'</h1>
      <p class="trip-info__dates">${duration}</p>
    </div>
  </section>`
);
