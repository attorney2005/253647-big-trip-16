import {createSiteMenuTemplate} from './view/menu-view.js';
import {createFiltersTemplate} from './view/filter-view.js';
import {sort} from './view/sort.js';
import {newPoint} from './view/new-point.js';
import {createPointTemplate} from './view/point-view.js';
import {createPointsListItemTemplate} from './view/points-list-item.js';
import {createPointsListTemplate} from './view/points-list.js';

import {renderTemplate, RenderPosition} from './render.js';

const POINTS_COUNT = 3;

const headerElement = document.querySelector('.trip-main__trip-controls');
const navHeaderElement = headerElement.querySelector('.trip-controls__navigation');
const filtersHeaderElement = headerElement.querySelector('.trip-controls__filters');

renderTemplate(navHeaderElement, createSiteMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(filtersHeaderElement, createFiltersTemplate(), RenderPosition.BEFOREEND);

const mainElement = document.querySelector('.page-main');
const eventsElementContainer = document.querySelector('.trip-events');

renderTemplate(eventsElementContainer, sort(), RenderPosition.BEFOREEND);
renderTemplate(eventsElementContainer, createPointsListTemplate (), RenderPosition.BEFOREEND);


const eventsElementList = mainElement.querySelector('.trip-events__list');

renderTemplate(eventsElementList, createPointsListItemTemplate(newPoint()), RenderPosition.BEFOREEND);
for (let i = 0; i < POINTS_COUNT; i++) {
  renderTemplate(eventsElementList, createPointsListItemTemplate(createPointTemplate()), RenderPosition.BEFOREEND);
}
