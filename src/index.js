import './css/style.css';
import { fetchApi } from './pixabayAPI.js';
import { marckup } from './marckup.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

const div = document.querySelector('.gallery');
const form = document.querySelector('#search-form');
const btnMore = document.querySelector('.load-more');
let page = 1;
let word = '';
form.addEventListener('submit', onClick);

function onClick(e) {
  e.preventDefault();

  word = e.target.elements.searchQuery.value;
  getEvents(word);
}

function getEvents(word, page) {
  fetchApi(word, page)
    .then(data => {
      console.log(word);
      div.innerHTML = marckup(data.hits);
      new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
    })
    .catch(err => {
      Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      console.log(err);
    });
}

btnMore.addEventListener('click', onLoadMore);

function onLoadMore() {
  page += 1;
  getEvents(word, page);
}
