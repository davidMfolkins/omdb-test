import axios from 'axios';

export default function omdbApiSearch(value: string) {
  const url = `https://omdbapi.com/?apikey=a086c7ae&s=${value}&type=movie`;
  return axios.get(url).then(response => response.data)
}