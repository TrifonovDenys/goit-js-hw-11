export function createMarckup(arr) {
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
}
