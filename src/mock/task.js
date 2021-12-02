import dayjs from 'dayjs';
import {getRandomInteger} from '/utils.js';

const generatePointType = () => {
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

const priceGeneration = () => getRandomInteger(0, 1000);


const generateOffers = () => {
  const titles = ['Upgrade to a business class', 'Choose the radio station'];

  return {
    type: generatePointType(),
    offers: Array.from({ length: getRandomInteger(2, 4) }, (_, i) => ({
      id: i,
      title: titles[i],
      price: priceGeneration()
    }))
  };
};

const generatePictures = () => Array.from({ length: getRandomInteger(1, 3) }, () => ({
  src: `http://picsum.photos/248/152?r=${getRandomInteger(1, 5)}`,
  description: 'Chamonix parliament building'
}));

const generateDestination = () => {
  const destinations = [
    'Amsterdam',
    'Chamonix',
    'Geneva',
  ];
  return {
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: destinations[getRandomInteger(0, 2)],
    pictures: generatePictures()
  };
};

const generateTravelDateCheckIn = () => dayjs(new Date()).format('DD MMMM');

const generateTravelDateCheckOut = () => dayjs(new Date()).add(4, 'day').format('DD MMMM');

export const generatePoint = () => ({
  destination: generateDestination(),
  pointType: generatePointType(),
  dateCheckIn: generateTravelDateCheckIn(),
  dateCheckOut: generateTravelDateCheckOut(),
  price: priceGeneration(),
  offers: generateOffers(),
  isFavorite: Boolean(getRandomInteger(0, 1)),
});
