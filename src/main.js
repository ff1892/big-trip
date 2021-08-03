import dayjs from 'dayjs';
import {createRouteTemplate} from './view/route.js';
import {createTotalCostTemplate} from './view/total-cost.js';
import {createMenuTemplate} from './view/menu.js';
import {createFiltersTemplate} from './view/filters.js';
import {createSortingTemplate} from './view/sorting.js';
import {createEventsListTemplate} from './view/events-list.js';
import {createEditPointTemplate} from './view/point-edit.js';
import {createPointTemplate} from './view/point.js';
import {createNewPointTemplate} from './view/point-new.js';
import {generateData, sortPointsByDate} from './mock/point-data.js';

const POINTS_COUNT = 10;
const points = generateData(POINTS_COUNT);
const pointsSortedByDate = sortPointsByDate(points);

const siteHeader = document.querySelector('.page-header');
const mainTrip = siteHeader.querySelector('.trip-main');
const tripControlsMenu = mainTrip.querySelector('.trip-controls__navigation');
const tripControlsFilters = mainTrip.querySelector('.trip-controls__filters');

const siteMain = document.querySelector('.page-main');
const tripEventsSection = siteMain.querySelector('.trip-events');

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(mainTrip, createRouteTemplate(), 'afterbegin');

const tripInfo = mainTrip.querySelector('.trip-info');
render(tripInfo, createTotalCostTemplate(), 'beforeend');

render(tripControlsMenu, createMenuTemplate(), 'beforeend');
render(tripControlsFilters, createFiltersTemplate(), 'beforeend');
render(tripEventsSection, createSortingTemplate(), 'beforeend');
render(tripEventsSection, createEventsListTemplate(), 'beforeend');

const tripEventsList = tripEventsSection.querySelector('.trip-events__list');
render(tripEventsList, createEditPointTemplate(pointsSortedByDate[0]), 'beforeend');
render(tripEventsList, createPointTemplate(pointsSortedByDate[1]), 'beforeend');
render(tripEventsList, createPointTemplate(pointsSortedByDate[2]), 'beforeend');
render(tripEventsList, createNewPointTemplate(), 'beforeend');

const generateRoute = (points) => {
  const destinations = new Array(points.length).fill().map((value, index) => points[index].name);
  const firstDestination = destinations[0];
  const lastDestination = destinations[destinations.length - 1];
  const divider = '&mdash;'
  const uniqueDestinations = new Set(destinations);

  const getAnotherDestination = (destinationsCount = 2) => {
    uniqueDestinations.delete(firstDestination);

    if (destinationsCount === 3) {
    uniqueDestinations.delete(lastDestination)
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
