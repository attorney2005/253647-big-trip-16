import SortView from '../view/sort-view.js';
import NewPointView from '../view/new-point-view.js';
import PointView from '../view/point-view.js';
import NoPointView from '../view/no-point-view.js';
import PointsListView from '../view/points-list-view.js';
import {generateFilter} from '../mock/filter.js';
import {RenderPosition} from '../const.js';
import {render} from '../render.js';
import SiteMenuView from '../view/menu-view';
import FiltersView from '../view/filter-view';
import TaskPresenter from './task-presenter';

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

  constructor() {
  }

  init = (boardPoints) => {
    this.#boardPoints = [...boardPoints];
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

  #renderSort = () => {
    render(this.#eventsContainerElement, this.#sortComponent);
  };

  #renderPoint = (point) => {
    // const pointComponent = new PointView(point);
    // const pointEditComponent = new NewPointView(point);
    // const eventsElementList = this.#mainElement.querySelector('.trip-events__list');
    //
    // const replacePointToForm = () => {
    //   eventsElementList.replaceChild(pointEditComponent.element, pointComponent.element);
    // };
    //
    // const replaceFormToPoint = () => {
    //   eventsElementList.replaceChild(pointComponent.element, pointEditComponent.element);
    // };
    //
    // const onEscKeyDown = (evt) => {
    //   if (evt.key === 'Escape' || evt.key === 'Esc') {
    //     evt.preventDefault();
    //     replaceFormToPoint();
    //     document.removeEventListener('keydown', onEscKeyDown);
    //   }
    // };
    //
    // pointComponent.setrollupButtonClickHandler(() => {
    //   replacePointToForm();
    //   document.addEventListener('keydown', onEscKeyDown);
    // });
    //
    // pointEditComponent.setsafeButtonClickHandler(() => {
    //   replaceFormToPoint();
    //   document.removeEventListener('keydown', onEscKeyDown);
    // });
    //
    // pointEditComponent.setresetButtonClickHandler(() => {
    //   replaceFormToPoint();
    //   document.removeEventListener('keydown', onEscKeyDown);
    // });
    //
    //
    // render(eventsElementList, pointComponent, RenderPosition.BEFOREEND);

    const taskPresenter = new TaskPresenter(this.#pointListComponent);
    taskPresenter.init(point);
  };

  #renderPoints = () => {
    for (const point of this.#boardPoints) {
      this.#renderPoint(point);
    }
  };

  #renderPointList = () => {
    render(this.#eventsContainerElement, this.#pointListComponent, RenderPosition.BEFOREEND);
  };

  #renderNoPoints = () => {
    render(this.#eventsContainerElement, this.#noPointsComponent);
  };
}
