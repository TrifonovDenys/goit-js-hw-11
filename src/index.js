import './css/style.css';
import { fetchApi } from './pixabayAPI.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

const div = document.querySelector('.gallery');
const form = document.querySelector('#search-form');
const lable = document.querySelector('[name="searchQuery"]');

form.addEventListener('click', onClick);

function onClick(e) {
  e.preventDefault();

  if (e.target.nodeName === 'BUTTON') {
    fetchApi(lable.value)
      .then(data => {
        console.log(lable.value);
        div.innerHTML =  marckup(data.hits)
        new SimpleLightbox('.gallery a', {
          captionsData: 'alt',
          captionDelay: 250,
        });
        
      })
      .catch(err => {
        Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.");
        console.log(err)
      });
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
      <b>Likes:</b> <span> ${likes}</span>
    </p>
    <p class="info-item">
      <b>Views:</b> <span> ${views}</span>
    </p>
    <p class="info-item">
      <b>Comments:</b> <span> ${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads:</b> <span> ${downloads}</span>
    </p>
  </div>
  </a>
</div>`)
.join('');
}
