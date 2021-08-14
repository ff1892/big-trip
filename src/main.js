import {pointsByDate} from './mock/point-data.js';
import TripPresenter from './presenter/trip.js';

const trip = new TripPresenter(document);
trip.init(pointsByDate);
