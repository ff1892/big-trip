import dayjs from 'dayjs';
const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = MINUTES_IN_HOUR * 24;

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
  let dateFormat = 'mm[M]'

  if (eventInMinutes > MINUTES_IN_DAY) {
    dateFormat = 'DD[D] HH[H] mm[M]';
  } else if (eventInMinutes > MINUTES_IN_HOUR) {
    dateFormat = 'HH[H] mm[M]';
  }

  return eventDuration.format(`${dateFormat}`);
};

const getNumeralDate = (date) => dayjs(date).format('DD/MM/YY HH:mm');
const getTimefromDate = (date) => dayjs(date).format('HH:mm');
const getHumanizedDate = (date) => dayjs(date).format('MMM DD').toUpperCase();
const getDateAttribute = (date) => dayjs(date).format('YYYY-MM-DD');
const getDateTimeAttribute = (date) => dayjs(date).format('YYYY-MM-DDTHH:mm');

const getLastWordFromString = (string)=> string.split(' ').slice(-1);


export {
  getRandomInteger,
  getRandomArrayValue,
  getShuffledArray,
  getHumanizedDuration,
  getTimefromDate,
  getNumeralDate,
  getHumanizedDate,
  getDateAttribute,
  getDateTimeAttribute,
  getLastWordFromString,
};
