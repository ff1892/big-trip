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
import {generateData} from './mock/point-data.js';

const POINTS_COUNT = 10;
const points = generateData(POINTS_COUNT);

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
render(tripEventsList, createEditPointTemplate(), 'beforeend');
render(tripEventsList, createPointTemplate(points[0]), 'beforeend');
render(tripEventsList, createPointTemplate(points[1]), 'beforeend');
render(tripEventsList, createNewPointTemplate(), 'beforeend');

// const a = points[0].dateFrom;
// const b = points[0].dateTo;

// console.log(dayjs(a).format('DD-MM-YY'))
// console.log(dayjs(b).format('DD-MM-YY'))

// const x = dayjs(b).diff(a, 'minutes');
