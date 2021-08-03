import {getRandomInteger, getShuffledArray} from '../util.js';

const OFFERS = ['Add luggage', 'Switch to comfort', 'Add meal', 'Choose seats', 'Travel by train'];
const OFFERS_COUNT_MIN = 1;
const OFFERS_COUNT_MAX = 3;
const MIN_OFFER_PRICE = 1;
const MAX_OFFER_PRICE = 200;
const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const getOfferOptions = () => {
  const options = getShuffledArray(OFFERS).slice(0, getRandomInteger(OFFERS_COUNT_MIN, OFFERS_COUNT_MAX));
  const offerOptions = options.map((value) => (
    {
      title: value,
      price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE),
    }
  ));
  return offerOptions;
};

const getOffer = (type) => (
  {
    type,
    offers: getOfferOptions(),
  }
);

const getOfferList = () => {
  const offerList = EVENT_TYPES.map((value) => getOffer(value));
  return offerList;
};

const offerData = getOfferList();

const getOffersForEvent = (type) => {
  for (const offer of offerData) {
    if (offer.type === type) {
      return offer.offers;
    }
  }
};

export {EVENT_TYPES, getOffersForEvent};
