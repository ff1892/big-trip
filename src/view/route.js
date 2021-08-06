import {createDestinationsTemplate, createDurationTemplate} from '../util';
import {pointsSortedByDate, startTime, endTime} from '../mock/point-data';

export const createRouteTemplate = () => (
  `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${createDestinationsTemplate(pointsSortedByDate)}</h1>
      <p class="trip-info__dates">${createDurationTemplate(startTime, endTime)}</p>
    </div>
  </section>`
);
