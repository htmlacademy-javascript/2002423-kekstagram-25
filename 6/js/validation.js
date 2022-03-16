function isStringLengthValid(stringValue, maxLength) {
  if (typeof stringValue !== 'string' || !isNonNegativeInt(maxLength)) {
    return false;
  }
  return stringValue.length <= maxLength;
}

function isNonNegativeInt(value) {
  return Number.isInteger(value) && value >= 0;
}

export {isStringLengthValid, isNonNegativeInt};
