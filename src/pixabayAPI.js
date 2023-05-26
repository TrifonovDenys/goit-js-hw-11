const URL_API = 'https://pixabay.com/api'
const KEY_API = '36775781-ef40f42b03ba5b079902920a8'

export function fetchApi(subject) {
  const subjectstr = subject.split(' ').join('+')
  return fetch(`${URL_API}/?key=${KEY_API}&q=${subject}&image_type=photo`)
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json()
    })
} 