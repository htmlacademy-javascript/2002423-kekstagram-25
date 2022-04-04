import {isEscapeKey, showAlert} from './utils.js';
import {initEffects} from './photo-effect-slider.js';
import {uploadPhoto} from './service-api.js';

const HASH_TAG_MAX_LENGTH = 20;
const HASH_TAGS_MAX_COUNT = 5;
const COMMENT_MAX_LENGTH = 140;
const PHOTO_SCALE_STEP = 25;
const PHOTO_SCALE_MIN_VALUE = 25;
const PHOTO_SCALE_MAX_VALUE = 100;
const VALID_HASH_TAG_TEMPLATE = /^#[A-Za-zА-яЁё0-9]+$/;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const frmUpload = document.querySelector('.img-upload__form');
const uploadDialog = document.querySelector('#upload-file');
const frmContent = document.querySelector('.img-upload__overlay');
const btnUploadCancel = document.querySelector('#upload-cancel');
const hashTagsField = document.querySelector('.text__hashtags');
const commentsField = document.querySelector('.text__description');
const btnSubmit = document.querySelector('.img-upload__submit');
const scaleControleValueField = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const btnSizeSmaller = document.querySelector('.scale__control--smaller');
const btnSizeBigger = document.querySelector('.scale__control--bigger');
const errorUploadTemplate = document.querySelector('#error').content;
const successUploadTemplate = document.querySelector('#success').content;

const pristine = new Pristine(frmUpload, {
  classTo: 'form__item',
  errorClass: 'text__label--error',
  errorTextParent: 'form__item',
  errorTextTag: 'p'
});

function setPhotoScale(value) {
  imgUploadPreview.style.transform = `scale(${value}%)`;
  scaleControleValueField.value = `${value}%`;
}

function resetPhotoScale() {
  imgUploadPreview.style.transform = 'scale(100%)';
  scaleControleValueField.value = '100';
}

const btnSizeSmallerOnClick = () => {
  const currentScale = parseFloat(scaleControleValueField.value);
  if(currentScale === PHOTO_SCALE_MIN_VALUE) {
    return;
  }
  const newScalePercent = (currentScale - PHOTO_SCALE_STEP);
  setPhotoScale(newScalePercent);
};

const btnSizeBiggerOnClick = () => {
  const currentScale = parseFloat(scaleControleValueField.value);
  if(currentScale === PHOTO_SCALE_MAX_VALUE) {
    return;
  }
  const newScalePercent = (currentScale + PHOTO_SCALE_STEP);
  setPhotoScale(newScalePercent);
};

btnSizeSmaller.addEventListener('click', btnSizeSmallerOnClick);
btnSizeBigger.addEventListener('click', btnSizeBiggerOnClick);

function showSuccessModal() {
  const newSuccessTemplate = successUploadTemplate.cloneNode(true);
  const successButton = newSuccessTemplate.querySelector('.success__button');
  const successModal = newSuccessTemplate.querySelector('.success');
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      successModal.remove();
    }
  });
  document.addEventListener('click', (evt) => {
    if (evt.target === successModal || evt.target === successButton) {
      successModal.remove();
    }
  });
  document.body.classList.add('modal-open');
  document.body.appendChild(newSuccessTemplate);
}

function showErrorModal(message) {
  const newErrorTemplate = errorUploadTemplate.cloneNode(true);
  const errorButton = newErrorTemplate.querySelector('.error__button');
  const errorModal = newErrorTemplate.querySelector('.error');
  const errorLabel = newErrorTemplate.querySelector('.error__title');
  errorLabel.textContent = message;
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      errorModal.remove();
    }
  });
  document.addEventListener('click', (evt) => {
    if (evt.target === errorModal || evt.target === errorButton) {
      errorModal.remove();
    }
  });
  document.body.classList.add('modal-open');
  document.body.appendChild(newErrorTemplate);
}

const blockSubmitBtn = () => {
  btnSubmit.textContent = 'Публикую...';
  btnSubmit.disabled = true;
};

const unblockSubmitBtn = () => {
  btnSubmit.textContent = 'Опубликовать';
  btnSubmit.disabled = false;
};

const successUploadHandler = () => {
  closeForm();
  showSuccessModal();
  unblockSubmitBtn();
};

const errorUploadHandler = (message) => {
  closeForm();
  showErrorModal(message);
  unblockSubmitBtn();
};

const onSubmit = (evt) => {
  evt.preventDefault();
  hashTagsField.value = hashTagsField.value.trim();
  if (pristine.validate()) {
    blockSubmitBtn();
    uploadPhoto(successUploadHandler, errorUploadHandler, new FormData(evt.target));
  }
};

const onEditEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement === commentsField || document.activeElement === hashTagsField) {
      evt.stopPropagation();
      return;
    }
    closeForm();
  }
};

const onFieldInput = () => {
  btnSubmit.disabled = !pristine.validate();
};

function showUploadPhotoPreview() {
  const file = uploadDialog.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((ft) => (
    fileName.endsWith(ft)
  ));
  if (!matches) {
    showAlert(`Фомат файла ${fileName} не поддерживается`);
    closeForm();
    return;
  }
  imgUploadPreview.src = URL.createObjectURL(file);
}

function openForm() {
  frmContent.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEditEscKeydown);
  hashTagsField.addEventListener('input', onFieldInput);
  commentsField.addEventListener('input', onFieldInput);
  initEffects();
  showUploadPhotoPreview();
}

function closeForm() {
  frmContent.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEditEscKeydown);
  hashTagsField.removeEventListener('input', onFieldInput);
  commentsField.removeEventListener('input', onFieldInput);
  frmUpload.reset();
  resetPhotoScale();
  frmContent.querySelectorAll('.pristine-error').forEach((e) => e.remove());
  unblockSubmitBtn();
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
    VALID_HASH_TAG_TEMPLATE.test(val)
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
  frmUpload.addEventListener('submit', (evt) => onSubmit(evt));
  pristine.addValidator(hashTagsField, hashTagListValidator.isCountValid, 'Нельзя указать больше пяти хэш-тегов', 1, true);
  pristine.addValidator(hashTagsField, hashTagListValidator.isContainUniqueElements, 'Один и тот же хэш-тег не может быть использован дважды', 3, true);
  pristine.addValidator(hashTagsField, hashTagValueValidator.isStartWithSharp, 'Хэш-тег начинается с символа # (решётка)', 1, true);
  pristine.addValidator(hashTagsField, hashTagValueValidator.isContainNotOnlySharp, 'Хеш-тег не может состоять только из одной решётки;', 2, true);
  pristine.addValidator(hashTagsField, hashTagValueValidator.isContainValidSymbols, 'Строка после решётки должна состоять из букв и чисел', 1, true);
  pristine.addValidator(hashTagsField, hashTagValueValidator.isFitWithLength, 'Максимальная длина одного хэш-тега 20 символов, включая решётку', 3, true);
  pristine.addValidator(commentsField, commentValueValidator.isFitWithLength, 'Длина комментария не может составлять больше 140 символов;');
}

export {initForm};
