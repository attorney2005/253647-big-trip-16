import SiteMenuView from './view/menu-view.js';
import FiltersTemplate from './view/filter-view.js';
import SortTemplate from './view/sort.js';
import NewPointTemplate from './view/new-point.js';
import PointTemplate from './view/point-view.js';
import NoPointView from './view/no-point-view.js';
// import PointsListItemView from './view/points-list-item.js';
import PointsListView from './view/points-list.js';
import {generatePoint} from './mock/task.js';
import {generateFilter} from './mock/filter.js';
// import {DEFAULT_VALUE} from './const.js';

import {render, RenderPosition} from './render.js';
import {SORTING} from './const';

const POINTS_COUNT = 3;
const points = Array.from({length: POINTS_COUNT}, generatePoint);
const filters = generateFilter(points);

const headerElement = document.querySelector('.trip-main__trip-controls');
const navHeaderElement = headerElement.querySelector('.trip-controls__navigation');
const filtersHeaderElement = headerElement.querySelector('.trip-controls__filters');


const renderPoint = (pointListElement, point) => {
  const pointComponent = new PointTemplate(point);
  const pointEditComponent = new NewPointTemplate(point);

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

  pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replacePointToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.element.querySelector('.event__save-btn').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(pointListElement, pointComponent.element, RenderPosition.BEFOREEND);
};


render(navHeaderElement, new SiteMenuView().element, RenderPosition.BEFOREEND);
render(filtersHeaderElement, new FiltersTemplate(filters).element, RenderPosition.BEFOREEND);

const mainElement = document.querySelector('.page-main');
const eventsElementContainer = document.querySelector('.trip-events');

render(eventsElementContainer, new SortTemplate(SORTING[0]).element, RenderPosition.BEFOREEND);
render(eventsElementContainer, new PointsListView().element, RenderPosition.BEFOREEND);

const eventsElementList = mainElement.querySelector('.trip-events__list');

// render(eventsElementList, new NewPointTemplate(points[0]).element, RenderPosition.BEFOREEND);

// for (let i = 0; i < POINTS_COUNT; i++) {
//   renderPoint(eventsElementList, points[i]);
//   // render(eventsElementList, new PointTemplate(points[i]).element, RenderPosition.BEFOREEND);
// }

if (!points.length) {
  render(eventsElementList, new NoPointView().element);
} else {
  render(eventsElementContainer, new SortTemplate().element);
  render(eventsElementContainer, new PointsListView().element);
  const eventsListElement = eventsElementContainer.querySelector('.trip-events__list');
  for (const point of points) {
    renderPoint(eventsListElement, point);
  }
}
