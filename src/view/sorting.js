import {SortingType} from '../const.js';
import AbstractComponentView from './abstract-component.js';

const createSortingTemplate = () => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <div class="trip-sort__item  trip-sort__item--day">
      <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" data-sort-type="${SortingType.DEFAULT}" checked>
      <label class="trip-sort__btn" for="sort-day">Day</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--event">
      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
      <label class="trip-sort__btn" for="sort-event">Event</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--time">
      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" data-sort-type="${SortingType.TIME}">
      <label class="trip-sort__btn" for="sort-time">Time</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--price">
      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" data-sort-type="${SortingType.PRICE}">
      <label class="trip-sort__btn" for="sort-price">Price</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--offer">
      <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
      <label class="trip-sort__btn" for="sort-offer">Offers</label>
    </div>
  </form>`
);

export default class Sorting extends AbstractComponentView {
  constructor() {
    super();

    this._handleSortingTypeChange = this._handleSortingTypeChange.bind(this);
  }

  getTemplate() {
    return createSortingTemplate();
  }

  _handleSortingTypeChange(evt) {
    evt.preventDefault();
    this._callback.sortingTypeChange(evt.target.dataset.sortType);
  }

  setSortingTypeChangeHandler(callback) {
    this._callback.sortingTypeChange = callback;
    this.getElement().addEventListener('change', this._handleSortingTypeChange);
  }
}
