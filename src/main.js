import {pointsByDate} from './mock/point-data.js';

import TripPresenter from './presenter/trip.js';
const newTrip = new TripPresenter(document);
newTrip.init(pointsByDate);
