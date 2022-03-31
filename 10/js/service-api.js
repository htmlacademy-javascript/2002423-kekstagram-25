const BASE_PATH = 'https://25.javascript.pages.academy/kekstagram';

const getPhotos = (onSuccess, onFail) => {
  fetch(`${BASE_PATH}/data`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Не удалось загрузить список фортографий. Попробуйте ещё раз.');
    })
    .then((photos) => onSuccess(photos))
    .catch((err) => {
      onFail(err.message);
    });
};

const uploadPhoto = (onSuccess, onFail, formData) => {
  fetch(BASE_PATH,
    {
      method: 'POST',
      body: formData
    })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        throw new Error('Не удалось загрузить фортографию.');
      }
    })
    .catch((err) => {
      onFail(err.message);
    });
};

export {getPhotos, uploadPhoto};
