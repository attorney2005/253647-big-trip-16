import {generatePoint} from './mock/task.js';
import BoardPresenter from './presenter/board-presenter';

const POINTS_COUNT = 3;
const points = Array.from({length: POINTS_COUNT}, generatePoint);

new BoardPresenter().init(points);

