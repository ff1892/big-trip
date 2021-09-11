import {getDiff} from './time.js';


const getUniqueTypes = (points) => {
  const uniqueTypes = new Set();
  points.forEach((point) => uniqueTypes.add(point.type));
  return uniqueTypes;
};

const getPointByType = (points, type) => points.filter((point) => point.type === type);

const sortMapByValueDown = (map) => new Map([...map.entries()].sort((a, b) => b[1] - a[1]));

const getTypeTotalPrice = (points, type) => {
  const pointsByType = getPointByType(points, type);
  return pointsByType.reduce((initialPrice, currentPoint) => initialPrice + currentPoint.price, 0);
};

const getTypeTotalDuration = (points, type) => {
  const pointsByType = getPointByType(points, type);

  const totalDuration = pointsByType.reduce((initialDuration, currentPoint) =>
    initialDuration + getDiff(currentPoint), 0);

  return totalDuration;
};

export const getPriceForAllTypes = (points) => {
  const uniqueTypes = getUniqueTypes(points);
  const priceForAllTypes = new Map();

  uniqueTypes.forEach((type) => priceForAllTypes
    .set(type, getTypeTotalPrice(points, type)));

  return sortMapByValueDown(priceForAllTypes);
};

export const getTypeTotalCount = (points) => {
  const uniqueTypes = getUniqueTypes(points);
  const typeTotalCount = new Map();

  uniqueTypes.forEach((type) => typeTotalCount
    .set(type, getPointByType(points, type).length));

  return sortMapByValueDown(typeTotalCount);
};

export const getDurationForAllTypes = (points) => {
  const uniqueTypes = getUniqueTypes(points);
  const durationForAllTypes = new Map();

  uniqueTypes.forEach((type) => durationForAllTypes
    .set(type, getTypeTotalDuration(points, type)));

  return sortMapByValueDown(durationForAllTypes);
};
