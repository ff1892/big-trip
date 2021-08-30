import {UpdateType} from '../const.js';
import {render, replace, remove, RenderPosition} from '../utils/render.js';
import FilterView from '../view/filters.js';

export default class Filter {
  constructor(filterModel, pointsModel) {
    this._tripFilters = document.querySelector('.trip-controls__filters');

    this._filterModel = filterModel;
    this._pointsModel = pointsModel;
    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterChange = this._handleFilterChange.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(this._filterModel.getFilter());
    this._filterComponent.setFilterChangeHandler(this._handleFilterChange);

    if (prevFilterComponent === null) {
      render(this._tripFilters, this._filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterChange(filterType) {
    if (this._filterModel.getFilter() === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }
}
