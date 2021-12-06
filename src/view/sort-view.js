import {createElement} from '../render.js';
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

export default class SortTemplate{
  #element = null;
  #defaultSort = null;

  constructor(defaultSort) {
    this.#defaultSort = defaultSort;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createSortTemplate(this.#defaultSort);
  }

  removeElement() {
    this.#element = null;
  }
}