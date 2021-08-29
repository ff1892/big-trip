import {render, RenderPosition} from './utils/render.js';
import {points} from './mock/point-data.js';
import {offerData} from './mock/point-offer.js';
import {destinationData} from './mock/point-destination.js';
import PointsModel from './model/points.js';
import FilterModel from './model/filter.js';
import TripInfoPresenter from './presenter/trip-info.js';
import FilterPresenter from './presenter/filter.js';
import TripPresenter from './presenter/trip.js';
import MenuView from './view/menu.js';
import { MenuItem } from './const.js';

const pageBody = document.querySelector('.page-body');

const tripMenu = pageBody.querySelector('.trip-controls__navigation');
const menuComponent = new MenuView(MenuItem.TABLE);
render(tripMenu, menuComponent, RenderPosition.BEFOREEND);

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const filterModel = new FilterModel();

const tripInfo = new TripInfoPresenter(pageBody, pointsModel);
const filter = new FilterPresenter(filterModel, pointsModel);
const trip = new TripPresenter(pageBody, pointsModel, filterModel);


const handleMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      break;
    case MenuItem.STATS:
      break;
  }
};

menuComponent.setMenuClickHandler(handleMenuClick);

const initApp = () => {
  tripInfo.init();
  filter.init();
  trip.init(offerData, destinationData);

  document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
    evt.preventDefault();
    trip.createPoint();
  });
};

initApp();
