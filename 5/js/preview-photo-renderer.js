function renderPhotosPreview(photos) {
  const photoContainer = document.querySelector('.pictures');
  const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const photoListFragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const newPhotoTemplate = photoTemplate.cloneNode(true);
    newPhotoTemplate.querySelector('.picture__img').src = photo.url;
    newPhotoTemplate.querySelector('.picture__likes').textContent = photo.likes;
    newPhotoTemplate.querySelector('.picture__comments').textContent = photo.comments.length;
    photoListFragment.appendChild(newPhotoTemplate);
  });
  photoContainer.appendChild(photoListFragment);
}

export {renderPhotosPreview};
