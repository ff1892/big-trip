import AbstractComponentView from './abstract-component.js';
import {getNumeralDate} from '../utils/time.js';
import {getLastWordFromString} from '../utils/components.js';
import {DESTINATIONS, pointDefault} from '../mock/point-data.js';
import {POINT_TYPES} from '../const.js';

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

const createOffersListTemplate = (hasOfferList, offersData, offerList, id) =>
  !hasOfferList
    ? ''
    : `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
    ${offersData.map((offer) =>
    createOfferTemplate(id, offer, offerList))
    .join('')}
    </div>
    </section>`;


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

const createDestinationTemplate = (hasDescription, description, picturesList) => !hasDescription
  ? ''
  : `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>
    ${createPicturesTemplate(picturesList)}
    </section>`;

const createDestinationListTemplate = (destinationsList, id) => {
  const destinationList = destinationsList.map((destinationItem) =>
    `<option value="${destinationItem}"></option>`)
    .join('');
  return `<datalist id="destination-list-${id}">${destinationList}</datalist>`;
};

const createTypeTemplate = (pointType, id, type) => (`<div class="event__type-item">
    <input id="event-type-${pointType}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}" ${pointType === type ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-${id}">
    ${pointType.charAt(0).toUpperCase()}${pointType.slice(1)}</label></div>`);

const createTypeListTemplate = (pointTypes, id, type) => (
  pointTypes.map((pointType) => createTypeTemplate(pointType, id, type)).join('')
);

const createPointEditTemplate = (point) => {
  const {type, dateFrom, dateTo, price, offers,
    hasDescription, destination, id, hasOfferList, eventOffers} = point;
  const {description, pictures, name} = destination;

  const offersListTemplate = createOffersListTemplate(hasOfferList, eventOffers, offers, id);
  const destinationTemplate = createDestinationTemplate(hasDescription, description, pictures);
  const destinationListTemplate = createDestinationListTemplate(DESTINATIONS, id);
  const typeListTemplate = createTypeListTemplate(POINT_TYPES, id, type);

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
              ${typeListTemplate}
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
  constructor(point = pointDefault, offerData, destinationData) {
    super();
    this._data = PointEdit.parsePointToData(point, offerData);
    this._offerData = offerData;
    this._destinationData = destinationData;

    this._editClickHandler = this._editClickHandler.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
    this._nameChangeHandler = this._nameChangeHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createPointEditTemplate(this._data);
  }

  updateData(update, noUpdatingElement = false) {
    if(!update) {
      return;
    }

    this._data = Object.assign(
      {},
      this._data,
      update,
    );

    if (noUpdatingElement) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();
    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
  }

  _nameChangeHandler(evt) {
    evt.preventDefault();
    const currentDestination = this._pickCurrentDestination(evt.target.value);
    this.updateData({
      destination:
        currentDestination,
      hasDescription: currentDestination.description.length || currentDestination.pictures.length,
    });
  }

  _typeChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value,
      offers: [],
      eventOffers: this._pickEventOffers(evt.target.value),
    });
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

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.event__input--destination')
      .addEventListener('change', this._nameChangeHandler);
    this.getElement()
      .querySelector('.event__type-group')
      .addEventListener('change', this._typeChangeHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setEditClickHandler(this._callback.editClick);
    this.setSubmitHandler(this._callback.submit);
  }

  _pickCurrentDestination(name) {
    return this._destinationData.find((destination) => destination.name === name);
  }

  _pickEventOffers(type) {
    return this._offerData.find((offer) => offer.type === type).offers;
  }

  static parsePointToData(point, offerData) {
    return Object.assign(
      {},
      point,
      {
        hasOfferList:!!offerData.find((offer) =>
          offer.type === point.type).offers.length,
        eventOffers: offerData.find((offer) =>
          offer.type === point.type).offers,
        hasDescription: !!(point.destination.description.length || point.destination.pictures.length),
      },
    );
  }

  static parseDataToPoint(data) {
    data = Object.assign({}, data);

    delete data.hasOfferList;
    delete data.eventOffers;
    delete data.hasDescription;

    return data;
  }
}
