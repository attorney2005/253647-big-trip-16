import dayjs from 'dayjs';

export const isPointFuture = (date) => dayjs().isBefore(date, 'D');

export const  pointFilterMap = {
  everything: (points) =>points,
  future: (points) => points.filter((point) => isPointFuture(point.startDate)),
  past: (points) => points.filter((point) => !isPointFuture(point.startDate))
};

export const generateFilter = (points) => Object.entries(pointFilterMap).map(
  ([filterName, countTasks]) => ({
    name: filterName,
    count: countTasks(points),
  }),
);
