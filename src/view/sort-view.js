import AbstractView from './abstract-view';
import {SORTING} from '../const.js';

const createSortTemplate = (defaultSort) => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${SORTING.map((item) => `<div class="trip-sort__item  trip-sort__item--${item}">
      <input
        id="sort-${item}"
        class="trip-sort__input visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${item}"
        ${defaultSort === item ? 'checked' : ''}
        ${SORTING[1] === item || SORTING[4] === item ? 'disabled' : ''}>
      <label class="trip-sort__btn" for="sort-${item}">${item}</label>
    </div>`).join('')}
  </form>`
);

export default class SortView extends AbstractView {
  #defaultSort = null;
  constructor(defaultSort) {
    super();
    this.#defaultSort = defaultSort;
  }
  get template() {
    return createSortTemplate(this.#defaultSort);
  }
}
