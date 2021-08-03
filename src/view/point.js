import {getHumanizedDuration, getNumeralDate, getTimefromDate, getDateAttribute, getDateTimeAttribute, getHumanizedDate} from '../util.js';

export const createPointTemplate = (point) => {
  const {type, name, isFavorite, dateFrom, dateTo, price, offers} = point;

  const isFavoviteMap = new Map([
    [true, 'event__favorite-btn--active'],
    [false, ''],
  ]);

  const createSelectedOffersTemplate = (offers) => {
    let selectedOffers = '';
    for (const offer of offers) {
      selectedOffers += `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
      </li>`
    }
    return `<h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
    ${selectedOffers}
    </ul>`
  }

  const renderSelectedOffers = (offers) => {
    return (offers.length) ? createSelectedOffersTemplate(offers) : '';
  }

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${getDateAttribute(dateFrom)}">${getHumanizedDate(dateFrom)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="${type.charAt(0).toUpperCase()}${type.slice(1)} icon">
      </div>
      <h3 class="event__title">${type} ${name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${getDateTimeAttribute(dateFrom)}">${getTimefromDate(dateFrom)}</time>
          &mdash;
          <time class="event__end-time" datetime="${getDateTimeAttribute(dateTo)}">${getTimefromDate(dateTo)}</time>
        </p>
        <p class="event__duration">${getHumanizedDuration(dateFrom, dateTo)}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      ${renderSelectedOffers(offers)}
      <button class="event__favorite-btn ${isFavoviteMap.get(isFavorite)}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
};
