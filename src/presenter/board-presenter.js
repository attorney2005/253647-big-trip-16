// import SiteMenuView from './view/menu-view.js';
// import FiltersView from './view/filter-view.js';
// import SortView from './view/sort-view.js';
// import NewPointView from './view/new-point-view.js';
// import PointView from './view/point-view.js';
// import NoPointView from './view/no-point-view.js';
// import PointsListView from './view/points-list-view.js';
// import {generatePoint} from './mock/task.js';
// import {generateFilter} from './mock/filter.js';
// import {RenderPosition} from './const.js';
// import {render} from './render.js';
//
// POINTS_COUNT = 3;
//
// export default class BoardPresenter {
//   #boardContainer = null;
//
//
//   #sortComponent = new SortView();
//   #pointListComponent = new PointsListView();
//   #noPointComponent = new NoPointView();
//
//   #boardPoints = [];
//
//   constructor(boardContainer) {
//     this.#boardContainer = boardContainer;
//   }
//
//   init = (boardPoints) => {
//     this.#boardPoints = [...boardPoints];
//     // Метод для инициализации (начала работы) модуля,
//     // малая часть текущей функции renderBoard в main.js
//   }
//
//   #renderSort = () => {
//     // Метод для рендеринга сортировки
//     render(this.#boardComponent, this.#sortComponent, RenderPosition.AFTERBEGIN);
//   }
//
//   #renderPoint = (point) => {
//     // Метод, куда уйдёт логика созданию и рендерингу компонетов задачи,
//     // текущая функция renderTask в main.js
//
//   }
//
//   #renderPoints = () => {
//     // Метод для рендеринга N-задач за раз
//   }
//
//   #renderNoPoints = () => {
//     // Метод для рендеринга заглушки
//     render(this.#boardComponent, this.#noTaskComponent, RenderPosition.AFTERBEGIN);
//   }
// }
