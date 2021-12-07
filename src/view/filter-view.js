import {createElement} from '../render.js';

const createFilterItemTemplate = (filter, isChecked) => {
  const {name, count} = filter;
  return (
    `<div class="trip-filters__filter">
      <input
      id="filter-${name}"
      class="trip-filters__filter-input  visually-hidden"
      type="radio"
      name="filter"
      value="filter"
      ${isChecked ? 'checked' : ''}
      ${count === 0 ? 'disabled' : ''}
      />
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    </div>`
  );
};

const createFiltersTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems.map((filter, index) => createFilterItemTemplate(filter, index === 0)).join('');

  return `<form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
  </form>`;
};


export default class FiltersView {
  #element = null;
  #filters = null;

  constructor(filters) {
    this.#filters = filters;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFiltersTemplate(this.#filters);
  }

  removeElement() {
    this.#element = null;
  }
}
