import AbstractComponentView from './abstract-component.js';

const createPointsEmptyTemplate = (message) => (
  `<p class="trip-events__msg">${message}</p>`
);

export default class NoPoints extends AbstractComponentView {
  constructor(message) {
    super();
    this._message = message;
  }

  getTemplate() {
    return createPointsEmptyTemplate(this._message);
  }
}
