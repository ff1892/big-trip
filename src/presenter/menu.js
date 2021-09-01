import MenuView from '../view/menu.js';
import {MenuItem} from '../const.js';
import {render, replace, remove, RenderPosition} from '../utils/render.js';

export default class Menu {
  constructor() {
    this._tripMenuContainer = document.querySelector('.trip-controls__navigation');
    this._currentMenu = MenuItem.TABLE;
    this._menuComponent = null;

    this._handleMenuClick = this._handleMenuClick.bind(this);
  }

  init(menuClickHandler) {
    const prevMenuComponent = this._menuComponent;
    this._menuComponent = new MenuView(this._currentMenu);
    this._menuComponent.setMenuClickHandler(this._handleMenuClick);
    this._menuClickHandler = menuClickHandler;

    if (prevMenuComponent === null) {
      render(this._tripMenuContainer, this._menuComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._menuComponent, prevMenuComponent);
    remove(prevMenuComponent);
  }

  _handleMenuClick(menuItem) {
    this._currentMenu = menuItem;
    this._menuClickHandler(this._currentMenu);

    this.init(this._menuClickHandler);
  }

  reset() {
    this._handleMenuClick(MenuItem.TABLE);
  }
}
