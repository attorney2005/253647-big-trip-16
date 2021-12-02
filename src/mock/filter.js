import dayjs from 'dayjs';

// const isExpiringTodayAfter = (date) => dayjs(date).isAfter(dayjs(), 'D');
// const isExpiringTodayBefore = (date) => dayjs(date).isBefore(dayjs(), 'D');

// const isExpiringTodayAfter = (date) => (dayjs(date), 'D');
// const isExpiringTodayBefore = (date) => (dayjs(date), 'D');


// const pointFilterMap = {
//   everything: (points) => points,
//   future: (points) => points.filter((point) => isExpiringTodayAfter(point.date)),
//   past: (points) => points.filter((point) => isExpiringTodayBefore(point.date)),
// };

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
