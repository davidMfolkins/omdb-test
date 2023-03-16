import axios from 'axios';
import { Movie } from '../types/movie';

// function to return a list of movies base on an input
 function omdbApiSearch(value: string) {
  const url = `https://omdbapi.com/?apikey=a086c7ae&s=${value}&type=movie`;
  return axios.get(url).then(response => response.data)
}

// function to return a single movie base on an input
function omdbMovieSearch(value: Movie) {
  const url = `http://www.omdbapi.com/?apikey=a086c7ae&t=${value.movie}&plot=full`;
  return axios.get(url).then(response => response.data)
}

export { omdbApiSearch, omdbMovieSearch }