import './css/style.css';
import { fetchApi } from './pixabayAPI.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { createMarckup } from './marckup.js';
import { ref } from './reference.js';
import * as Scroll from './smoothScroll.js';

let page;
let word = '';

ref.form.addEventListener('submit', onFormSearch);
ref.btnMore.addEventListener('click', onLoadMore);

function onFormSearch(e) {
  e.preventDefault();
  word = e.target.elements.searchQuery.value;
  page = 1;
  getEvents(word, page);
}

function onLoadMore() {
  page += 1;
  LoadMore(word, page);
}

async function getEvents(word, page) {
  try {
    const data = await fetchApi(word, page);
    const hits = data.data.hits;
    ref.div.innerHTML = createMarckup(hits);
    const i = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
    i.refresh();

    Scroll.smoothScrollTop();

    if (hits.length === 0) {
      ref.btnMore.style.display = 'none';
      return Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    if (hits.length > 1 && page === 1) {
      ref.btnMore.style.display = 'block';
      return Notiflix.Notify.success(
        `Hooray! We found ${data.data.totalHits} images.`
      );
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function LoadMore(word, page) {
  try {
    const data = await fetchApi(word, page);
    ref.div.insertAdjacentHTML('beforeend', createMarckup(data.data.hits));
    const i = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
    i.refresh();

    Scroll.smoothScroll();

    ref.hitsOnLoad += 40;
    if (ref.hitsOnLoad >= data.data.totalHits) {
      return Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    console.log(error.message);
  }
}
