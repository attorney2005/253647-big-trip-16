import dayjs from 'dayjs';


export const getDuration = (point) => dayjs.duration(point.endDate.diff(point.startDate));
