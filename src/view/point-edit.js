import {createElement} from '../common/utils-render';
import {getNumeralDate, getLastWordFromString} from '../util.js';
import {getOffersForEvent} from '../mock/point-offer.js';
import {DESTINATIONS, pointDefault} from '../mock/point-data.js';

const createPointEditTemplate = (point) => {
  const {type, name, dateFrom, dateTo, price, offers, destination, id} = point;
  const {description, pictures} = destination;
  const eventOffers = getOffersForEvent(type);

  const isSelectedOffer = (offer) => offers.includes(offer);

  const createOfferTemplate = (offer) => (`<div class="event__offer-selector">
    <input class="event__offer-checkbox visually-hidden" id="event-offer-${getLastWordFromString(offer.title)}-${id}" type="checkbox" name="event-offer-${getLastWordFromString(offer.title)}" ${isSelectedOffer(offer) ? 'checked' : ''}>
    <label class="event__offer-label" for="event-offer-${getLastWordFromString(offer.title)}-${id}">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
    </div>`);

  const createOffersListTemplate = (offersData) => {
    const offersList = offersData.map((offer) => createOfferTemplate(offer)).join('');
    return (`<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
        ${offersList}
        </div>
      </section>`);
  };

  const renderOffers = () => eventOffers.length ? createOffersListTemplate(eventOffers) : '';

  const createPicturesTemplate = (picturesList) => {
    const picturesTemplate = picturesList.map((picture) => (`<img class="event__photo"
      src="${picture.src}" alt="${picture.description}"></img>`))
      .join('');

    return `<div class="event__photos-container">
      <div class="event__photos-tape">
        ${picturesTemplate}
      </div>
    </div>`;
  };

  const renderPictures = () => pictures.length ? createPicturesTemplate(pictures) : '';

  const createDestinationTemplate = () => (`<section class="event__section  event__section--destination">
  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
  <p class="event__destination-description">${description}</p>
  ${renderPictures()}
  </section>`);

  const renderDestination = () => destination !== '' ? createDestinationTemplate() : '';

  const createDestinationListTemplate = (list) => {
    const destinationList = list.map((destinationItem) => `<option value="${destinationItem}"></option>`).join('');
    return `<datalist id="destination-list-${id}">${destinationList}</datalist>`;
  };

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="${type.charAt(0).toUpperCase()}${type.slice(1)} type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>

              <div class="event__type-item">
                <input id="event-type-taxi-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-${id}">Taxi</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-bus-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                <label class="event__type-label  event__type-label--bus" for="event-type-bus-${id}">Bus</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-train-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                <label class="event__type-label  event__type-label--train" for="event-type-train-${id}">Train</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-ship-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                <label class="event__type-label  event__type-label--ship" for="event-type-ship-${id}">Ship</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-transport-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
                <label class="event__type-label  event__type-label--transport" for="event-type-transport-${id}">Transport</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-drive-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                <label class="event__type-label  event__type-label--drive" for="event-type-drive-${id}">Drive</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-flight-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                <label class="event__type-label  event__type-label--flight" for="event-type-flight-${id}">Flight</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-check-in-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-${id}">Check-in</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-sightseeing-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-${id}">Sightseeing</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-restaurant-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-${id}">Restaurant</label>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${id}">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${name}" list="destination-list-${id}">
          ${createDestinationListTemplate(DESTINATIONS)}
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-${id}">From</label>
          <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${getNumeralDate(dateFrom)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-${id}">To</label>
          <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${getNumeralDate(dateTo)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-${id}">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${renderOffers()}
        ${renderDestination()}
      </section>
    </form>
  </li>`;
};

export default class PointEdit {
  constructor(point = pointDefault) {
    this._element = null;
    this._point = point;
  }

  getTemplate() {
    return createPointEditTemplate(this._point);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
