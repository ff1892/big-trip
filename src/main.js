import {points, pointsByDate} from './mock/point-data.js';
import {offerData} from './mock/point-offer.js';
import {destinationData} from './mock/point-destination.js';
import PointsModel from './model/points.js';
import TripInfoPresenter from './presenter/trip-info.js';
import TripPresenter from './presenter/trip.js';

const pageBody = document.querySelector('.page-body');

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const tripInfo = new TripInfoPresenter(pageBody);
const trip = new TripPresenter(pageBody, pointsModel);

const initApp = () => {
  tripInfo.init(pointsByDate);
  trip.init(offerData, destinationData);
};

initApp();
