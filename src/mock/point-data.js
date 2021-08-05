import dayjs from 'dayjs';
import {getRandomInteger, getRandomArrayValue, generateOrNot} from '../util.js';
import {generateDestination} from './point-destination.js';
import {EVENT_TYPES, getChoosenOffers} from './point-offer.js';

const DESTINATIONS = ['Rome', 'Naples', 'Venice', 'Turin', 'Palermo', 'Florenze'];
const MIN_PRICE = 1;
const MAX_PRICE = 200;
const DAYS_GAP = 2;
const HOURS_GAP = 5;
const MINUTES_GAP = 50;
const POINTS_COUNT = 10;
const EVENT_DAFULT = 'flight';

const getDestinationName = () => getRandomArrayValue(DESTINATIONS);
const getEventType = () => getRandomArrayValue(EVENT_TYPES);

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
    name: destinationName,
    price: getRandomInteger(MIN_PRICE, MAX_PRICE),
    dateFrom: date.min,
    dateTo: date.max,
    isFavorite: Boolean(getRandomInteger()),
    offers: getChoosenOffers(type),
    destination: generateOrNot(generateDestination, destinationName),
  };
  return point;
};

const generateData = (pointsCount) => new Array(pointsCount).fill().map((value, index) => generatePoint(index + 1));
const sortPointsByDate = (pointsArray) => pointsArray.sort((pointOne, pointTwo) => pointOne.dateFrom - pointTwo.dateFrom);

const points = generateData(POINTS_COUNT);
const pointsSortedByDate = sortPointsByDate(points);

const startTime = pointsSortedByDate[0].dateFrom;
const endTime = pointsSortedByDate[pointsSortedByDate.length - 1].dateTo;

const getPointDefault = () => (
  {
    id: points.length + 1,
    type: EVENT_DAFULT,
    name: '',
    price: '',
    dateFrom: dayjs(endTime).add(HOURS_GAP, 'hours').toDate(),
    dateTo: dayjs(endTime).add(HOURS_GAP + 1, 'hours').toDate(),
    isFavorite: false,
    offers: '',
    destination: '',
  }
);

const pointDefault = getPointDefault();

export {
  DESTINATIONS,
  pointsSortedByDate,
  pointDefault,
  startTime,
  endTime
};
