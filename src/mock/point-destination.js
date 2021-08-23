import {getRandomInteger} from '../utils/common.js';

const DESTINATIONS = ['Rome', 'Naples', 'Venice', 'Turin', 'Palermo', 'Florence'];
const PICTURES_COUNT_MIN = 0;
const PICTURES_COUNT_MAX = 5;
const BASIC_PICTURE_SRC = 'http://picsum.photos/248/152?r=';

const descriptionText = {
  Florence:
    'Florence was a centre of medieval European trade and finance and one of the wealthiest cities of that era. It is considered by many academics to have been the birthplace of the Renaissance, and has been called "the Athens of the Middle Ages.',
  Palermo:
    'The city was founded in 734 BC by the Phoenicians as Ziz. Palermo then became a possession of Carthage. Two Greek colonies were established, known collectively as Panormos; the Carthaginians used this name on their coins after the 5th century BC.',
  Turin:
    'A city and an important business and cultural centre in northern Italy. It is the capital city of Piedmont and of the Metropolitan City of Turin, and was the first Italian capital from 1861 to 1865.',
  Venice:
    '',
  Naples:
    'The regional capital of Campania and the third-largest city of Italy, after Rome and Milan, with a population of 967,069 within the city\'s administrative limits as of 2017.',
  Rome:
    'Is the capital city and a special comune of Italy (named Comune di Roma Capitale), as well as the capital of the Lazio region. The city has been a major human settlement for almost three millennia.',
};

const getPicture = (destinationName) => {
  const picture = {
    src: `${BASIC_PICTURE_SRC}${getRandomInteger(0,99)}`,
    description: `Photo of ${destinationName}`,
  };
  return picture;
};

const getPicturesList = (destinationName) => {
  const picturesCount = getRandomInteger(PICTURES_COUNT_MIN, PICTURES_COUNT_MAX);
  const picturesList = new Array(picturesCount).fill(null).map(() => getPicture(destinationName));
  return picturesList;
};

const getDestination = (destinationName) => {
  const destination = {
    name: destinationName,
    description: descriptionText[destinationName],
    pictures: getPicturesList(destinationName),
  };
  return destination;
};

const getDestinationsList = (destinations) => destinations.map((city) => getDestination(city));


const destinationData = getDestinationsList(DESTINATIONS);

export {
  DESTINATIONS,
  destinationData
};
