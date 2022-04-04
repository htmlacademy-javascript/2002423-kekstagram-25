import {getPhotos} from './service-api.js';
import {renderGallery} from './gallery.js';
import {initForm} from './form.js';
import {showAlert} from './utils.js';
import {initFilters} from './preview-filter.js';


function successPhotoObtainedHandler(photos) {
  initForm();
  initFilters(photos, renderGallery);
}

getPhotos(successPhotoObtainedHandler, showAlert);
