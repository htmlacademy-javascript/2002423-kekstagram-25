import {shuffleArray, debouncer} from './utils.js';

const RANDOM_PHOTOS_MAX_COUNT = 10;
const RERENDER_DELAY = 500;

const filtersBlock = document.querySelector('.img-filters');
const defaultFilter = document.querySelector('#filter-default');
const randomFilter = document.querySelector('#filter-random');
const discussedFilter = document.querySelector('#filter-discussed');

let photos;

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
  photos = photoList;
  showFilters();
  onSuccessFilterApply(photos);
  const d = debouncer();
  addOnFilterClickListener(
    defaultFilter,
    d.debounce(() => onSuccessFilterApply(photoList), RERENDER_DELAY)
  );
  addOnFilterClickListener(
    randomFilter,
    d.debounce(() => onSuccessFilterApply(shuffleArray(photos.slice()).slice(0, RANDOM_PHOTOS_MAX_COUNT)), RERENDER_DELAY)
  );
  addOnFilterClickListener(
    discussedFilter,
    d.debounce(() => onSuccessFilterApply(photos.slice().sort(sortByComments)), RERENDER_DELAY)
  );
}

export {initFilters};
