const createFilterItemTemplate = (filter, isChecked) => {
  const {name, count} = filter;
  return (
    `<input
      id="filter__${name}"
      class="trip-filters__filter-input  visually-hidden"
      type="radio"
      name="filter"
      value="filter"
      ${isChecked ? 'checked' : ''}
      ${count === 0 ? 'disabled' : ''}
    />
  <label class="trip-filters__filter-label"
    for="filter__${name}">${name}</label>`
  );
};

export const createFiltersTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems.map((filter, index) => createFilterItemTemplate(filter, index === 0)).join('');

  return `<form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
  </form>`;
};

