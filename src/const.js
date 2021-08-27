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
};

export const FilterType = {
  EVERYTHING: 'everything',
  PAST: 'past',
  FUTURE: 'future',
};
