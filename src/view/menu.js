import AbstractComponentView from './abstract-component.js';
import {MenuItem} from '../const.js';

const createMenuTemplate = (currentMenuItem) => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn
      ${currentMenuItem === MenuItem.TABLE ? 'trip-tabs__btn--active' : ''}"
      data-menu-item="${MenuItem.TABLE}"
      href="#">
      Table
    </a>
    <a class="trip-tabs__btn
      ${currentMenuItem === MenuItem.STATS ? 'trip-tabs__btn--active' : ''}"
      data-menu-item="${MenuItem.STATS}"
      href="#">
      Stats
    </a>
  </nav>`
);

export default class Menu extends AbstractComponentView {
  constructor(menuItem) {
    super();
    this._menuItem = menuItem;

    this._menuClickHandler = this._menuClickHandler.bind(this);

  }

  getTemplate() {
    return createMenuTemplate(this._menuItem);
  }

  _menuClickHandler(evt) {
    const selectedMenu = evt.target.dataset.menuItem;
    if (evt.target.tagName !== 'A' || selectedMenu === this._menuItem) {
      return;
    }

    evt.preventDefault();
    this._menuItem = selectedMenu;
    this._callback.menuClick(selectedMenu);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }
}
