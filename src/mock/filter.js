import dayjs from 'dayjs';

const isExpiringTodayAfter = (date) => dayjs(date).isAfter(dayjs(), 'D');
const isExpiringTodayBefore = (date) => dayjs(date).isBefore(dayjs(), 'D');

const pointFilterMap = {
  everything: (points) => points,
  future: (points) => points.filter((point) => isExpiringTodayAfter(point.date)),
  past: (points) => points.filter((point) => isExpiringTodayBefore(point.date)),
};

export const generateFilter = (points) => Object.entries(pointFilterMap).map(
  ([filterName, countTasks]) => ({
    name: filterName,
    count: countTasks(points),
  }),
);
