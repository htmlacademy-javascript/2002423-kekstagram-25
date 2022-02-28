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

let commentsCount = 0;

const MESSAGE_LIST = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const COMMENTATOR_LIST = [
  'Артём',
  'Дима',
  'Кира',
  'Маша',
  'Саша',
  'Даша'
];

const IMAGE_DESCRIPTION_LIST = [
  'Любимое увлечение',
  'Сквозь зеркала',
  'Обрученные холодом',
  'Театр',
  'Спуск на сноуборде',
  'Природа родного края',
  'Первоклассница',
  'Поход',
  'Современный город',
  'Я вспоминаю сотни ответов…'
];

const getRandomArrayElement = (elements) => (
  elements[getRandomInt(0, elements.length - 1)]
);

function getRandomLikesCount() {
  return getRandomInt(15, 200);
}

const createComment = (idx) => (
  {
    id: ++commentsCount,
    avatar: `img/avatar-${idx}.svg`,
    message: getRandomArrayElement(MESSAGE_LIST),
    name: COMMENTATOR_LIST[idx]
  }
);

const getRandomCommentsCount = () => (
  getRandomInt(1, MESSAGE_LIST.length)
);

const createImage = (idx) => (
  {
    id: idx,
    url: `photos/${idx}.jpg`,
    description: getRandomArrayElement(IMAGE_DESCRIPTION_LIST),
    likes: getRandomLikesCount(),
    comments: Array.from({length: getRandomCommentsCount()}, (v, i) => createComment(i))
  }
);

isStringLengthValid('123', 3);

Array.from({length: 25}, (v, i) => createImage(i + 1));
