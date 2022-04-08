const photoContainer = document.querySelector('.pictures');

const cleanPreviews = () => {
  const photoPreviews = photoContainer.querySelectorAll('.picture');
  photoPreviews.forEach((photoPreview) => photoPreview.remove());
};

const renderPhotosPreview = (photos) => {
  const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const photoListFragment = document.createDocumentFragment();
  cleanPreviews();
  photos.forEach((photo) => {
    const newPhotoTemplate = photoTemplate.cloneNode(true);
    newPhotoTemplate.dataset.id = photo.id;
    newPhotoTemplate.querySelector('.picture__img').src = photo.url;
    newPhotoTemplate.querySelector('.picture__likes').textContent = photo.likes;
    newPhotoTemplate.querySelector('.picture__comments').textContent = photo.comments.length;
    photoListFragment.appendChild(newPhotoTemplate);
  });
  photoContainer.appendChild(photoListFragment);
};

export {renderPhotosPreview};
