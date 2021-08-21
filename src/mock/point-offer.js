import {getRandomInteger, getShuffledArray} from '../utils/common.js';

const OFFERS = ['Add luggage', 'Switch to comfort', 'Add meal', 'Choose seats', 'Travel by train', 'VIP service'];
const OFFERS_COUNT_MIN = 0;
const OFFERS_COUNT_MAX = 6;
const CHOOSEN_OFFERS_COUNT_MIN = 0;
const CHOOSEN_OFFERS_COUNT_MAX = 4;
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

const getOffersForEvent = (type, data) => {
  const offersForEvents = data.find((offer) => offer.type === type);
  return offersForEvents ? offersForEvents.offers : '';
};


const getChoosenOffers = (type, data) => {
  const events = getOffersForEvent(type, data);
  return events.slice(0, getRandomInteger(CHOOSEN_OFFERS_COUNT_MIN, CHOOSEN_OFFERS_COUNT_MAX));
};

export {
  EVENT_TYPES,
  offerData,
  getChoosenOffers
};
