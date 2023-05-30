const smoothScroll = () => {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();
  console.log(cardHeight);
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};

const smoothScrollTop = () => {
  window.scroll({
    top: 0,
    behavior: 'smooth',
  });
};

export { smoothScroll, smoothScrollTop };
