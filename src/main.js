import SiteMenuView from './view/menu-view.js';
import FiltersView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import NewPointView from './view/new-point-view.js';
import PointView from './view/point-view.js';
import NoPointView from './view/no-point-view.js';
import PointsListView from './view/points-list-view.js';
import {generatePoint} from './mock/task.js';
import {generateFilter} from './mock/filter.js';
import {RenderPosition} from './const.js';
import {render} from './render.js';

const POINTS_COUNT = 3;
const points = Array.from({length: POINTS_COUNT}, generatePoint);
const filters = generateFilter(points);

const headerElement = document.querySelector('.trip-main__trip-controls');
const navHeaderElement = headerElement.querySelector('.trip-controls__navigation');
const filtersHeaderElement = headerElement.querySelector('.trip-controls__filters');


const renderPoint = (pointListElement, point) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new NewPointView(point);

  const replacePointToForm = () => {
    pointListElement.replaceChild(pointEditComponent.element, pointComponent.element);
  };

  const replaceFormToPoint = () => {
    pointListElement.replaceChild(pointComponent.element, pointEditComponent.element);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointComponent.setRollupButtonClickHandler(() => {
    replacePointToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.setSafeButtonClickHandler(() => {
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.setResetButtonClickHandler(() => {
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(pointListElement, pointComponent, RenderPosition.BEFOREEND);
};
render(navHeaderElement, new SiteMenuView(), RenderPosition.BEFOREEND);
render(filtersHeaderElement, new FiltersView(filters), RenderPosition.BEFOREEND);

const mainElement = document.querySelector('.page-main');
const eventsElementContainer = document.querySelector('.trip-events');

render(eventsElementContainer, new PointsListView(), RenderPosition.BEFOREEND);

if (!points.length) {
  render(eventsElementContainer, new NoPointView());
} else {
  render(eventsElementContainer, new SortView());
  render(eventsElementContainer, new PointsListView());
  const eventsElementList = mainElement.querySelector('.trip-events__list');
  for (const point of points) {
    renderPoint(eventsElementList, point);
  }
}

