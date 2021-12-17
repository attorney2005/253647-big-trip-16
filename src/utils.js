export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const createElement = (template) => {
  const newElement = document.createElement('div'); // 1
  newElement.innerHTML = template; // 2

  return newElement.firstChild; // 3
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

// const getWeightForNullDate = (dateA, dateB) => {
//   if (dateA === null && dateB === null) {
//     return 0;
//   }
//
//   if (dateA === null) {
//     return 1;
//   }
//
//   if (dateB === null) {
//     return -1;
//   }
//
//   return null;
// };
//
// export const sortTaskUp = (taskA, taskB) => {
//   const weight = getWeightForNullDate(taskA.dueDate, taskB.dueDate);
//
//   return weight ?? dayjs(taskA.dueDate).diff(dayjs(taskB.dueDate));
// };
//
// export const sortTaskDown = (taskA, taskB) => {
//   const weight = getWeightForNullDate(taskA.dueDate, taskB.dueDate);
//
//   return weight ?? dayjs(taskB.dueDate).diff(dayjs(taskA.dueDate));
// };
