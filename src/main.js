import {createSiteMenuTemplate} from './view/menu-view.js';
import {createFiltersTemplate} from './view/filter-view.js';
import {createSortTemplate} from './view/sort.js';
import {createNewPointTemplate} from './view/new-point.js';
import {createPointTemplate} from './view/point-view.js';
import {createPointsListItemTemplate} from './view/points-list-item.js';
import {createPointsListTemplate} from './view/points-list.js';
import {generatePoint} from './mock/task.js';
import {generateFilter} from './mock/filter.js';
// import {DEFAULT_VALUE} from './const.js';

import {renderTemplate, RenderPosition} from './render.js';
import {SORTING} from './const';

const POINTS_COUNT = 3;
const points = Array.from({length:POINTS_COUNT}, generatePoint);
const filters = generateFilter(points);

const headerElement = document.querySelector('.trip-main__trip-controls');
const navHeaderElement = headerElement.querySelector('.trip-controls__navigation');
const filtersHeaderElement = headerElement.querySelector('.trip-controls__filters');

renderTemplate(navHeaderElement, createSiteMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(filtersHeaderElement, createFiltersTemplate(filters), RenderPosition.BEFOREEND);

const mainElement = document.querySelector('.page-main');
const eventsElementContainer = document.querySelector('.trip-events');

renderTemplate(eventsElementContainer, createSortTemplate(SORTING[0]), RenderPosition.BEFOREEND);
renderTemplate(eventsElementContainer, createPointsListTemplate (), RenderPosition.BEFOREEND);

const eventsElementList = mainElement.querySelector('.trip-events__list');

renderTemplate(eventsElementList, createPointsListItemTemplate(createNewPointTemplate(points[0])), RenderPosition.BEFOREEND);
for (let i = 0; i < POINTS_COUNT; i++) {
  renderTemplate(eventsElementList, createPointsListItemTemplate(createPointTemplate(points[i])), RenderPosition.BEFOREEND);
}
