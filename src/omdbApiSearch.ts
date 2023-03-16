import axios from 'axios';

 function omdbApiSearch(value: string) {
  const url = `https://omdbapi.com/?apikey=a086c7ae&s=${value}&type=movie`;
  return axios.get(url).then(response => response.data)
}

function omdbMovieSearch(value: any) {
  const url = `http://www.omdbapi.com/?apikey=a086c7ae&t=${value.movie}&plot=full`;
  return axios.get(url).then(response => response.data)
}

export { omdbApiSearch, omdbMovieSearch }