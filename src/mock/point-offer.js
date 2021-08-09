import {getRandomInteger, getShuffledArray} from '../utils/util-random.js';

const OFFERS = ['Add luggage', 'Switch to comfort', 'Add meal', 'Choose seats', 'Travel by train', 'VIP service'];
const OFFERS_COUNT_MIN = 0;
const OFFERS_COUNT_MAX = 6;
const MIN_OFFER_PRICE = 1;
const MAX_OFFER_PRICE = 200;
const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const getOfferOptions = () => {
  const options = getShuffledArray(OFFERS);
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

const getChoosenOffers = (type) => {
  const events = getOffersForEvent(type);
  return events.slice(0, getRandomInteger(OFFERS_COUNT_MIN, OFFERS_COUNT_MAX));
};

export {
  EVENT_TYPES,
  getOffersForEvent,
  getChoosenOffers
};
