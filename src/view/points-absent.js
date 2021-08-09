import {createElement} from '../utils/util-render.js';

const createPointsEmptyTemplate = (message) => (
  `<p class="trip-events__msg">${message}</p>`
);

export default class PointsAbsent {
  constructor(message) {
    this._element = null;
    this._message = message;
  }

  getTemplate() {
    return createPointsEmptyTemplate(this._message);
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
