import dayjs from 'dayjs';
const duration = require('dayjs/plugin/duration'); // eslint-disable-line
dayjs.extend(duration);

const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = MINUTES_IN_HOUR * 24;
const POINTS_TO_SHOW = 3;

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayValue = (array) => array[getRandomInteger(0, array.length - 1)];

const getShuffledArray = (array) => {
  const shuffledArrayCopy = [...array];
  return shuffledArrayCopy.sort(() => getRandomInteger(0, 2) - 1);
};

const getHumanizedDuration = (startDate, endDate) => {
  const eventInMinutes = dayjs(endDate).diff(startDate, 'minutes');
  const eventDuration = dayjs.duration(dayjs(endDate).diff(startDate));
  let dateFormat = 'mm[M]';

  if (eventInMinutes > MINUTES_IN_DAY) {
    dateFormat = 'DD[D] HH[H] mm[M]';
  } else if (eventInMinutes > MINUTES_IN_HOUR) {
    dateFormat = 'HH[H] mm[M]';
  }

  return eventDuration.format(`${dateFormat}`);
};

const getNumeralDate = (date) => dayjs(date).format('DD/MM/YY HH:mm');
const getTimefromDate = (date) => dayjs(date).format('HH:mm');
const getDayfromDate = (date) => dayjs(date).format('DD');
const getHumanizedDate = (date) => dayjs(date).format('MMM DD').toUpperCase();
const getDateAttribute = (date) => dayjs(date).format('YYYY-MM-DD');
const getDateTimeAttribute = (date) => dayjs(date).format('YYYY-MM-DDTHH:mm');

const isInSameDay = (firstDate, secondDate) => dayjs(firstDate).format('MM YYYY') === dayjs(secondDate).format('DD MM YYYY');
const isInSameMonth = (firstDate, secondDate) => dayjs(firstDate).format('MM YYYY') === dayjs(secondDate).format('MM YYYY');

const getLastWordFromString = (string)=> string.split(' ').slice(-1);

const generateOrNot = (generatingFunction, generatingFunctionArgument) => {
  const random = getRandomInteger();
  return random === 1 ? generatingFunction(generatingFunctionArgument) : '';
};

const createDestinationsTemplate = (points) => {
  const firstDestination = points[0].name;
  const lastDestination = points[points.length - 1].name;
  const uniquePoints = [...new Set(points.map((point) => point.name))];

  if (uniquePoints.length === 2 && lastDestination === firstDestination) {
    uniquePoints.push(lastDestination);
    return uniquePoints.join(' &mdash; ');
  }

  if (uniquePoints.length <= POINTS_TO_SHOW) {
    return uniquePoints.join(' &mdash; ');
  }

  return `${firstDestination} &mdash; ... &mdash; ${lastDestination}`;
};

const createDurationTemplate = (firstDate, secondDate) => {
  if (isInSameDay(firstDate, secondDate)) {
    return `${firstDate}`;
  }
  if (isInSameMonth(firstDate, secondDate)) {
    return `${getHumanizedDate(firstDate)} &mdash; ${getDayfromDate(secondDate)}`;
  }
  return `${getHumanizedDate(firstDate)} &mdash; ${getHumanizedDate(secondDate)}`;
};

const getPointPrice = (point) => {
  const {offers, price} = point;
  const offersPrice = offers.reduce((initialPrice, offer) => initialPrice + offer.price, 0);
  return offersPrice + price;
};

const getTotalPrice = (points) => points.reduce((initialTotal, point) => initialTotal + getPointPrice(point), 0);


export {
  getRandomInteger,
  getRandomArrayValue,
  getShuffledArray,
  getHumanizedDuration,
  getTimefromDate,
  getDayfromDate,
  getNumeralDate,
  getHumanizedDate,
  getDateAttribute,
  getDateTimeAttribute,
  isInSameDay,
  isInSameMonth,
  getLastWordFromString,
  generateOrNot,
  createDestinationsTemplate,
  createDurationTemplate,
  getTotalPrice
};
