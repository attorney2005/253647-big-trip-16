import PointView from '../view/point-view';
import NewPointView from '../view/new-point-view';
import {RenderPosition} from '../const.js';
import {render, replace, remove} from '../render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class TaskPresenter {
  #pointListContainer = null;
  #changeData = null;
  #changeMode = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #eventsElementList = null;
  #mainElement = null;

  #point = null;
  #mode = Mode.DEFAULT;

  constructor(pointListContainer, changeData, changeMode) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
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
    this.#pointComponent.setfavoriteClickHandler(this.#handleFavoriteClick);
    this.#pointEditComponent.setsafeButtonClickHandler(this.#handleSafe);
    this.#pointEditComponent.setresetButtonClickHandler(this.#handleReset);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointListContainer, this.#pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  }

  #replacePointToForm = () => {
    this.#eventsElementList.replaceChild(this.#pointEditComponent.element, this.#pointComponent.element);
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToPoint = () => {
    this.#eventsElementList.replaceChild(this.#pointComponent.element, this.#pointEditComponent.element);
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.DEFAULT;
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };


  #handleFavoriteClick = () => {
    this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite});
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

