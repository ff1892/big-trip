import dayjs from 'dayjs';
import {getRandomInteger, getRandomArrayValue} from '../utils/common.js';
import {sortPointsByDayUp} from '../utils/sort-filter.js';
import {DESTINATIONS, destinationData} from './point-destination.js';
import {EVENT_TYPES, offerData, getChoosenOffers} from './point-offer.js';

const MIN_PRICE = 1;
const MAX_PRICE = 200;
const DAYS_GAP = 7;
const HOURS_GAP = 8;
const MINUTES_GAP = 50;
const POINTS_COUNT = 10;
const EVENT_DEFAULT = 'flight';

const getDestinationName = () => getRandomArrayValue(DESTINATIONS);
const getEventType = () => getRandomArrayValue(EVENT_TYPES);

const getDestinationForCity = (dataList, city) => {
  const currentDestination = dataList.find((destination) => destination.name === city);
  return currentDestination ? currentDestination : '';
};

const generateDate = () => {
  let dateMin;
  let dateMax;

  const isSameDay = Boolean(getRandomInteger());

  const getDaysDifference = () => getRandomInteger(-DAYS_GAP, DAYS_GAP);
  const getHoursDifference = () => getRandomInteger(-HOURS_GAP, HOURS_GAP);
  const getMinutesDifference = () => getRandomInteger(-MINUTES_GAP, MINUTES_GAP);

  isSameDay ? (
    dateMin = dayjs().add(getHoursDifference(), 'hours').add(getMinutesDifference(), 'minutes').toDate(),
    dateMax = dayjs().add(getHoursDifference(), 'hours').add(getMinutesDifference(), 'minutes').toDate()
  ) : (
    dateMin = dayjs().add(getDaysDifference(), 'days').add(getHoursDifference(), 'hours').add(getMinutesDifference(), 'minutes').toDate(),
    dateMax = dayjs().add(getDaysDifference(), 'days').add(getHoursDifference(), 'hours').add(getMinutesDifference(), 'minutes').toDate()
  );

  if (dateMin > dateMax) {
    [dateMin, dateMax] = [dateMax, dateMin];
  }

  return {
    min: dateMin,
    max: dateMax,
  };
};


const generatePoint = (id) => {
  const destinationName = getDestinationName();
  const type = getEventType();
  const date = generateDate();

  const point = {
    id,
    type,
    price: getRandomInteger(MIN_PRICE, MAX_PRICE),
    dateFrom: date.min,
    dateTo: date.max,
    isFavorite: Boolean(getRandomInteger()),
    offers: getChoosenOffers(type, offerData),
    destination: getDestinationForCity(destinationData, destinationName),
  };
  return point;
};

const generateData = (pointsCount) => new Array(pointsCount).fill().map((value, index) => generatePoint(index + 1));

const points = generateData(POINTS_COUNT);
const pointsByDate = points.slice().sort(sortPointsByDayUp);

const endTime = pointsByDate[pointsByDate.length - 1].dateTo;

const getPointDefault = () => (
  {
    id: points.length + 1,
    type: EVENT_DEFAULT,
    name: '',
    price: '',
    dateFrom: dayjs(endTime).add(HOURS_GAP, 'hours').toDate() || dayjs().toDate,
    dateTo: dayjs(endTime).add(HOURS_GAP + 1, 'hours').toDate() || dayjs().add(HOURS_GAP, 'hours').toDate(),
    isFavorite: false,
    offers: '',
    destination: '',
  }
);

const pointDefault = getPointDefault();

export {
  DESTINATIONS,
  pointsByDate,
  points,
  pointDefault
};
