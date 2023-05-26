import './css/style.css';
import { fetchApi } from './pixabayAPI.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const div = document.querySelector('.gallery');
const form = document.querySelector('#search-form');
const lable = document.querySelector('[name="searchQuery"]');

form.addEventListener('click', onClick);

function onClick(e) {
  e.preventDefault();
  div.innerHTML = '';

  if (e.target.nodeName === 'BUTTON') {
    fetchApi(lable.value)
      .then(data => {
        div.insertAdjacentHTML('beforeend', marckup(data.hits));
        new SimpleLightbox('.gallery a', {
          captionsData: 'alt',
          captionDelay: 250,
        });
      })
      .catch(err => console.log(err));
  }
}

function marckup(arr) {
  return arr
    .map(
      ({
        comments,
        downloads,
        views,
        likes,
        largeImageURL,
        tags,
        webformatURL,
      }) =>
        `<div class="photo-card">
   <a href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
  </a>
</div>`)
.join('');
}
