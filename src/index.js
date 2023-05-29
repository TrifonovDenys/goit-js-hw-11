import './css/style.css';
import { fetchApi } from './pixabayAPI.js';
// import { marckUp } from './marckup.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import axios from 'axios';

const div = document.querySelector('.gallery');
const form = document.querySelector('#search-form');
const btnMore = document.querySelector('.load-more');
btnMore.style.display = 'none';
let page = 1;
let word = '';
let m = 40;
form.addEventListener('submit', onClick);

function onClick(e) {
  e.preventDefault();

  word = e.target.elements.searchQuery.value;
  getEvents(word, page);
}

async function getEvents(word, page) {
  await fetchApi(word, page)
    .then(data => {
      console.log(page);
      console.log(data);
      div.innerHTML = famarckUp(data.hits);
      const i = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
      i.refresh();

      if (data.hits.length === 0) {
        btnMore.style.display = 'none';
        return Notiflix.Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      if (data.hits.length > 1 && page === 1) {
        btnMore.style.display = 'block';
        return Notiflix.Notify.success(
          `Hooray! We found ${data.totalHits} images.`
        );
      }
    })
    .catch(err => {
      console.log(err);
    });
}

async function LoadMore(word, page) {
  await fetchApi(word, page)
    .then(data => {
      div.insertAdjacentHTML('beforeend', famarckUp(data.hits));
      const i = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
      i.refresh();
      m += 40;
      if (m >= data.totalHits) {
        return Notiflix.Notify.warning(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(err => {
      console.log(err);
    });
}

btnMore.addEventListener('click', onLoadMore);

function onLoadMore() {
  page += 1;
  LoadMore(word, page);
}

function famarckUp(arr) {
  const a = arr
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
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width="300" heigth='200' />
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
</div>`
    )
    .join('');
  return a;
  // div.insertAdjacentHTML('beforeend', a);
}
