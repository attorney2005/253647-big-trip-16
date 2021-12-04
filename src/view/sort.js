// export const createSortTemplate = () => (
//
//   `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
//             <div class="trip-sort__item  trip-sort__item--day">
//               <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>
//               <label class="trip-sort__btn" for="sort-day">Day</label>
//             </div>
//
//             <div class="trip-sort__item  trip-sort__item--event">
//               <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
//               <label class="trip-sort__btn" for="sort-event">Event</label>
//             </div>
//
//             <div class="trip-sort__item  trip-sort__item--time">
//               <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
//               <label class="trip-sort__btn" for="sort-time">Time</label>
//             </div>
//
//             <div class="trip-sort__item  trip-sort__item--price">
//               <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
//               <label class="trip-sort__btn" for="sort-price">Price</label>
//             </div>
//
//             <div class="trip-sort__item  trip-sort__item--offer">
//               <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
//               <label class="trip-sort__btn" for="sort-offer">Offers</label>
//             </div>
//           </form>`
// );


import {SORTING} from '../const.js';
// import {createElement} from '../render.js';

export const createSortTemplate = (defaultSort) => (
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

// export const createSortTemplate = (sortItems = {}) => {
//   return `<section class="trip-events">
//           <h2 class="visually-hidden">Trip events</h2>
//
//     </section>`
// };
