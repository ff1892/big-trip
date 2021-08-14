import {getRandomInteger, getRandomArrayValue, getShuffledArray} from '../utils/util-common.js';

const DESCRIPTION_TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus';

const DESCRIPTION_LENGTH_MIN = 1;
const DESCRIPTION_LENGTH_MAX = 5;

const PICTURES_COUNT_MIN = 0;
const PICTURES_COUNT_MAX = 5;
const BASIC_PICTURE_SRC = 'http://picsum.photos/248/152?r=';

const getDestinationDescription = () => {
  const desciptionArray = DESCRIPTION_TEXT.split('. ');
  const descriptionArrayShuffled = getShuffledArray(desciptionArray);
  const descriptionLength = getRandomInteger(DESCRIPTION_LENGTH_MIN, DESCRIPTION_LENGTH_MAX);
  const descriptionArraySliced = descriptionArrayShuffled.slice(0, descriptionLength);
  const generatedDescription = `${descriptionArraySliced.join('. ')}.`;
  return generatedDescription;
};

const getPictureDescription = () => {
  const descriptionArray = DESCRIPTION_TEXT.split('. ');
  return getRandomArrayValue(descriptionArray);
};

const getPicture = () => {
  const picture = {
    src: `${BASIC_PICTURE_SRC}${getRandomInteger(0,99)}`,
    description: getPictureDescription(),
  };
  return picture;
};

const getPicturesList = () => {
  const picturesCount = getRandomInteger(PICTURES_COUNT_MIN, PICTURES_COUNT_MAX);
  const picturesList = new Array(picturesCount).fill(null).map(() => getPicture());
  return picturesList;
};

const generateDestination = (destinationName) => {
  const destination = {
    name: destinationName,
    description: getDestinationDescription(),
    pictures: getPicturesList(),
  };
  return destination;
};

export {generateDestination};
