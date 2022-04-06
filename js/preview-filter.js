import {shuffleArray, createDebouncer} from './utils.js';

const RANDOM_PHOTOS_MAX_COUNT = 10;

const filtersBlock = document.querySelector('.img-filters');
const defaultFilter = document.querySelector('#filter-default');
const randomFilter = document.querySelector('#filter-random');
const discussedFilter = document.querySelector('#filter-discussed');

let photoCache;

function makeFilterActive(filter) {
  filtersBlock.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  filter.classList.add('img-filters__button--active');
}

function showFilters() {
  filtersBlock.classList.remove('img-filters--inactive');
}

const sortByComments = (photo1, photo2) => (
  photo2.comments.length - photo1.comments.length
);

const addOnFilterClickListener = (filter, cb) => {
  filter.addEventListener(
    'click',
    (evt) => {
      makeFilterActive(evt.target);
      cb();
    }
  );
};

function initFilters(photoList, onSuccessFilterApply) {
  photoCache = photoList;
  showFilters();
  onSuccessFilterApply(photoCache);
  const d = createDebouncer();
  addOnFilterClickListener(
    defaultFilter,
    d.debounce(() => onSuccessFilterApply(photoList))
  );
  addOnFilterClickListener(
    randomFilter,
    d.debounce(() => onSuccessFilterApply(shuffleArray(photoCache.slice()).slice(0, RANDOM_PHOTOS_MAX_COUNT)))
  );
  addOnFilterClickListener(
    discussedFilter,
    d.debounce(() => onSuccessFilterApply(photoCache.slice().sort(sortByComments)))
  );
}

export {initFilters};
