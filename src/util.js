const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayValue = (array) => array[getRandomInteger(0, array.length - 1)];

const getShuffledArray = (array) => {
  const shuffledArrayCopy = [...array];
  return shuffledArrayCopy.sort(() => getRandomInteger(0, 2) - 1);
};

export {
  getRandomInteger,
  getRandomArrayValue,
  getShuffledArray
};
