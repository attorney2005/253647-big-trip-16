import dayjs from 'dayjs';
import SmartView from './smart-view.js';
// import flatpickr from 'flatpickr';
import {OFFERS} from '/src/const.js';
const BLANK_POINT = {
  price: '',
  cities: '',
  timeStart: '',
  timeEnd: '',
  destination: {
    name: '',
    destinationInfo: '',
    pictures: [],
  },
  offer: {
    type: '',
    offers: [],
  },
  offersList: [],
};

const createPictureTemplate = (
  pictures
) => `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${pictures
    .map(
      ({src}) =>
        `<img class="event__photo" src='${src}' alt="Event photo"/>`
    )
    .join('')}
    </div>
  </div>`;

const createOfferTemplate = (
  offers
) => `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
        ${offers
    .map(
      ({id, title, price}) => `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="${id}-1" type="checkbox" name="${id}" checked>
          <label class="event__offer-label" for="${id}-1">
            <span class="event__offer-title">${title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${price}</span>
          </label>
        </div>`
    )
    .join('')}
      </div>
  </section>`;

const createNewPointTemplate = (point) => {
  const {price, type, timeStart, timeEnd, destination, offers} = point;

  const offerTemplate = offers.length ? createOfferTemplate(offers) : '';
  const pictureTemplate = destination.pictures
    ? createPictureTemplate(destination.pictures)
    : '';
  const resetBtnText = price ? 'Delete' : 'Cancel';
  const getCloseEditFormBtn = () => {
    if (!price) {
      return;
    }
    return `
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    `;
  };

  return `<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/bus.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>

            <div class="event__type-item">
              <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" checked>
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
              <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight">
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
             ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
        <datalist id="destination-list-1">
          <option value="Amsterdam"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(timeStart).format('YY/MM/DD HH:mm')}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(timeEnd).format('YY/MM/DD HH:mm')}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">${resetBtnText}</button>
        ${getCloseEditFormBtn()}
    </header>

    <section class="event__details">
      ${offerTemplate}
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destination.description}</p>
         ${pictureTemplate}
      </section>
    </section>
  </form>`;
};

export default class NewPointView extends SmartView {
  // #datepickerStartTime = null;
  // #datepickerEndTime = null;

  constructor(point = BLANK_POINT) {
    super();
    this._data = NewPointView.parsePointToData(point);
    this.#setInnerHandlers();
  }

  get template() {
    return createNewPointTemplate(this._data);
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setSubmitHandler(this._callback.editSubmit);
    this.setEditHandler(this._callback.editClick);
  };

  removeElement() {
    super.removeElement();
  }

  reset = (point) => {
    this.updateData(NewPointView.parsePointToData(point));
  };

  setEditHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editHandler);
  };

  setSubmitHandler = (callback) => {
    this._callback.editSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#submitHandler);
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#cityChangeHandler);
    this.element.querySelector('.event__type-list').addEventListener('change', this.#typeChangeHandler);
  };

  #cityChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      city: evt.target.value,
    }, true);
  }

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value,
      offer: OFFERS.find(({eventType}) => evt.target.value === eventType).offers,
    });
  }

  #editHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };

  #submitHandler = (evt) => {
    evt.preventDefault();
    this._callback.editSubmit(NewPointView.parseDataToPoints(this._data));
  };

  setsafeButtonClickHandler = (callback) => {
    this._callback.safeClick = callback;
    this.element.querySelector('.event__save-btn').addEventListener('submit', this.#safeButtonClickHandler);
  };

  #safeButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.safeClick();
  };

  setresetButtonClickHandler = (callback) => {
    this._callback.resetClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#resetButtonClickHandler);
  };

  #resetButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.resetClick();
  };

  static parsePointToData = (point) => ({...point});
  static parseDataToPoints = (data) => ({...data});
}
