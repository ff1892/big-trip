export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomArrayValue = (array) => array[getRandomInteger(0, array.length - 1)];

export const getShuffledArray = (array) => {
  const shuffledArrayCopy = [...array];
  return shuffledArrayCopy.sort(() => getRandomInteger(0, 2) - 1);
};

export const generateOrNot = (generatingFunction, generatingFunctionArgument) => {
  const random = getRandomInteger();
  return random === 1 ? generatingFunction(generatingFunctionArgument) : '';
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
