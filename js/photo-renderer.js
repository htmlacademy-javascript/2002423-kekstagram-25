import {isEscapeKey} from './utils.js';

const MAX_COMMENTS_COUNT_AT_ONCE = 5;

const previewPicturesContainer = document.querySelector('.pictures.container');
const photoModal = document.querySelector('.big-picture');
const socialCommentsCount = photoModal.querySelector('.social__comment-count');
const commentsElement = photoModal.querySelector('.social__comments');
const commentLoader = photoModal.querySelector('.comments-loader');
const cancelBigPicture = photoModal.querySelector('.cancel');
const shownCommentsCountElement = socialCommentsCount.querySelector('.comments-count-shown');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onClosePictureModal();
  }
};

function onClosePictureModal() {
  photoModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  shownCommentsCountElement.textContent = '0';
  commentsElement.innerHTML = '';
}

function openPictureModal(evtPictureContainer, pictureById) {
  if (evtPictureContainer.target.classList.contains('picture__img')) {
    const parentNode = evtPictureContainer.target.parentElement;
    renderPhoto(parentNode, pictureById);
    document.body.classList.add('modal-open');
    cancelBigPicture.addEventListener('click', () => onClosePictureModal());
    document.addEventListener('keydown', (evt) => onPopupEscKeydown(evt));
  }
}

function renderPhoto(parentNode, pictureById) {
  const imageContainer = parentNode.querySelector('.picture__info');
  const pictureId = imageContainer.querySelector('.picture__id').textContent;
  const photo = pictureById[pictureId];
  photoModal.classList.remove('hidden');
  photoModal.querySelector('.big-picture__img').children[0].src = photo.url;
  photoModal.querySelector('.likes-count').textContent = photo.likes;
  photoModal.querySelector('.comments-count-total').textContent = photo.comments.length;
  photoModal.querySelector('.social__header').querySelector('.social__caption').textContent = photo.description;
  renderComments(photo);
}

function renderComments(photo) {
  const userComments = photo.comments;
  const totalComments = parseInt(socialCommentsCount.querySelector('.comments-count-total').textContent, 10);
  const commentTemplate = document.querySelector('#template-social__comment').content.querySelector('.social__comment');
  const onLoadCommentsClick = () => {
    const shownCommentsCount = parseInt(shownCommentsCountElement.textContent, 10);
    for (let i = shownCommentsCount; i < totalComments && i < shownCommentsCount + MAX_COMMENTS_COUNT_AT_ONCE; i++) {
      const comment = userComments[i];
      const newCommentTemplate = commentTemplate.cloneNode(true);
      newCommentTemplate.querySelector('.social__picture').alt = comment.name;
      newCommentTemplate.querySelector('.social__picture').src = comment.avatar;
      newCommentTemplate.querySelector('.social__text').textContent = comment.message;
      commentsElement.appendChild(newCommentTemplate);
    }
    shownCommentsCountElement.textContent = commentsElement.children.length;
    if (totalComments === commentsElement.children.length) {
      commentLoader.classList.add('hidden');
    } else {
      commentLoader.classList.remove('hidden');
    }
  };
  commentLoader.addEventListener('click', () => onLoadCommentsClick());
  onLoadCommentsClick();
}

function renderPhotos(photos) {
  const pictureById = photos.reduce((map, picture) => {
    map[picture.id] = picture;
    return map;
  }, {});
  previewPicturesContainer.addEventListener('click', (evt) => openPictureModal(evt, pictureById));
}
export {renderPhotos};
