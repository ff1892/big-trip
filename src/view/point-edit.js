import he from 'he';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import dayjs from 'dayjs';

import SmartView from './smart.js';
import {getNumeralDate} from '../utils/time.js';
import {getLastWordFromString} from '../utils/components.js';
import {POINT_TYPES} from '../const.js';
import {DESTINATIONS} from '../mock/point-destination.js';

const DatepickerSettings = {
  enableTime: true,
  ['time_24hr']: true,
  dateFormat: 'd/m/y H:i',
};

const createOfferTemplate = (id, offer, offers) => (
  `<div class="event__offer-selector">
  <input class="event__offer-checkbox visually-hidden"
  id="event-offer-${getLastWordFromString(offer.title)}-${id}"
  type="checkbox"
  name="event-offer-${getLastWordFromString(offer.title)}"
  ${offers.includes(offer) ? 'checked' : ''} data-id="${offer.title}">

  <label class="event__offer-label"
  for="event-offer-${getLastWordFromString(offer.title)}-${id}">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </label>
  </div>`
);

const createOffersListTemplate = (type, id, offers, offerData) => {
  const currentOffers = offerData.find((currentOffer) => currentOffer.type === type).offers;
  return !currentOffers.length
    ? ''
    : `<section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
  <div class="event__available-offers">
  ${currentOffers.map((offer) =>
    createOfferTemplate(id, offer, offers))
    .join('')}
  </div>
  </section>`;
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

const createDestinationTemplate = (city, destinationData) => {
  const currentDestination = destinationData.find((destination) => destination.name === city);
  return !(currentDestination.description.length || currentDestination.pictures.length)
    ? ''
    : `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${currentDestination.description}</p>
    ${createPicturesTemplate(currentDestination.pictures)}
    </section>`;
};

const createDestinationListTemplate = (destinationsList, id) => {
  const destinationList = destinationsList.map((destinationItem) =>
    `<option value="${destinationItem}"></option>`)
    .join('');
  return `<datalist id="destination-list-${id}">${destinationList}</datalist>`;
};

const createTypeTemplate = (pointType, id, type) => (
  `<div class="event__type-item">
    <input id="event-type-${pointType}-${id}"
      class="event__type-input visually-hidden"
      type="radio"
      name="event-type"
      value="${pointType}"
      ${pointType === type ? 'checked' : ''}
    >
    <label class="event__type-label  event__type-label--${pointType}"
      for="event-type-${pointType}-${id}">
      ${pointType[0].toUpperCase() + pointType.slice(1)}
    </label>
  </div>`
);

const createTypeListTemplate = (pointTypes, id, type) => (
  pointTypes.map((pointType) => createTypeTemplate(pointType, id, type)).join('')
);

const createPointEditTemplate = (point, offerData, destinationData, isNew) => {
  const {type, dateFrom, dateTo, price, offers, destination, id} = point;
  const destinationNames = destinationData.map((destinationItem) => destinationItem.name);

  const offersListTemplate = createOffersListTemplate(type, id, offers, offerData);
  const destinationTemplate = destination
    ? createDestinationTemplate(destination.name, destinationData)
    : '';
  const destinationListTemplate = createDestinationListTemplate(destinationNames, id);
  const typeListTemplate = createTypeListTemplate(POINT_TYPES, id, type);

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="${type[0].toUpperCase() + type.slice(1)} type icon">
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
          <input class="event__input  event__input--destination"
            id="event-destination-${id}"
            type="text" name="event-destination"
            value="${destination ? (he.encode(destination.name)) : ''}"
            list="destination-list-${id}">
          ${destinationListTemplate}
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getNumeralDate(dateFrom)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getNumeralDate(dateTo)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-${id}">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${price}">
        </div>
        <button class="event__save-btn  btn  btn--blue" type="submit" ${!destination ? 'disabled' : ''}>
          Save
        </button>
        <button class="event__reset-btn" type="reset">
          ${isNew ? 'Cancel' : 'Delete'}
        </button>

        ${!isNew ? `<button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
          </button>` : ''}


      </header>
      <section class="event__details">
        ${offersListTemplate}
        ${destinationTemplate}
      </section>
    </form>
  </li>`;
};

export default class PointEdit extends SmartView {
  constructor(point, offerData, destinationData, isNew = false) {
    super();
    this._data = PointEdit.parsePointToData(point);
    this._offerData = offerData;
    this._destinationData = destinationData;
    this._isNew = isNew;
    this._datepickerStart = null;
    this._datepickerEnd = null;

    this._editClickHandler = this._editClickHandler.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._nameChangeHandler = this._nameChangeHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);
    this._offersChangeHandler = this._offersChangeHandler.bind(this);
    this._dateStartChangeHandler = this._dateStartChangeHandler.bind(this);
    this._dateEndChangeHandler = this._dateEndChangeHandler.bind(this);

    this._setDatePickerStart();
    this._setDatePickerEnd();
    this._setInnerHandlers();
  }

  getTemplate() {
    return createPointEditTemplate(this._data, this._offerData, this._destinationData, this._isNew);
  }

  reset(point) {
    this.updateData(
      PointEdit.parsePointToData(point),
    );
  }

  _typeChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value,
    });
  }

  _nameChangeHandler(evt) {
    if (DESTINATIONS.includes(evt.target.value)) {
      this.updateData({
        destination: {
          name: evt.target.value,
        },
      });
      return;
    }
    this.getElement()
      .querySelector('.event__save-btn')
      .disabled = true;
  }

  _priceChangeHandler(evt) {
    const inputValue = parseInt(evt.target.value, 10);
    const saveButton = this.getElement().querySelector('.event__save-btn');

    if (inputValue) {
      saveButton.disabled = false;
      this.updateData({
        price: inputValue,
      }, true);
      return;
    }

    saveButton.disabled = true;
  }

  _offersChangeHandler(evt) {
    const checkedInputs = evt.currentTarget.querySelectorAll('.event__offer-checkbox:checked');
    const avaliableOffers = this._offerData.find((offerItems) => offerItems.type === this._data.type).offers;
    const selectedOffers = [...checkedInputs].map((input) => avaliableOffers.find((offer) => offer.title === input.dataset.id));
    this.updateData({
      offers: selectedOffers,
    }, true);
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
    this._callback.submit(PointEdit.parseDataToPoint(this._data));
  }

  setSubmitHandler(callback) {
    this._callback.submit = callback;
    this.getElement().querySelector('.event--edit').addEventListener('submit', this._submitHandler);
  }

  _deleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.delete(PointEdit.parseDataToPoint(this._data));
  }

  setDeleteClickHandler(callback) {
    this._callback.delete = callback;
    this.getElement().querySelector('.event--edit').addEventListener('reset', this._deleteClickHandler);
  }

  _setDatePickerStart() {
    if (this._datepickerStart) {
      this._datepickerStart.destroy();
      this._datepickerStart = null;
    }

    this._datepickerStart = flatpickr(
      this.getElement().querySelector('#event-start-time-1'),
      Object.assign(
        {},
        DatepickerSettings,
        {
          onClose: this._dateStartChangeHandler,
          defaultDate: this._data.dateFrom,
        },
      ),
    );
  }

  _setDatePickerEnd() {
    if (this._datepickerEnd) {
      this._datepickerEnd.destroy();
      this._datepickerEnd = null;
    }

    this._datepickerEnd = flatpickr(
      this.getElement().querySelector('#event-end-time-1'),
      Object.assign(
        {},
        DatepickerSettings,
        {
          onClose: this._dateEndChangeHandler,
          defaultDate: this._data.dateTo,
          minDate: this._data.dateFrom,
        },
      ),
    );
  }

  _dateStartChangeHandler([userDate]) {
    this.updateData({
      dateFrom: userDate,
    });

    if (dayjs(this._data.dateFrom)
      .diff(dayjs(this._data.dateTo)) >= 0)
    {
      this.updateData({
        dateTo: userDate,
      });

      this.getElement().querySelector('.event__save-btn')
        .setAttribute('disabled', 'disabled');
    }
  }

  _dateEndChangeHandler([userDate]) {
    this.updateData({
      dateTo: userDate,
    });
  }

  removeElement() {
    super.removeElement();

    if (this._datepickerStart) {
      this._datepickerStart.destroy();
      this._datepickerStart = null;
    }

    if (this._datepickerEnd) {
      this._datepickerEnd.destroy();
      this._datepickerEnd = null;
    }
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.event__input--destination')
      .addEventListener('change', this._nameChangeHandler);
    this.getElement()
      .querySelector('.event__type-group')
      .addEventListener('change', this._typeChangeHandler);
    this.getElement()
      .querySelector('.event__input--price')
      .addEventListener('change', this._priceChangeHandler);

    if (this.getElement().querySelector('.event__available-offers')) {
      this.getElement()
        .querySelector('.event__available-offers')
        .addEventListener('change', this._offersChangeHandler);
    }
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatePickerStart();
    this._setDatePickerEnd();
    this.setDeleteClickHandler(this._callback.delete);
    this.setSubmitHandler(this._callback.submit);
    if (!this._isNew) {
      this.setEditClickHandler(this._callback.editClick);
    }
  }

  static parsePointToData(point) {
    return Object.assign({}, point);
  }

  static parseDataToPoint(data) {
    return Object.assign({}, data);
  }
}
