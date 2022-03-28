const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const rbtnEffectsGroup = document.querySelector('.effects__list');


const EffectTypes = {
  NONE: {value: 'none'},
  CHROME: {value: 'chrome', filter: 'grayscale', units: ''},
  SEPIA: {value: 'sepia', filter: 'sepia', units: ''},
  MARVIN: {value: 'marvin', filter: 'invert', units: '%'},
  PHOBOS: {value: 'phobos', filter: 'blur', units: 'px'},
  HEAT: {value: 'heat', filter: 'brightness', units: ''}
};

let selectedEffect;

function getSliderOptions(min, max, step) {
  return {
    range: {
      min: min,
      max: max,
    },
    start: max,
    step: step,
    connect: 'lower'
  };
}

function setImgClass(clazz) {
  if (imgUploadPreview.classList.contains(clazz)) {
    return;
  }
  imgUploadPreview.removeAttribute('class');
  imgUploadPreview.classList.add(clazz);
}

function showSlider() {
  if (sliderElement.classList.contains('hidden')) {
    sliderElement.classList.remove('hidden');
  }
}

function hideSlider() {
  if (!sliderElement.classList.contains('hidden')) {
    sliderElement.classList.add('hidden');
  }
}

function effectHandler(effect) {
  selectedEffect = effect;
  setImgClass(`effects__preview--${effect.value}`);
}

const noEffectHandler = () => {
  effectHandler(EffectTypes.NONE);
  imgUploadPreview.style.filter = '';
  hideSlider();
};

const chromeEffectHandler = () => {
  effectHandler(EffectTypes.CHROME);
  sliderElement.noUiSlider.updateOptions(getSliderOptions(0, 1, 0.1));
  showSlider();
};

const sepiaEffectHandler = () => {
  effectHandler(EffectTypes.SEPIA);
  sliderElement.noUiSlider.updateOptions(getSliderOptions(0, 1, 0.1));
  showSlider();
};

const marvinEffectHandler = () => {
  effectHandler(EffectTypes.MARVIN);
  sliderElement.noUiSlider.updateOptions(getSliderOptions(0, 100, 1));
  showSlider();
};

const phobosEffectHandler = () => {
  effectHandler(EffectTypes.PHOBOS);
  sliderElement.noUiSlider.updateOptions(getSliderOptions(0, 3, 0.1));
  showSlider();
};

const heatEffectHandler = () => {
  effectHandler(EffectTypes.HEAT);
  sliderElement.noUiSlider.updateOptions(getSliderOptions(0, 3, 0.1));
  showSlider();
};

const settingsByEffectName = new Map([
  [EffectTypes.NONE.value, noEffectHandler],
  [EffectTypes.CHROME.value, chromeEffectHandler],
  [EffectTypes.SEPIA.value, sepiaEffectHandler],
  [EffectTypes.MARVIN.value, marvinEffectHandler],
  [EffectTypes.PHOBOS.value, phobosEffectHandler],
  [EffectTypes.HEAT.value, heatEffectHandler],
]);

const rbtnEffectsGroupOnClick = (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    settingsByEffectName.get(evt.target.value)();
  }
};

const initEffects = () => {
  noEffectHandler();
  if (sliderElement.noUiSlider) {
    return;
  }
  noUiSlider.create(sliderElement, getSliderOptions(0, 0, 0));
  sliderElement.noUiSlider.on('update', () => {
    valueElement.value = sliderElement.noUiSlider.get();
    imgUploadPreview.style.filter = `${selectedEffect.filter}(${valueElement.value}${selectedEffect.units})`;
  });
  rbtnEffectsGroup.addEventListener('click', (evt) => rbtnEffectsGroupOnClick(evt));
};

export {initEffects};
