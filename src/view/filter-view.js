import AbstractView from './abstract-view';

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

export default class FiltersView extends AbstractView {
  #defaultSort = null;
  constructor(defaultSort) {
    super();
    this.#defaultSort = defaultSort;
  }
  get template() {
    return createFiltersTemplate(this.#defaultSort);
  }
}

