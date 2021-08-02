import dayjs from 'dayjs';
import {getRandomInteger, getRandomArrayValue} from '../util.js';
import {generateDestination} from './point-destination.js';
import {EVENT_TYPES, getOffersForEvent} from './point-offer.js';

const POINTS_COUNT = 10;
const DESTINATIONS = ['Rome', 'Naples', 'Venice', 'Turin', 'Palermo', 'Florenze'];
const MIN_PRICE = 0;
const MAX_PRICE = 500;

const getDestinationName = () => getRandomArrayValue(DESTINATIONS);
const getEventType = () => getRandomArrayValue(EVENT_TYPES);

const generatePoint = (id) => {
  const destinationName = getDestinationName();
  const type = getEventType();

  const point = {
    id,
    type,
    name: destinationName,
    price: getRandomInteger(MIN_PRICE, MAX_PRICE),
    isFavorite: Boolean(getRandomInteger()),
    offers: getOffersForEvent(type),
    destination: generateDestination(destinationName),
  };
  return point;
};

const generateData = (pointsCount) => new Array(pointsCount).fill(null).map((value, index) => generatePoint(index + 1));

// generateData(POINTS_COUNT).forEach((point) => console.log(point));


const DAYS_GAP = 5;
const HOURS_GAP = 2;

const generateDate = () => {
  const isSameDay = Boolean(getRandomInteger());

  const getDaysDifference = () => getRandomInteger(-DAYS_GAP, DAYS_GAP);
  const getHoursDifference = () => getRandomInteger(-HOURS_GAP, HOURS_GAP);

  if (isSameDay) {
    let firstDate = dayjs().add(getHoursDifference(), 'hours').toDate();
    let secondDate = dayjs().add(getHoursDifference(), 'hours').toDate();

    if (firstDate > secondDate) {
      [firstDate, secondDate] = [secondDate, firstDate];
    }

    return {
      min: firstDate,
      max: secondDate,
    }
  }

  let firstDate = dayjs().add(getDaysDifference(), 'days').add(getHoursDifference(), 'hours').toDate();
  let secondDate = dayjs().add(getDaysDifference(), 'days').add(getHoursDifference(), 'hours').toDate();

  if (firstDate > secondDate) {
    [firstDate, secondDate] = [secondDate, firstDate];
  }

  return {
    min: firstDate,
    max: secondDate,
  }
};

console.log(generateDate().min);
