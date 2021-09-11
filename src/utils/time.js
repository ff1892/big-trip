import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export const getDiff = (point) => {
  const {dateFrom, dateTo} = point;
  return dayjs(dateTo).diff(dateFrom);
};

export const getHumanizedTimeDiff = (diff) => {
  const eventDuration = dayjs.duration(diff);
  let dateFormat = 'mm[M]';

  if (eventDuration.asDays() >= 1) {
    dateFormat = 'DD[D] HH[H] mm[M]';
  } else if (eventDuration.asHours() >= 1) {
    dateFormat = 'HH[H] mm[M]';
  }

  if (eventDuration.asDays() >= 30) {
    return '> 30D';
  }
  return eventDuration.format(`${dateFormat}`);
};

export const getHumanizedDuration = (point) => {
  const timeDiff = getDiff(point);
  return getHumanizedTimeDiff(timeDiff);
};

export const getNumeralDate = (date) => dayjs(date).format('DD/MM/YY HH:mm');
export const getTimeFromDate = (date) => dayjs(date).format('HH:mm');
export const getDayFromDate = (date) => dayjs(date).format('DD');
export const getHumanizedDate = (date) => dayjs(date).format('MMM DD').toUpperCase();
export const getDateAttribute = (date) => dayjs(date).format('YYYY-MM-DD');
export const getDateTimeAttribute = (date) => dayjs(date).format('YYYY-MM-DDTHH:mm');

export const isInSameDay = (firstDate, secondDate) => dayjs(firstDate).format('DD MM YYYY') === dayjs(secondDate).format('DD MM YYYY');
export const isInSameMonth = (firstDate, secondDate) => dayjs(firstDate).format('MM YYYY') === dayjs(secondDate).format('MM YYYY');

export const createDurationTemplate = (points) => {
  const firstDate = points[0].dateFrom;
  const secondDate = points[points.length - 1].dateTo;

  if (isInSameDay(firstDate, secondDate)) {
    return `${getHumanizedDate(firstDate)}`;
  }

  if (isInSameMonth(firstDate, secondDate)) {
    return `${getHumanizedDate(firstDate)} &mdash; ${getDayFromDate(secondDate)}`;
  }

  return `${getHumanizedDate(firstDate)} &mdash; ${getHumanizedDate(secondDate)}`;
};
