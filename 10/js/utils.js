import {isNonNegativeInt} from './validation.js';

const ALERT_SHOW_TIME = 5000;

function getRandomInt(min, max) {
  if (!isNonNegativeInt(min) || !isNonNegativeInt(max)) {
    throw new Error('Аргументы должны быть неотрицательными целыми числами');
  }
  if (min >= max) {
    throw new Error('Минимальное значение должно быть меньше максимального');
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const isEscapeKey = (evt) => (
  evt.key === 'Escape'
);


const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;
  document.body.append(alertContainer);
  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomInt, isEscapeKey, showAlert};
