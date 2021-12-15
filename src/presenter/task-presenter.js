import PointView from '../view/point-view';
import NewPointView from '../view/new-point-view';
import {RenderPosition} from '../const.js';
import {render, replace, remove} from '../render.js';

export default class TaskPresenter {
  #pointListContainer = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #eventsElementList = null;
  #mainElement = null;

  #point = null;

  constructor(pointListContainer) {
    this.#pointListContainer = pointListContainer;
  }

  init = (point) => {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView(point);
    this.#pointEditComponent = new NewPointView(point);

    this.#mainElement = document.querySelector('.page-main');
    this.#eventsElementList = this.#mainElement.querySelector('.trip-events__list');

    this.#pointComponent.setrollupButtonClickHandler(this.#handleClick);
    this.#pointEditComponent.setsafeButtonClickHandler(this.#handleSafe);
    this.#pointEditComponent.setresetButtonClickHandler(this.#handleReset);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointListContainer, this.#pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#pointListContainer.element.contains(prevPointEditComponent.element)) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  };

  #replacePointToForm = () => {
    this.#eventsElementList.replaceChild(this.#pointEditComponent.element, this.#pointComponent.element);
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #replaceFormToPoint = () => {
    this.#eventsElementList.replaceChild(this.#pointComponent.element, this.#pointEditComponent.element);
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #handleClick = () => {
    this.#replacePointToForm();
  };

  #handleSafe = () => {
    this.#replaceFormToPoint();
  };

  #handleReset = () => {
    this.#replaceFormToPoint();
  };
}

