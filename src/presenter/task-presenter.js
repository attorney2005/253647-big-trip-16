import PointView from '../view/point-view';
import NewPointView from '../view/new-point-view';
import {RenderPosition} from '../const.js';
import {render} from '../render.js';

export default class TaskPresenter {
  #pointListContainer = null;

  #pointComponent = null;
  #pointEditComponent = null;
  #eventsElementList = null;
  #point = null;

  constructor(pointListContainer) {
    this.#pointListContainer = pointListContainer;
  }

  init = (point) => {
    this.#point = point;
    this.#pointComponent = new PointView(point);
    this.#pointEditContainer = new NewPointView(point);
    this.#eventsElementList = this.#mainElement.querySelector('.trip-events__list');

    this.#pointComponent, setrollupButtonClickHandler(this.#handleClick);
    this.#pointEditComponent, setsafeButtonClickHandler(this.#handleSafe);
    this.#pointEditComponent, setresetButtonClickHandler(this.#handleReset);

    render(this.#pointListContainer, this.#pointComponent, RenderPosition.BEFOREEND);
  };

  #replacePointToForm = () => {
    this.#eventsElementList.replaceChild(this.#pointEditComponent.element, this.#pointComponent.element);
    document.removeEventListener('keydown', onEscKeyDown);
  };

  #replaceFormToPoint = () => {
    this.#eventsElementList.replaceChild(this.#pointComponent.element, this.#pointEditContainer.element);
    document.removeEventListener('keydown', onEscKeyDown);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #handleClick = () => {
    this.#replacePointToForm();
  }

  #handleSafe = () => {
    this.#replaceFormToPoint();
  }

  #handleReset =() => {
    this.#replaceFormToPoint();
  }
}

