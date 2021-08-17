import dayjs from 'dayjs';
const duration = require('dayjs/plugin/duration'); // eslint-disable-line
dayjs.extend(duration);

const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = MINUTES_IN_HOUR * 24;

export const getHumanizedDuration = (startDate, endDate) => {
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

export const getNumeralDate = (date) => dayjs(date).format('DD/MM/YY HH:mm');
export const getTimefromDate = (date) => dayjs(date).format('HH:mm');
export const getDayfromDate = (date) => dayjs(date).format('DD');
export const getHumanizedDate = (date) => dayjs(date).format('MMM DD').toUpperCase();
export const getDateAttribute = (date) => dayjs(date).format('YYYY-MM-DD');
export const getDateTimeAttribute = (date) => dayjs(date).format('YYYY-MM-DDTHH:mm');

export const isInSameDay = (firstDate, secondDate) => dayjs(firstDate).format('MM YYYY') === dayjs(secondDate).format('DD MM YYYY');
export const isInSameMonth = (firstDate, secondDate) => dayjs(firstDate).format('MM YYYY') === dayjs(secondDate).format('MM YYYY');

export const createDurationTemplate = (points) => {
  const firstDate = points[0].dateFrom;
  const secondDate = points[points.length - 1].dateTo;

  if (isInSameDay(firstDate, secondDate)) {
    return `${firstDate}`;
  }
  if (isInSameMonth(firstDate, secondDate)) {
    return `${getHumanizedDate(firstDate)} &mdash; ${getDayfromDate(secondDate)}`;
  }
  return `${getHumanizedDate(firstDate)} &mdash; ${getHumanizedDate(secondDate)}`;
};
