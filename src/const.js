import dayjs from 'dayjs';

const EVENT_DEFAULT = 'flight';
const STORE_VER = 'v14';

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
