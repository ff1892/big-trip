import {points, pointsByDate} from './mock/point-data.js';
import {offerData} from './mock/point-offer.js';
import {destinationData} from './mock/point-destination.js';
import PointsModel from './model/points.js';
import FilterModel from './model/filter.js';
import TripInfoPresenter from './presenter/trip-info.js';
import FilterPresenter from './presenter/filter.js';
import TripPresenter from './presenter/trip.js';

const pageBody = document.querySelector('.page-body');

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const filterModel = new FilterModel()

const tripInfo = new TripInfoPresenter(pageBody);
const filter = new FilterPresenter(filterModel, pointsModel);
const trip = new TripPresenter(pageBody, pointsModel, filterModel);

const initApp = () => {
  tripInfo.init(pointsByDate);
  filter.init();
  trip.init(offerData, destinationData);
};

initApp();
