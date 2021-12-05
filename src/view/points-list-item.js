import {createElement} from '../render';


/**
 * @param {String} itemContent
 * @returns {String}
 */
const createPointsListItemTemplate = (itemContent) => (
  `<li class="trip-events__item">
    ${itemContent}
  </li>`
);

export default class PointsListItemView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createPointsListItemTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}

