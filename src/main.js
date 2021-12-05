import SiteMenuView from './view/menu-view.js';
import FiltersTemplate from './view/filter-view.js';
import {createSortTemplate} from './view/sort.js';
import NewPointTemplate from './view/new-point.js';
import PointTemplate from './view/point-view.js';
import PointsListItemView from './view/points-list-item.js';
import PointsListView from './view/points-list.js';
import {generatePoint} from './mock/task.js';
import {generateFilter} from './mock/filter.js';
// import {DEFAULT_VALUE} from './const.js';

import {renderTemplate, renderElement, RenderPosition} from './render.js';
import {SORTING} from './const';

const POINTS_COUNT = 3;
const points = Array.from({length:POINTS_COUNT}, generatePoint);
const filters = generateFilter(points);

const headerElement = document.querySelector('.trip-main__trip-controls');
const navHeaderElement = headerElement.querySelector('.trip-controls__navigation');
const filtersHeaderElement = headerElement.querySelector('.trip-controls__filters');

renderElement(navHeaderElement, new SiteMenuView().element, RenderPosition.BEFOREEND);
renderElement(filtersHeaderElement, new FiltersTemplate(filters).element, RenderPosition.BEFOREEND);

const mainElement = document.querySelector('.page-main');
const eventsElementContainer = document.querySelector('.trip-events');

renderTemplate(eventsElementContainer, createSortTemplate(SORTING[0]), RenderPosition.BEFOREEND);
renderElement(eventsElementContainer, new PointsListView().element, RenderPosition.BEFOREEND);

const eventsElementList = mainElement.querySelector('.trip-events__list');

renderElement(eventsElementList, new NewPointTemplate(points[0]).element, RenderPosition.BEFOREEND);

for (let i = 0; i < POINTS_COUNT; i++) {
  renderElement(eventsElementList, new PointTemplate(points[i]).element, RenderPosition.BEFOREEND);
}
