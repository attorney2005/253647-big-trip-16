import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import PointsListView from '../view/points-list-view.js';
import {generateFilter} from '../mock/filter.js';
import {RenderPosition} from '../const.js';
import {render} from '../render.js';
import SiteMenuView from '../view/menu-view';
import FiltersView from '../view/filter-view';
import PointPresenter from './point-presenter';
import {updateItem} from '/src/utils.js';
import {sortByPrice, sortByTime} from '/src/utils.js';
import {SortType} from '../const.js';

export default class BoardPresenter {


  /* Components */
  #sortComponent = new SortView();
  #noPointsComponent = new NoPointView();
  #pointListComponent = new PointsListView();
  #menuComponent = new SiteMenuView();
  #filtersComponent = null;

  /* Elements */
  #mainElement = document.querySelector('.page-main');
  #eventsContainerElement = document.querySelector('.trip-events');

  /* Header elements */
  #headerElement = document.querySelector('.trip-main__trip-controls');
  #navHeaderElement = this.#headerElement.querySelector('.trip-controls__navigation');
  #filtersHeaderElement = this.#headerElement.querySelector('.trip-controls__filters');

  /* Data */
  #boardPoints = [];
  #filters = [];
  #taskPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedBoardPoints = [];

  constructor() {
  }

  init = (boardPoints) => {
    this.#boardPoints = [...boardPoints];
    this.#sourcedBoardPoints = [...boardPoints];
    this.#filters = generateFilter(this.#boardPoints);
    this.#filtersComponent = new FiltersView(this.#filters);

    render(this.#navHeaderElement, this.#menuComponent, RenderPosition.BEFOREEND);
    render(this.#filtersHeaderElement, this.#filtersComponent, RenderPosition.BEFOREEND);

    if (!this.#boardPoints.length) {
      this.#renderNoPoints();
    } else {
      this.#renderSort();
      this.#renderPointList();
      this.#renderPoints();
    }
  };

  #handleModeChange = () => {
    this.#taskPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);
    this.#taskPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoints = (sortType) => {

    switch (sortType) {
      case SortType.PRICE:
        this.#boardPoints.sort(sortByPrice);
        break;

      case SortType.TIME:
        this.#boardPoints.sort(sortByTime);
        break;

      default:
        this.#boardPoints = [...this.#sourcedBoardPoints];
    }

    this.#currentSortType = sortType;
  };


  #handleSortTypeChange = (sortType) => {
    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPointList();
  };

  #renderSort = () => {
    render(this.#eventsContainerElement, this.#sortComponent);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderPoint = (point) => {
    const taskPresenter = new PointPresenter(this.#pointListComponent, this.#handlePointChange, this.#handleModeChange);
    taskPresenter.init(point);
    this.#taskPresenter.set(point.id, taskPresenter);
  };

  #renderPoints = () => {
    for (const point of this.#boardPoints) {
      this.#renderPoint(point);
    }
  };

  #clearPointList = () => {
    this.#taskPresenter.forEach((presenter) => presenter.destroy());
    this.#taskPresenter.clear();
  };

  #renderPointList = () => {
    render(this.#eventsContainerElement, this.#pointListComponent, RenderPosition.BEFOREEND);
  };

  #renderNoPoints = () => {
    render(this.#eventsContainerElement, this.#noPointsComponent);
  };
}
