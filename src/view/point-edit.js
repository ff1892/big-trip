import AbstractComponentView from './abstract-component.js';
import {getNumeralDate} from '../utils/time.js';
import {getLastWordFromString} from '../utils/components.js';
import {getOffersForEvent, offerData} from '../mock/point-offer.js';
import {DESTINATIONS, pointDefault} from '../mock/point-data.js';

const createOfferTemplate = (id, offer, offerList) => (`<div class="event__offer-selector">
  <input class="event__offer-checkbox visually-hidden"
  id="event-offer-${getLastWordFromString(offer.title)}-${id}"
  type="checkbox" name="event-offer-${getLastWordFromString(offer.title)}"
  ${offerList.includes(offer) ? 'checked' : ''}>

  <label class="event__offer-label"
  for="event-offer-${getLastWordFromString(offer.title)}-${id}">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </label>
  </div>`
);

const createOffersListTemplate = (id, offersData, offerList) => {
  return !offersData.length
  ? ''
  : `<section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
  <div class="event__available-offers">
  ${offersData.map((offer) =>
      createOfferTemplate(id, offer, offerList))
      .join('')}
  </div>
  </section>`
};


const createPicturesTemplate = (picturesList) => {
  if (!picturesList.length) {
    return '';
  }

  const picturesTemplate = picturesList.map((picture) => (`<img class="event__photo"
      src="${picture.src}" alt="${picture.description}"></img>`))
      .join('');

  return `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${picturesTemplate}
    </div>
    </div>`;
};

const createDestinationTemplate = (destination, description, picturesList) => {
  return destination === ''
  ? ''
  : `<section class="event__section  event__section--destination">
  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
  <p class="event__destination-description">${description}</p>
  ${createPicturesTemplate(picturesList)}
  </section>`
};

const createDestinationListTemplate = (destinationsList, id) => {
  const destinationList = destinationsList.map((destinationItem) =>
    `<option value="${destinationItem}"></option>`)
    .join('');
  return `<datalist id="destination-list-${id}">${destinationList}</datalist>`;
};


const createPointEditTemplate = (point) => {
  const {type, name, dateFrom, dateTo, price, offers, destination, id} = point;
  const {description, pictures} = destination;

  const eventOffers = getOffersForEvent(type, offerData);
  const offersListTemplate = createOffersListTemplate(id, eventOffers, offers);
  const destinationTemplate = createDestinationTemplate(destination, description, pictures);
  const destinationListTemplate = createDestinationListTemplate(DESTINATIONS, id);

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
          ${destinationListTemplate}
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
        ${offersListTemplate}
        ${destinationTemplate}
      </section>
    </form>
  </li>`;
};

export default class PointEdit extends AbstractComponentView {
  constructor(point = pointDefault) {
    super();
    this._point = point;

    this._editClickHandler = this._editClickHandler.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
  }

  getTemplate() {
    return createPointEditTemplate(this._point);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this._callback.submit();
  }

  setSubmitHandler(callback) {
    this._callback.submit = callback;
    this.getElement().querySelector('.event--edit').addEventListener('submit', this._submitHandler);
  }
}
