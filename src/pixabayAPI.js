const URL_API = 'https://pixabay.com/api/';
const KEY_API = '36775781-ef40f42b03ba5b079902920a8';
const axios = require('axios').default;

export function fetchApi(keywords, page) {
  const params = new URLSearchParams({
    key: KEY_API,
    q: keywords,
    image_type: `photo`,
    orientation: `horizontal`,
    safesearch: true,
    page,
    per_page: 40,
  });
  return axios.get(`${URL_API}?${params}`).then(res => res);
}
