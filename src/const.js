import dayjs from 'dayjs';

const EVENT_DEFAULT = 'flight';
const STORE_VER = 'v15';

export const POINT_BLANK =  {
  type: EVENT_DEFAULT,
  price: 0,
  dateFrom: dayjs().toDate(),
  dateTo: dayjs().toDate(),
  isFavorite: false,
  offers: [],
  destination: null,
};

export const SortingType = {
  DEFAULT: 'default',
  TIME: 'time',
  PRICE: 'price',
};

export const POINT_TYPES = [
  'taxi', 'bus', 'train', 'ship',
  'drive', 'flight', 'check-in',
  'sightseeing', 'restaurant'];

export const BackgroundColorChart = {
  taxi: 'rgba(255, 179, 25, 0.7)',
  bus: 'rgba(249, 132, 4, 0.7)',
  train: 'rgba(246, 174, 153, 0.7)',
  ship: 'rgba(61, 178, 255, 0.7)',
  drive: 'rgba(18, 93, 152, 0.7)',
  flight: 'rgba(57, 162, 219, 0.7)',
  ['check-in']: 'rgba(222, 186, 157, 0.7)',
  sightseeing: 'rgba(121, 180, 183, 0.7)',
  restaurant: 'rgba(191, 216, 184, 0.7)',
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE POINT',
  ADD_POINT: 'ADD POINT',
  DELETE_POINT: 'DELETE POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const FilterType = {
  EVERYTHING: 'everything',
  PAST: 'past',
  FUTURE: 'future',
};

export const MenuItem = {
  TABLE: 'TABLE',
  STATS: 'STATS',
};

export const StoreName = {
  POINTS: `bigtrip-points-localstorage-${STORE_VER}`,
  OFFERS: `bigtrip-offers-localstorage-${STORE_VER}`,
  DESTINATIONS: `bigtrip-destinations-localstorage-${STORE_VER}`,
};
