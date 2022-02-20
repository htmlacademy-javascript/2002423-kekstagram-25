function getRandomInt(min, max) {
  if (!isNonNegativeInt(min) || !isNonNegativeInt(max)) {
    throw new Error('Аргументы должны быть неотрицательными целыми числами');
  }
  if (min >= max) {
    throw new Error('Минимальное значение должно быть меньше максимального');
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function isStringLengthValid(stringValue, maxLength) {
  if (typeof stringValue !== 'string' || !isNonNegativeInt(maxLength)) {
    return false;
  }
  return stringValue.length <= maxLength;
}

function isNonNegativeInt(value) {
  return Number.isInteger(value) && value >= 0;
}

getRandomInt(1, 2);
isStringLengthValid('123', 3);
