import {getDiff, getHumanizedTimeDiff} from './time.js';


const getUniqeTypes = (points) => {
  const uniqeTypes = new Set();
  points.forEach((point) => uniqeTypes.add(point.type));
  return uniqeTypes;
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
  const uniqeTypes = getUniqeTypes(points);
  const priceForAllTypes = new Map();

  uniqeTypes.forEach((type) => priceForAllTypes
    .set(type, getTypeTotalPrice(points, type)));

  return sortMapByValueDown(priceForAllTypes);
};

export const getTypeTotalCount = (points) => {
  const uniqeTypes = getUniqeTypes(points);
  const typeTotalCount = new Map();

  uniqeTypes.forEach((type) => typeTotalCount
    .set(type, getPointByType(points, type).length));

  return sortMapByValueDown(typeTotalCount);
};

export const getDurationForAllTypes = (points) => {
  const uniqeTypes = getUniqeTypes(points);
  const durationForAllTypes = new Map();

  uniqeTypes.forEach((type) => durationForAllTypes
    .set(type, getTypeTotalDuration(points, type)));

  const sortedDurationForAllTypes = sortMapByValueDown(durationForAllTypes);
  durationForAllTypes.clear();

  sortedDurationForAllTypes.forEach((value, key) => durationForAllTypes
    .set(key, getHumanizedTimeDiff(value)));
  return durationForAllTypes;
};
