function getRandomInt(min, max) {
  if (!isNonNegativeNumber(min) || !isNonNegativeNumber(max)) {
    throw new Error('Аргументы должны быть неотрицательными числами');
  }
  if (min >= max) {
    throw new Error('Минимальное значение должно быть меньше максимального');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isStringLengthValid(stringValue, maxLength) {
  if (typeof stringValue !== 'string' || !isNonNegativeNumber(maxLength)) {
    return false;
  }
  return stringValue.length <= maxLength;
}

function isNonNegativeNumber(value) {
  return typeof value === 'number' && value >= 0;
}

getRandomInt(1, 2);
isStringLengthValid('123', 3);
