import {getPhotos} from './service-api.js';
import {renderGallery} from './gallery.js';
import {initForm} from './form.js';
import {showAlert} from './utils.js';


function successPhotoObtainedHandler(photos) {
  renderGallery(photos);
  initForm();
}

getPhotos(successPhotoObtainedHandler, showAlert);
