import {isEscapeKey} from './utils.js';

const previewPicturesContainer = document.querySelector('.pictures.container');
const photoModal = document.querySelector('.big-picture');
const socialCommentsCount = photoModal.querySelector('.social__comment-count');
const commentsElement = photoModal.querySelector('.social__comments');
const commentLoader = photoModal.querySelector('.comments-loader');
const cancelBigPicture = photoModal.querySelector('.cancel');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onClosePictureModal();
  }
};

function onClosePictureModal() {
  photoModal.classList.add('hidden');
  socialCommentsCount.classList.remove('hidden');
  commentLoader.classList.remove('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
}

function openPictureModal(evt, pictureById) {
  if (evt.target.classList.contains('picture__img')) {
    const parentNode = evt.target.parentElement;
    renderPhoto(parentNode, pictureById);
    document.body.classList.add('modal-open');
    socialCommentsCount.classList.add('hidden');
    commentLoader.classList.add('hidden');
    cancelBigPicture.addEventListener('click', () => onClosePictureModal());
    document.addEventListener('keydown', () => onClosePictureModal());
  }
}

function renderPhoto(parentNode, pictureById) {
  const imageContainer = parentNode.querySelector('.picture__info');
  const pictureId = imageContainer.querySelector('.picture__id').textContent;
  const photo = pictureById[pictureId];
  photoModal.classList.remove('hidden');
  photoModal.querySelector('.big-picture__img').children[0].src = photo.url;
  photoModal.querySelector('.likes-count').textContent = photo.likes;
  photoModal.querySelector('.comments-count').textContent = photo.comments.length;
  photoModal.querySelector('.social__header').querySelector('.social__caption').textContent = photo.description;
  renderComments(photo);
}

function renderComments(photo) {
  const userComments = photo.comments;
  const commentTemplate = commentsElement.children[0];
  const commentsListFragment = document.createDocumentFragment();
  userComments.forEach((comment) => {
    const newCommentTemplate = commentTemplate.cloneNode(true);
    newCommentTemplate.querySelector('.social__picture').alt = comment.name;
    newCommentTemplate.querySelector('.social__picture').src = comment.avatar;
    newCommentTemplate.querySelector('.social__text').textContent = comment.message;
    commentsListFragment.appendChild(newCommentTemplate);
  });
  commentsElement.replaceChildren(commentsListFragment);
}

function renderPhotos(photos) {
  const pictureById = photos.reduce((map, picture) => {
    map[picture.id] = picture;
    return map;
  }, {});
  previewPicturesContainer.addEventListener('click', (evt) => openPictureModal(evt, pictureById));
}
export {renderPhotos};
