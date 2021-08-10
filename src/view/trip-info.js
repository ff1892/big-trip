import AbstractComponentView from './abstract-component.js';

const createTripInfoTemplate = () => '<section class="trip-main__trip-info trip-info"></section>';

export default class TripInfo extends AbstractComponentView {
  getTemplate() {
    return createTripInfoTemplate();
  }
}
