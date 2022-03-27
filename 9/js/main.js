import {createPhotos} from './data.js';
import {renderGallery} from './gallery.js';
import {initForm} from './form.js';

renderGallery(createPhotos());
initForm();
