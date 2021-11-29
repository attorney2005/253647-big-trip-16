import flatpickr from 'flatpickr';

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateDestination = () => {
  const destinations = [
    'Amsterdam',
    'Chamonix',
    'Geneva',
  ];
  const randomIndex = getRandomInteger(0, destinations.length - 1);
  return destinations[randomIndex];
};

const generatePointTipe = () => {
  const pointTypes = [
    'Taxi',
    'Bus',
    'Train',
    'Ship',
    'Drive',
    'Flight',
    'Check-in',
    'Sightseeing',
    'Restaurant'
  ];
  const randomIndex = getRandomInteger(0, pointTypes.length - 1);
  return pointTypes[randomIndex];
};

const generateTravelDateCheckIn = () => {
  const randomTimeCheckIn = getRandomInteger(1, 31);
  const config = {
    enableTime: true,
    dateFormat: 'Y-m-d H:i',
  };
  return flatpickr(randomTimeCheckIn, config);
};

const generateTravelDateCheckOut = () => {
  const randomTimeCheckOut = getRandomInteger(1, 31);
  // if (randomTimeCheckOut < randomTimeCheckIn) {
  //   return null;
  const config = {
    enableTime: true,
    dateFormat: 'Y-m-d H:i',
  };
  return flatpickr(randomTimeCheckOut, config);
  // }
};

const priceGeneration = () => getRandomInteger(0, 1000);

export const generatePoint = () => ({
  destination: generateDestination(),
  pointType: generatePointTipe(),
  dateCheckIn: generateTravelDateCheckIn(),
  dateCheckOut: generateTravelDateCheckOut(),
  price: priceGeneration(),
});
