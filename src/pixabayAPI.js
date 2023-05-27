const URL_API = 'https://pixabay.com/api/';
const KEY_API = '36775781-ef40f42b03ba5b079902920a8';

export function fetchApi(keywords, page) {
  const params = new URLSearchParams({
    key: KEY_API,
    q: keywords,
    image_type: `photo`,
    orientation: `horizontal`,
    safesearch: true,
    page: 1,
    per_page: 10,
  });

  // const response = await fetch(`${URL_API}?${params}`);
  // const base = await response.json();
  // return base;
  return fetch(`${URL_API}?${params}`).then(res => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  });
}
