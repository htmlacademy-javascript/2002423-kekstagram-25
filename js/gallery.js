import {renderPhotosPreview} from './preview-photo-renderer.js';
import {renderPhotos} from './photo-renderer.js';

function renderGallery(photos) {
  renderPhotosPreview(photos);
  renderPhotos(photos);
}

export {renderGallery};
