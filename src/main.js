import {render, RenderPosition, replace} from './utils/util-render.js';
import {MessagesPointsAbsent} from './utils/util-components.js';
import {pointsByDate} from './mock/point-data.js';

import TripInfoView from './view/trip-info.js';
import TotalCostView from './view/total-cost.js';
import RouteView from './view/route.js';
import MenuView from './view/menu.js';
import FilterView from './view/filters.js';
import SortingView from './view/sorting.js';
import ListView from './view/list.js';
import PointView from './view/point.js';
import PointEditView from './view/point-edit.js';
import PointsAbsentView from './view/points-absent.js';

const siteHeader = document.querySelector('.page-header');
const mainTrip = siteHeader.querySelector('.trip-main');
const tripControlsMenu = mainTrip.querySelector('.trip-controls__navigation');
const tripControlsFilters = mainTrip.querySelector('.trip-controls__filters');
const siteMain = document.querySelector('.page-main');
const tripEventsSection = siteMain.querySelector('.trip-events');

const tripInfoComponent = new TripInfoView();
const listComponent = new ListView();

const renderPoint = (list, point) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new PointEditView(point);

  const replacePointToForm = () => {
    replace(pointEditComponent, pointComponent);
  };

  const replaceFormToPoint = () => {
    replace(pointComponent, pointEditComponent);
  };

  const onEscapeKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscapeKeyDown);
    }
  };

  pointComponent.setEditClickHandler(() => {
    replacePointToForm();
    document.addEventListener('keydown', onEscapeKeyDown);
  });

  pointEditComponent.setEditClickHandler(() => {
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscapeKeyDown);
  });

  pointEditComponent.setSubmitHandler(() => {
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscapeKeyDown);
  });

  render(list, pointComponent, RenderPosition.BEFOREEND);
};

const renderDataPage = (data) => {
  render(mainTrip, tripInfoComponent, RenderPosition.AFTERBEGIN);
  render(tripInfoComponent, new RouteView(), RenderPosition.BEFOREEND);
  render(tripInfoComponent, new TotalCostView(), RenderPosition.BEFOREEND);
  render(tripEventsSection, new SortingView(), RenderPosition.BEFOREEND);
  render(tripEventsSection, listComponent, RenderPosition.BEFOREEND);

  for (let i = 0; i < data.length; i++) {
    renderPoint(listComponent, data[i]);
  }
};

const renderPage = (data = []) => {

  render(tripControlsMenu, new MenuView(), RenderPosition.BEFOREEND);
  render(tripControlsFilters, new FilterView(), RenderPosition.BEFOREEND);

  if (data.length) {
    renderDataPage(data);
    return;
  }

  const pointsAbsentEverything = new PointsAbsentView(MessagesPointsAbsent.EVERYTHING);
  render(tripEventsSection, pointsAbsentEverything, RenderPosition.BEFOREEND);
};

renderPage(pointsByDate);
