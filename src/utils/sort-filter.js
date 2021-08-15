import dayjs from 'dayjs';

export const sortPointsByDayUp = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

export const sortPointsByTimeDown = (pointA, pointB) => {
  const durationA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const durationB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));
  return durationB - durationA;
};

export const sortPointsByPriceDown = (pointA, pointB) => pointB.price - pointA.price;
