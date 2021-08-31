import {points} from './mock/point-data.js';
import {offerData} from './mock/point-offer.js';
import {destinationData} from './mock/point-destination.js';
import PointsModel from './model/points.js';
import FilterModel from './model/filter.js';
import TripInfoPresenter from './presenter/trip-info.js';
import FilterPresenter from './presenter/filter.js';
import TripPresenter from './presenter/trip.js';
import MenuPresenter from './presenter/menu.js';
import StatsView from './view/stats.js';
import {render, RenderPosition} from './utils/render.js';

const pageBody = document.querySelector('.page-body');
const pageBodyContainer = pageBody.querySelector('main .page-body__container');

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const filterModel = new FilterModel();

const tripInfo = new TripInfoPresenter(pageBody, pointsModel);
const menu = new MenuPresenter();
const filter = new FilterPresenter(filterModel, pointsModel);
const trip = new TripPresenter(pageBody, pointsModel, filterModel);

const handleClickMenuTable = () => {
  trip.destroy();
  trip.init(offerData, destinationData);
};

const handleClickMenuStats = () => {
  trip.destroy();
};

const initApp = () => {
  tripInfo.init();
  menu.init(handleClickMenuTable, handleClickMenuStats);
  filter.init();
  trip.init(offerData, destinationData);
  // const statsComponent = new StatsView();
  // render(pageBodyContainer, statsComponent, RenderPosition.BEFOREEND);
  document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
    evt.preventDefault();
    trip.createPoint(menu.reset());
  });
};

initApp();
