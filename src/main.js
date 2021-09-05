import {MenuItem, UpdateType} from './const.js';
import {remove, render, RenderPosition} from './utils/render.js';
import {newPointButton, handlePseudo, handleFilters} from './utils/components.js';
import PointsModel from './model/points.js';
import DestinationsModel from './model/destinations.js';
import OffersModel from './model/offers.js';
import FilterModel from './model/filter.js';
import TripInfoPresenter from './presenter/trip-info.js';
import FilterPresenter from './presenter/filter.js';
import TripPresenter from './presenter/trip.js';
import MenuPresenter from './presenter/menu.js';
import StatsView from './view/stats.js';
import Api from './api.js';

const END_POINT = 'https://15.ecmascript.pages.academy/big-trip';
const AUTHORIZATION = 'Basic S2Vrc0ZvcmV2ZXI6cXdlcnR5';
const api = new Api(END_POINT, AUTHORIZATION);

const pageBody = document.querySelector('.page-body');
const pageBodyContainer = pageBody.querySelector('main .page-body__container');

const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filterModel = new FilterModel();

const tripInfo = new TripInfoPresenter(pageBody, pointsModel);
const menu = new MenuPresenter();
const filter = new FilterPresenter(filterModel, pointsModel);
const trip = new TripPresenter(pageBody, pointsModel, filterModel, offersModel, destinationsModel, api);

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
      trip.init(offersModel, destinationsModel);
      remove(statsComponent);
      handlePseudo(false);
      handleFilters(false);
      break;
  }
};

api.getData()
  .then((data) => {
    const [points, offers, destinations] = data;

    offersModel.setOffers(offers);
    destinationsModel.setDestinations(destinations);
    pointsModel.setPoints(UpdateType.INIT, points);
  });

const initApp = () => {
  tripInfo.init();
  menu.init(menuClickHandler);
  filter.init();
  trip.init();

  newPointButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    trip.createPoint(menu.reset());
  });
};

initApp();
