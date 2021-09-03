import {offerData} from './mock/point-offer.js';
import {destinationData} from './mock/point-destination.js';
import PointsModel from './model/points.js';
import DestinationsModel from './model/destinations.js';
import OffersModel from './model/offers.js';
import FilterModel from './model/filter.js';
import TripInfoPresenter from './presenter/trip-info.js';
import FilterPresenter from './presenter/filter.js';
import TripPresenter from './presenter/trip.js';
import MenuPresenter from './presenter/menu.js';
import StatsView from './view/stats.js';
import {remove, render, RenderPosition} from './utils/render.js';
import {MenuItem, UpdateType} from './const.js';
import {handlePseudo, handleFilters} from './utils/components.js';
import Api from './api.js';

const END_POINT = 'https://14.ecmascript.pages.academy/big-trip';
const AUTHORIZATION = 'Basic S2Vrc0ZvcmV2ZXI6cXdlcnR5';
const api = new Api(END_POINT, AUTHORIZATION);

const pageBody = document.querySelector('.page-body');
const pageBodyContainer = pageBody.querySelector('main .page-body__container');

const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const filterModel = new FilterModel();

const tripInfo = new TripInfoPresenter(pageBody, pointsModel);
const menu = new MenuPresenter();
const filter = new FilterPresenter(filterModel, pointsModel);
const trip = new TripPresenter(pageBody, pointsModel, filterModel);

let statsComponent = null;

const menuClickHandler = (menuItem) => {
  switch (menuItem) {
    case MenuItem.STATS:
      trip.destroy();
      statsComponent = new StatsView(pointsModel.getPoints());
      render(pageBodyContainer, statsComponent, RenderPosition.BEFOREEND);
      handlePseudo();
      handleFilters();
      break;
    case MenuItem.TABLE:
      trip.destroy();
      trip.init(offerData, destinationData);
      remove(statsComponent);
      handlePseudo(false);
      handleFilters(false);
      break;
  }
};

api.getPoints()
  .then((points) => {
    pointsModel.setPoints(UpdateType.INIT, points);
    console.log(pointsModel.getPoints());
  })
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
  });

const initApp = () => {
  tripInfo.init();
  menu.init(menuClickHandler);
  filter.init();
  trip.init(offerData, destinationData);

  document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
    evt.preventDefault();
    trip.createPoint(menu.reset());
  });
};

initApp();
