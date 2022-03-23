import {isEscapeKey} from './utils.js';

const HASH_TAG_MAX_LENGTH = 20;
const HASH_TAGS_MAX_COUNT = 5;
const COMMENT_MAX_LENGTH = 140;

const frmUpload = document.querySelector('.img-upload__form');
const uploadDialog = document.querySelector('#upload-file');
const frmContent = document.querySelector('.img-upload__overlay');
const btnUploadCancel = document.querySelector('#upload-cancel');
const hashTagsField = document.querySelector('.text__hashtags');
const commentsField = document.querySelector('.text__description');
const btnSubmit = document.querySelector('.img-upload__submit');
const validHashTagTemplate = /^#[A-Za-zА-яЁё0-9]+$/;

const pristine = new Pristine(frmUpload, {
  classTo: 'form__item',
  errorClass: 'text__label--error',
  errorTextParent: 'form__item',
  errorTextTag: 'p'
});

const onSubmit = () => {
  hashTagsField.value = hashTagsField.value.trim();
};

const onEditEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement === commentsField) {
      evt.stopPropagation();
      return;
    }
    closeForm();
  }
};

const onFieldInput = () => {
  btnSubmit.disabled = !pristine.validate();
};

function openForm() {
  frmContent.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEditEscKeydown);
  hashTagsField.addEventListener('input', onFieldInput);
  commentsField.addEventListener('input', onFieldInput);
}

function closeForm() {
  frmContent.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEditEscKeydown);
  hashTagsField.removeEventListener('input', onFieldInput);
  commentsField.removeEventListener('input', onFieldInput);
  frmUpload.reset();
}

function getSplittedHashTags() {
  return hashTagsField.value.trim().split(' ').filter((i) => i);
}

const hashTagListValidator = function() {
  const validate = (isValid) => (
    isValid(getSplittedHashTags())
  );
  const isCountValid = (val) => (
    val.length <= HASH_TAGS_MAX_COUNT
  );
  const isUniqueElements = (val) => (
    val.length === new Set(val.map((t) => (t.toLowerCase()))).size
  );
  return {
    isCountValid: () => validate(isCountValid),
    isContainUniqueElements: () => validate(isUniqueElements)
  };
}();

const hashTagValueValidator = function() {
  const validate = (isValid) => {
    const hashTags = getSplittedHashTags();
    for(const hashTag of hashTags) {
      if (!isValid(hashTag)) {
        return false;
      }
    }
    return true;
  };
  const isStartWithSharp = (val) => (
    val.startsWith('#')
  );
  const isContainNotOnlySharp = (val) => (
    !(val.length === 1 && isStartWithSharp(val))
  );
  const isContainValidSymbols = (val) => (
    validHashTagTemplate.test(val)
  );
  const isFitWithLength = (val) => (
    val.length <= HASH_TAG_MAX_LENGTH
  );
  return {
    isStartWithSharp: () => validate(isStartWithSharp),
    isContainNotOnlySharp: () => validate(isContainNotOnlySharp),
    isContainValidSymbols: () => validate(isContainValidSymbols),
    isFitWithLength: () => validate(isFitWithLength)
  };
}();

const commentValueValidator = function() {
  const validate = (isValid) => (
    isValid(commentsField.value)
  );
  const isFitWithLength = (val) => (
    val.length <= COMMENT_MAX_LENGTH
  );
  return {
    isFitWithLength: () => validate(isFitWithLength)
  };
}();

function initForm() {
  uploadDialog.addEventListener('change', () => openForm());
  btnUploadCancel.addEventListener('click', () => closeForm());
  frmUpload.addEventListener('submit', () => onSubmit());
  pristine.addValidator(hashTagsField, hashTagListValidator.isCountValid, 'Нельзя указать больше пяти хэш-тегов', 1, true);
  pristine.addValidator(hashTagsField, hashTagListValidator.isContainUniqueElements, 'Один и тот же хэш-тег не может быть использован дважды', 3, true);
  pristine.addValidator(hashTagsField, hashTagValueValidator.isStartWithSharp, 'Хэш-тег начинается с символа # (решётка)', 1, true);
  pristine.addValidator(hashTagsField, hashTagValueValidator.isContainNotOnlySharp, 'Хеш-тег не может состоять только из одной решётки;', 2, true);
  pristine.addValidator(hashTagsField, hashTagValueValidator.isContainValidSymbols, 'Строка после решётки должна состоять из букв и чисел', 1, true);
  pristine.addValidator(hashTagsField, hashTagValueValidator.isFitWithLength, 'Максимальная длина одного хэш-тега 20 символов, включая решётку', 3, true);
  pristine.addValidator(commentsField, commentValueValidator.isFitWithLength, 'Длина комментария не может составлять больше 140 символов;');
}

export {initForm};
