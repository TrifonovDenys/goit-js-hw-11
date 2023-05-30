import './css/style.css';
import { fetchApi } from './pixabayAPI.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { createMarckup } from './marckup.js';

const div = document.querySelector('.gallery');
const form = document.querySelector('#search-form');
const btnMore = document.querySelector('.load-more');
btnMore.style.display = 'none';
let page;
let word = '';
let m = 40;

form.addEventListener('submit', onFormSearch);
btnMore.addEventListener('click', onLoadMore);

function onFormSearch(e) {
  e.preventDefault();
  word = e.target.elements.searchQuery.value;
  page = 1;
  getEvents(word, page);
}

function onLoadMore() {
  page++;
  LoadMore(word, page);
}

function getEvents(word, page) {
  fetchApi(word, page)
    .then(data => {
      div.innerHTML = createMarckup(data.data.hits);
      const i = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
      i.refresh();

      if (data.data.hits.length === 0) {
        btnMore.style.display = 'none';
        return Notiflix.Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      if (data.data.hits.length > 1 && page === 1) {
        btnMore.style.display = 'block';
        return Notiflix.Notify.success(
          `Hooray! We found ${data.data.totalHits} images.`
        );
      }
    })
    .catch(err => {
      console.log(err);
    });
}

function LoadMore(word, page) {
  fetchApi(word, page)
    .then(data => {
      div.insertAdjacentHTML('beforeend', createMarckup(data.data.hits));
      const i = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
      i.refresh();
      m += 40;
      if (m >= data.data.totalHits) {
        return Notiflix.Notify.warning(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(err => {
      console.log(err);
    });
}
