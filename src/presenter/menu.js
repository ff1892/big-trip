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

  init(clickTableHandler, clickStatsHandler) {
    const prevMenuComponent = this._menuComponent;
    this._menuComponent = new MenuView(this._currentMenu);
    this._menuComponent.setMenuClickHandler(this._handleMenuClick);
    this._clickTableHandler = clickTableHandler;
    this._clickStatsHandler = clickStatsHandler;

    if (prevMenuComponent === null) {
      render(this._tripMenuContainer, this._menuComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._menuComponent, prevMenuComponent);
    remove(prevMenuComponent);
  }

  _handleMenuClick(menuItem) {
    switch (menuItem) {
      case MenuItem.TABLE:
        this._clickTableHandler();
        break;
      case MenuItem.STATS:
        this._clickStatsHandler();
        break;
    }
    this._currentMenu = menuItem;
    this.init(this._clickTableHandler, this._clickStatsHandler);
  }

  reset() {
    this._currentMenu = MenuItem.TABLE;
    this.init(this._clickTableHandler, this._clickStatsHandler);
    this._clickTableHandler();
  }
}
