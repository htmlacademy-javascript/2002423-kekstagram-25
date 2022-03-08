import {isNonNegativeInt} from './validation.js';

function getRandomInt(min, max) {
  if (!isNonNegativeInt(min) || !isNonNegativeInt(max)) {
    throw new Error('Аргументы должны быть неотрицательными целыми числами');
  }
  if (min >= max) {
    throw new Error('Минимальное значение должно быть меньше максимального');
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export {getRandomInt};
