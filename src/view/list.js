import AbstractComponentView from './abstract-component.js';

const createEventsListTemplate = () => '<ul class="trip-events__list">';

export default class List extends AbstractComponentView {
  getTemplate() {
    return createEventsListTemplate();
  }
}
