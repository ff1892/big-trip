import dayjs from 'dayjs';
import {getRandomInteger, getRandomArrayValue} from '../util.js';
import {generateDestination} from './point-destination.js';
import {EVENT_TYPES, getChoosenOffers} from './point-offer.js';

const DESTINATIONS = ['Rome', 'Naples', 'Venice', 'Turin', 'Palermo', 'Florenze'];
const MIN_PRICE = 1;
const MAX_PRICE = 500;
const DAYS_GAP = 2;
const HOURS_GAP = 5;
const MINUTES_GAP = 50;

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
    }
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
    destination: generateDestination(destinationName),
  };
  return point;
};

const generateData = (pointsCount) => new Array(pointsCount).fill().map((value, index) => generatePoint(index + 1));

const sortPointsByDate = (points) => points.sort((pointOne, pointTwo) => pointOne.dateFrom - pointTwo.dateFrom);

export {generateData, sortPointsByDate};
